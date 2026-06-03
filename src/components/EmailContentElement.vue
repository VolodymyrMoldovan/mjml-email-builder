<script setup lang="ts">
import { inject, computed, ref, watch, nextTick } from 'vue';
import type { EmailElement } from '../types';
import { ELEMENT_CONFIGS } from '../types';
import mjml2html from 'mjml-browser';

const props = defineProps<{
  element: EmailElement;
  columnId: string;
}>();

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

const isSelected = computed(() => emailBuilder.selectedElementId.value === props.element.id);
const config = computed(() => ELEMENT_CONFIGS[props.element.type]);

// Inline editing
const isEditing = ref(false);
const editableContent = ref('');
const editableRef = ref<HTMLElement | null>(null);

const canEdit = computed(() => props.element.type === 'mj-text' || props.element.type === 'mj-button');

const renderedHtml = ref('');

const generateElementMjml = (element: EmailElement): string => {
  const attrs = Object.entries(element.attributes)
    .filter(([_, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  const content = element.content || '';

  return `<mjml>
  <mj-body>
    <mj-section padding="0">
      <mj-column padding="0">
        <${element.type}${attrs ? ' ' + attrs : ''}>${content}</${element.type}>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
};

watch(() => [props.element, props.element.attributes, props.element.content], async () => {
  try {
    const mjml = generateElementMjml(props.element);
    const result = await mjml2html(mjml, { validationLevel: 'soft' });

    const parser = new DOMParser();
    const doc = parser.parseFromString(result.html, 'text/html');
    const section = doc.querySelector('table[role="presentation"]');

    if (section) {
      renderedHtml.value = section.outerHTML;
    } else {
      const body = doc.body;
      renderedHtml.value = body.innerHTML;
    }
  } catch (e) {
    console.error('MJML element render error:', e);
    renderedHtml.value = `<div style="padding: 10px; color: #666;">${props.element.type}</div>`;
  }
}, { immediate: true, deep: true });

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.selectElement(props.element.id);
};

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.removeElement(props.element.id);
};

const handleDuplicate = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.duplicateElement(props.element.id);
};

const handleMoveUp = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.moveElement(props.element.id, 'up');
};

const handleMoveDown = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.moveElement(props.element.id, 'down');
};

const startEditing = (e: MouseEvent) => {
  if (!canEdit.value) return;
  e.stopPropagation();
  e.preventDefault();
  editableContent.value = props.element.content || '';
  isEditing.value = true;
  nextTick(() => {
    if (editableRef.value) {
      editableRef.value.innerText = editableContent.value;
      editableRef.value.focus();
      // Place cursor at end
      const range = document.createRange();
      range.selectNodeContents(editableRef.value);
      range.collapse(false);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  });
};

const finishEditing = () => {
  if (!isEditing.value) return;
  const newContent = editableRef.value?.innerText || '';
  isEditing.value = false;
  if (newContent !== props.element.content) {
    emailBuilder.updateElementContent(props.element.id, newContent);
  }
};

const cancelEditing = () => {
  isEditing.value = false;
};

const handleEditKeydown = (e: KeyboardEvent) => {
  e.stopPropagation();
  if (e.key === 'Escape') {
    cancelEditing();
  } else if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    finishEditing();
  }
};
</script>

<template>
  <div
    class="email-element"
    :class="{ 'selected': isSelected, 'editing': isEditing }"
    @click="handleClick"
    @dblclick="startEditing"
  >
    <!-- Element Label -->
    <div class="element-label" v-if="!isEditing">
      <i :class="['fas', config.icon, 'mr-1']"></i>
      {{ config.label }}
    </div>

    <!-- Element Actions -->
    <div class="element-actions" v-if="isSelected && !isEditing">
      <button @click="handleMoveUp" class="action-btn" title="Move Up">
        <i class="fas fa-chevron-up"></i>
      </button>
      <button @click="handleMoveDown" class="action-btn" title="Move Down">
        <i class="fas fa-chevron-down"></i>
      </button>
      <button @click="handleDuplicate" class="action-btn" title="Duplicate">
        <i class="fas fa-copy"></i>
      </button>
      <button @click="handleDelete" class="action-btn action-btn-danger" title="Delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <!-- Inline Editor -->
    <div
      v-if="isEditing && canEdit"
      ref="editableRef"
      class="inline-editor"
      contenteditable="true"
      @blur="finishEditing"
      @keydown="handleEditKeydown"
      @click.stop
      @mousedown.stop
    ></div>

    <!-- Rendered MJML Content -->
    <div v-else class="element-content" v-html="renderedHtml"></div>
  </div>
</template>

<style scoped>
.email-element {
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.email-element:hover {
  outline: 1px solid rgba(59, 130, 246, 0.5);
}

.email-element.selected {
  outline: 2px solid var(--primary, #3b82f6);
}

.element-label {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(16, 185, 129, 0.9);
  color: white;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 0 0 4px 0;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 5;
}

.email-element:hover .element-label,
.email-element.selected .element-label {
  opacity: 1;
}

.element-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 1px;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 5;
}

.email-element.selected .element-actions {
  opacity: 1;
}

.action-btn {
  background-color: var(--card, white);
  border: 1px solid var(--border, #e5e7eb);
  color: var(--foreground, #374151);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: var(--muted, #f3f4f6);
}

.action-btn-danger:hover {
  background-color: #fee2e2;
  color: #dc2626;
}

.element-content {
  min-height: 20px;
}

.element-content :deep(table) {
  width: 100%;
}

.element-content :deep(td) {
  word-break: break-word;
}

.email-element.editing {
  outline: 2px solid var(--primary, #3b82f6);
}

.inline-editor {
  min-height: 20px;
  padding: 10px 25px;
  outline: none;
  background-color: white;
  border: 1px dashed var(--primary, #3b82f6);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.inline-editor:focus {
  border-color: var(--primary, #3b82f6);
  background-color: #fefefe;
}
</style>
