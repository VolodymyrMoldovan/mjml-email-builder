<script setup lang="ts">
import { inject, computed, watch, ref } from 'vue';
import { ELEMENT_CONFIGS } from '../types';

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

const selectedElement = computed(() => emailBuilder.selectedElement.value);
const config = computed(() => {
  if (!selectedElement.value) return null;
  return ELEMENT_CONFIGS[selectedElement.value.type];
});

const localContent = ref('');

watch(() => selectedElement.value?.content, (newContent) => {
  localContent.value = newContent || '';
}, { immediate: true });

const handleAttributeChange = (name: string, value: string) => {
  if (selectedElement.value) {
    emailBuilder.updateElementAttribute(selectedElement.value.id, name, value);
  }
};

const handleContentChange = (content: string) => {
  if (selectedElement.value) {
    emailBuilder.updateElementContent(selectedElement.value.id, content);
  }
};

const handleContentBlur = () => {
  handleContentChange(localContent.value);
};
</script>

<template>
  <div class="property-panel p-4">
    <!-- No Selection State -->
    <div v-if="!selectedElement" class="text-center py-8">
      <i class="fas fa-mouse-pointer text-3xl text-gray-400 mb-3"></i>
      <h3 class="text-sm font-medium text-gray-900 mb-1">No Element Selected</h3>
      <p class="text-xs text-gray-500">
        Click on an element in the canvas to edit its properties
      </p>
    </div>

    <!-- Properties Form -->
    <template v-else>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-gray-900">
          <i :class="['fas', config?.icon, 'mr-2']"></i>
          {{ config?.label }} Properties
        </h2>
        <button
          @click="emailBuilder.selectElement(null)"
          class="text-gray-400 hover:text-gray-900"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Content Editor (for text, button) -->
      <div
        v-if="selectedElement.type === 'mj-text' || selectedElement.type === 'mj-button'"
        class="mb-4"
      >
        <label class="block text-xs font-medium text-gray-600 mb-2">Content</label>
        <textarea
          v-if="selectedElement.type === 'mj-text'"
          v-model="localContent"
          @blur="handleContentBlur"
          class="w-full min-h-[100px] text-sm py-2 px-3 border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter text content..."
        ></textarea>
        <input
          v-else
          v-model="localContent"
          @blur="handleContentBlur"
          type="text"
          class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Button text..."
        />
      </div>

      <!-- Attributes -->
      <div class="space-y-3">
        <div
          v-for="attr in config?.editableAttributes"
          :key="attr.name"
          class="attribute-field"
        >
          <label class="block text-xs font-medium text-gray-600 mb-2">{{ attr.label }}</label>

          <!-- Color Input -->
          <div v-if="attr.type === 'color'" class="flex gap-2">
            <input
              :value="selectedElement.attributes[attr.name] || attr.default || '#000000'"
              @input="handleAttributeChange(attr.name, ($event.target as HTMLInputElement).value)"
              type="color"
              class="w-10 h-8 rounded border border-gray-200 cursor-pointer"
            />
            <input
              :value="selectedElement.attributes[attr.name] || attr.default || ''"
              @input="handleAttributeChange(attr.name, ($event.target as HTMLInputElement).value)"
              type="text"
              class="flex-1 py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="#000000"
            />
          </div>

          <!-- Select Input -->
          <select
            v-else-if="attr.type === 'select'"
            :value="selectedElement.attributes[attr.name] || attr.default || ''"
            @change="handleAttributeChange(attr.name, ($event.target as HTMLSelectElement).value)"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">-- Select --</option>
            <option
              v-for="option in attr.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>

          <!-- Textarea Input -->
          <textarea
            v-else-if="attr.type === 'textarea'"
            :value="selectedElement.attributes[attr.name] || attr.default || ''"
            @input="handleAttributeChange(attr.name, ($event.target as HTMLTextAreaElement).value)"
            class="w-full min-h-[80px] text-sm py-2 px-3 border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          ></textarea>

          <!-- URL Input -->
          <input
            v-else-if="attr.type === 'url'"
            :value="selectedElement.attributes[attr.name] || attr.default || ''"
            @input="handleAttributeChange(attr.name, ($event.target as HTMLInputElement).value)"
            type="url"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="https://..."
          />

          <!-- Number Input -->
          <input
            v-else-if="attr.type === 'number'"
            :value="selectedElement.attributes[attr.name] || attr.default || ''"
            @input="handleAttributeChange(attr.name, ($event.target as HTMLInputElement).value)"
            type="number"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <!-- Text Input (default) -->
          <input
            v-else
            :value="selectedElement.attributes[attr.name] || attr.default || ''"
            @input="handleAttributeChange(attr.name, ($event.target as HTMLInputElement).value)"
            type="text"
            class="w-full py-1.5 px-2.5 text-sm border border-gray-200 rounded-md bg-white text-gray-900 transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.property-panel {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.property-panel::-webkit-scrollbar {
  width: 6px;
}

.property-panel::-webkit-scrollbar-track {
  background: transparent;
}

.property-panel::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

.property-panel::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.attribute-field {
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}

.attribute-field:last-child {
  border-bottom: none;
}
</style>
