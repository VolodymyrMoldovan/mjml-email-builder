<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import type { EmailElement, EmailElementType } from '../types';
import EmailContentElement from './EmailContentElement.vue';

const props = defineProps<{
  element: EmailElement;
  sectionId: string;
}>();

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

const isSelected = computed(() => emailBuilder.selectedElementId.value === props.element.id);
const isDragOver = ref(false);

const columnStyle = computed(() => {
  const attrs = props.element.attributes;
  const style: Record<string, string> = {};

  if (attrs.width) style.width = attrs.width;
  if (attrs.padding) style.padding = attrs.padding;
  if (attrs['background-color']) style.backgroundColor = attrs['background-color'];
  if (attrs['vertical-align']) style.verticalAlign = attrs['vertical-align'];

  return style;
});

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.selectElement(props.element.id);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragOver.value = true;
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy';
  }
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragOver.value = false;

  const type = e.dataTransfer?.getData('elementType') as EmailElementType;
  if (type && type !== 'mj-section' && type !== 'mj-hero' && type !== 'mj-column') {
    emailBuilder.addElement(type, props.element.id);
  }

  emailBuilder.isDragging.value = false;
  emailBuilder.draggedType.value = null;
};

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation();
  emailBuilder.removeElement(props.element.id);
};
</script>

<template>
  <div
    class="email-column flex-1"
    :class="{ 'selected': isSelected, 'drag-over': isDragOver }"
    :style="columnStyle"
    @click="handleClick"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Column Label -->
    <div class="column-label" v-if="isSelected">
      <i class="fas fa-columns mr-1"></i>
      Column
      <button @click="handleDelete" class="delete-btn ml-2" title="Delete Column">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Column Content -->
    <div class="column-content">
      <template v-if="element.children && element.children.length > 0">
        <EmailContentElement
          v-for="child in element.children"
          :key="child.id"
          :element="child"
          :column-id="element.id"
        />
      </template>

      <!-- Empty Column Drop Zone -->
      <div
        v-else
        class="empty-column"
        :class="{ 'drag-active': isDragOver || emailBuilder.isDragging.value }"
      >
        <i class="fas fa-plus-circle text-lg mb-1"></i>
        <span class="text-xs">Drop content here</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-column {
  position: relative;
  min-height: 60px;
  min-width: 50px;
  transition: all 0.2s;
}

.email-column:hover {
  outline: 1px dashed rgba(59, 130, 246, 0.5);
  outline-offset: -1px;
}

.email-column.selected {
  outline: 2px solid var(--primary, #3b82f6);
  outline-offset: -2px;
}

.email-column.drag-over {
  background-color: rgba(59, 130, 246, 0.1);
}

.column-label {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(59, 130, 246, 0.9);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 0 0 4px 0;
  display: flex;
  align-items: center;
  z-index: 10;
}

.delete-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0 2px;
  opacity: 0.7;
}

.delete-btn:hover {
  opacity: 1;
}

.column-content {
  min-height: 60px;
}

.empty-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  border: 2px dashed var(--border, #e5e7eb);
  border-radius: 4px;
  margin: 5px;
  color: var(--muted-foreground, #9ca3af);
  transition: all 0.2s;
}

.empty-column.drag-active {
  border-color: var(--primary, #3b82f6);
  background-color: rgba(59, 130, 246, 0.05);
  color: var(--primary, #3b82f6);
}
</style>
