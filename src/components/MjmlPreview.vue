<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import mjml2html from 'mjml-browser';

const props = defineProps<{
  mjml: string;
}>();

const previewMode = ref<'desktop' | 'mobile'>('desktop');
const htmlContent = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);

const extractWidth = (mjml: string): string => {
  const match = mjml.match(/<mj-body[^>]*width="([^"]+)"/);
  return match ? match[1] : '600px';
};

const templateWidth = computed(() => extractWidth(props.mjml));

const iframeWidth = computed(() => {
  return previewMode.value === 'mobile' ? '375px' : templateWidth.value;
});

watch(() => props.mjml, async (newMjml) => {
  if (!newMjml) {
    htmlContent.value = '';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const result = mjml2html(newMjml, {
      validationLevel: 'soft'
    });

    if (result.errors && result.errors.length > 0) {
      console.warn('MJML validation errors:', result.errors);
    }

    htmlContent.value = result.html;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to render preview';
  } finally {
    isLoading.value = false;
  }
}, { immediate: true });
</script>

<template>
  <div class="mjml-preview flex-1 flex flex-col overflow-hidden">
    <!-- Preview Toolbar -->
    <div class="preview-toolbar flex items-center justify-center gap-2 p-4 flex-shrink-0">
      <div class="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
        <button
          @click="previewMode = 'desktop'"
          :class="[
            'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1 px-2.5',
            previewMode === 'desktop'
              ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
              : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900'
          ]"
        >
          <i class="fas fa-desktop mr-1"></i>
          Desktop
        </button>
        <button
          @click="previewMode = 'mobile'"
          :class="[
            'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1 px-2.5',
            previewMode === 'mobile'
              ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
              : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900'
          ]"
        >
          <i class="fas fa-mobile-alt mr-1"></i>
          Mobile
        </button>
      </div>
    </div>

    <!-- Preview Frame -->
    <div class="preview-container flex-1 overflow-auto bg-gray-100 p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-3"></i>
          <p class="text-sm text-gray-500">Rendering preview...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center h-full">
        <div class="text-center">
          <i class="fas fa-exclamation-triangle text-3xl text-red-500 mb-3"></i>
          <p class="text-sm text-red-500">{{ error }}</p>
        </div>
      </div>

      <!-- Preview -->
      <div
        v-else
        class="preview-frame mx-auto transition-all duration-300 bg-white shadow-lg"
        :style="{ width: iframeWidth }"
      >
        <iframe
          :srcdoc="htmlContent"
          class="w-full border-0"
          style="min-height: 600px; height: 100%;"
          sandbox="allow-same-origin"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mjml-preview {
  height: 100%;
}

.preview-container {
  min-height: 400px;
}

.preview-frame {
  min-height: 600px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
