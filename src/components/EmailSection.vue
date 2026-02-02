<script setup lang="ts">
import { inject, computed } from 'vue';
import type { EmailElement } from '../types';
import { ELEMENT_CONFIGS } from '../types';
import EmailColumn from './EmailColumn.vue';

const props = defineProps<{
  element: EmailElement;
}>();

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

const isSelected = computed(() => emailBuilder.selectedElementId.value === props.element.id);
const isHero = computed(() => props.element.type === 'mj-hero');

const sectionStyle = computed(() => {
  const attrs = props.element.attributes;
  const style: Record<string, string> = {};

  if (attrs['background-color']) style.backgroundColor = attrs['background-color'];
  if (attrs.padding) style.padding = attrs.padding;
  if (attrs['border-radius']) style.borderRadius = attrs['border-radius'];

  if (isHero.value) {
    if (attrs.height) style.minHeight = attrs.height;
    if (attrs['background-url']) {
      style.backgroundImage = `url(${attrs['background-url']})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }
  }

  return style;
});

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.selectElement(props.element.id);
};

const handleAddColumn = () => {
  emailBuilder.addColumnToSection(props.element.id);
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
</script>

<template>
  <div
    class="email-section relative"
    :class="{ 'selected': isSelected, 'hero': isHero }"
    :style="sectionStyle"
    @click="handleClick"
  >
    <!-- Section Label -->
    <div class="section-label">
      <i :class="['fas', ELEMENT_CONFIGS[element.type].icon, 'mr-1']"></i>
      {{ ELEMENT_CONFIGS[element.type].label }}
    </div>

    <!-- Section Actions -->
    <div class="section-actions" v-if="isSelected">
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

    <!-- Columns Container -->
    <div class="columns-container flex" :class="{ 'items-center justify-center': isHero }">
      <EmailColumn
        v-for="column in element.children"
        :key="column.id"
        :element="column"
        :section-id="element.id"
      />

      <!-- Add Column Button (only for sections) -->
      <button
        v-if="!isHero && isSelected"
        @click.stop="handleAddColumn"
        class="add-column-btn"
        title="Add Column"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.email-section {
  position: relative;
  min-height: 60px;
  transition: all 0.2s;
  cursor: pointer;
}

.email-section:hover {
  outline: 2px solid rgba(59, 130, 246, 0.3);
}

.email-section.selected {
  outline: 2px solid var(--primary, #3b82f6);
}

.email-section.hero {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-label {
  position: absolute;
  top: -24px;
  left: 0;
  background-color: var(--primary, #3b82f6);
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px 4px 0 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.email-section:hover .section-label,
.email-section.selected .section-label {
  opacity: 1;
}

.section-actions {
  position: absolute;
  top: -24px;
  right: 0;
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s;
}

.email-section.selected .section-actions {
  opacity: 1;
}

.action-btn {
  background-color: var(--card, white);
  border: 1px solid var(--border, #e5e7eb);
  color: var(--foreground, #374151);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
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

.columns-container {
  min-height: 40px;
}

.add-column-btn {
  width: 40px;
  min-height: 60px;
  border: 2px dashed var(--border, #e5e7eb);
  background: transparent;
  color: var(--muted-foreground, #6b7280);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}

.add-column-btn:hover {
  border-color: var(--primary, #3b82f6);
  color: var(--primary, #3b82f6);
  background-color: rgba(59, 130, 246, 0.05);
}
</style>
