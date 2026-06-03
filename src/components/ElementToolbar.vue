<script setup lang="ts">
import { inject } from 'vue';
import type { EmailElementType } from '../types';
import { ELEMENT_CONFIGS } from '../types';

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

type ElementItem = { type: EmailElementType; config: typeof ELEMENT_CONFIGS[EmailElementType] };

const layoutElements: ElementItem[] = [
  { type: 'mj-section', config: ELEMENT_CONFIGS['mj-section'] },
  { type: 'mj-hero', config: ELEMENT_CONFIGS['mj-hero'] },
  { type: 'mj-wrapper', config: ELEMENT_CONFIGS['mj-wrapper'] },
  { type: 'mj-group', config: ELEMENT_CONFIGS['mj-group'] }
];

const contentElements: ElementItem[] = [
  { type: 'mj-text', config: ELEMENT_CONFIGS['mj-text'] },
  { type: 'mj-image', config: ELEMENT_CONFIGS['mj-image'] },
  { type: 'mj-button', config: ELEMENT_CONFIGS['mj-button'] },
  { type: 'mj-divider', config: ELEMENT_CONFIGS['mj-divider'] },
  { type: 'mj-spacer', config: ELEMENT_CONFIGS['mj-spacer'] },
  { type: 'mj-table', config: ELEMENT_CONFIGS['mj-table'] }
];

const socialElements: ElementItem[] = [
  { type: 'mj-social', config: ELEMENT_CONFIGS['mj-social'] },
  { type: 'mj-navbar', config: ELEMENT_CONFIGS['mj-navbar'] }
];

const advancedElements: ElementItem[] = [
  { type: 'mj-accordion', config: ELEMENT_CONFIGS['mj-accordion'] },
  { type: 'mj-carousel', config: ELEMENT_CONFIGS['mj-carousel'] },
  { type: 'mj-raw', config: ELEMENT_CONFIGS['mj-raw'] }
];

const handleDragStart = (e: DragEvent, type: EmailElementType) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData('elementType', type);
    e.dataTransfer.effectAllowed = 'copy';
  }
  emailBuilder.isDragging.value = true;
  emailBuilder.draggedType.value = type;
};

const handleDragEnd = () => {
  emailBuilder.isDragging.value = false;
  emailBuilder.draggedType.value = null;
};

const handleAddElement = (type: EmailElementType) => {
  if (type === 'mj-section' || type === 'mj-hero' || type === 'mj-wrapper') {
    emailBuilder.addElement(type);
    return;
  }

  const selectedId = emailBuilder.selectedElementId.value;
  if (selectedId) {
    emailBuilder.addElement(type, selectedId);
    return;
  }

  const body = emailBuilder.template.value.body;
  const lastLayout = [...body].reverse().find(el => el.type === 'mj-section' || el.type === 'mj-hero');
  if (lastLayout) {
    emailBuilder.addElement(type, lastLayout.id);
    return;
  }

  const section = emailBuilder.addElement('mj-section');
  emailBuilder.addElement(type, section.id);
};
</script>

<template>
  <div class="element-toolbar p-4">
    <h2 class="text-sm font-semibold text-gray-900 mb-4">Elements</h2>

    <!-- Layout Section -->
    <div class="mb-6">
      <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Layout</h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="{ type, config } in layoutElements"
          :key="type"
          class="element-item flex flex-col items-center justify-center gap-1 p-3 h-auto rounded-md border border-gray-200 bg-transparent text-gray-900 transition-all hover:border-blue-500 hover:bg-blue-50"
          draggable="true"
          @dragstart="handleDragStart($event, type)"
          @dragend="handleDragEnd"
          @click="handleAddElement(type)"
        >
          <i :class="['fas', config.icon, 'text-lg']"></i>
          <span class="text-xs">{{ config.label }}</span>
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="mb-6">
      <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Content</h3>
      <p class="text-xs text-gray-500 mb-2">Click to add or drag into a column</p>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="{ type, config } in contentElements"
          :key="type"
          class="element-item flex flex-col items-center justify-center gap-1 p-3 h-auto rounded-md border border-gray-200 bg-transparent text-gray-900 transition-all hover:border-blue-500 hover:bg-blue-50"
          draggable="true"
          @dragstart="handleDragStart($event, type)"
          @dragend="handleDragEnd"
          @click="handleAddElement(type)"
        >
          <i :class="['fas', config.icon, 'text-lg']"></i>
          <span class="text-xs">{{ config.label }}</span>
        </button>
      </div>
    </div>

    <!-- Social & Navigation Section -->
    <div class="mb-6">
      <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Social & Navigation</h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="{ type, config } in socialElements"
          :key="type"
          class="element-item flex flex-col items-center justify-center gap-1 p-3 h-auto rounded-md border border-gray-200 bg-transparent text-gray-900 transition-all hover:border-blue-500 hover:bg-blue-50"
          draggable="true"
          @dragstart="handleDragStart($event, type)"
          @dragend="handleDragEnd"
          @click="handleAddElement(type)"
        >
          <i :class="['fas', config.icon, 'text-lg']"></i>
          <span class="text-xs">{{ config.label }}</span>
        </button>
      </div>
    </div>

    <!-- Advanced Section -->
    <div class="mb-6">
      <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Advanced</h3>
      <p class="text-xs text-gray-500 mb-2">Interactive & custom elements</p>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="{ type, config } in advancedElements"
          :key="type"
          class="element-item flex flex-col items-center justify-center gap-1 p-3 h-auto rounded-md border border-gray-200 bg-transparent text-gray-900 transition-all hover:border-blue-500 hover:bg-blue-50"
          draggable="true"
          @dragstart="handleDragStart($event, type)"
          @dragend="handleDragEnd"
          @click="handleAddElement(type)"
        >
          <i :class="['fas', config.icon, 'text-lg']"></i>
          <span class="text-xs">{{ config.label }}</span>
        </button>
      </div>
    </div>

    <!-- Template Settings -->
    <div class="border-t border-gray-200 pt-4">
      <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Template Settings</h3>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-2">Template Name</label>
          <input
            v-model="emailBuilder.template.value.name"
            type="text"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-2">Background Color</label>
          <div class="flex gap-2">
            <input
              v-model="emailBuilder.template.value.attributes.backgroundColor"
              type="color"
              class="w-10 h-8 rounded border border-gray-200 cursor-pointer"
            />
            <input
              v-model="emailBuilder.template.value.attributes.backgroundColor"
              type="text"
              class="flex-1 py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-2">Width</label>
          <input
            v-model="emailBuilder.template.value.attributes.width"
            type="text"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-toolbar {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.element-toolbar::-webkit-scrollbar {
  width: 6px;
}

.element-toolbar::-webkit-scrollbar-track {
  background: transparent;
}

.element-toolbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

.element-toolbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.element-item {
  cursor: grab;
}

.element-item:active {
  cursor: grabbing;
}
</style>
