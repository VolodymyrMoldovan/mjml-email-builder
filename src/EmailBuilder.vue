<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { useEmailBuilder } from './useEmailBuilder';
import { exampleTemplates, type ExampleTemplate } from './templates';
import { mjmlTemplates, type MjmlTemplate } from './mjmlTemplates';
import EmailCanvas from './components/EmailCanvas.vue';
import ElementToolbar from './components/ElementToolbar.vue';
import PropertyPanel from './components/PropertyPanel.vue';
import MjmlPreview from './components/MjmlPreview.vue';

defineProps<{
  initialTemplate?: string;
}>();

const emit = defineEmits<{
  save: [mjml: string];
  change: [mjml: string];
}>();

const emailBuilder = useEmailBuilder();
provide('emailBuilder', emailBuilder);

const activeTab = ref<'design' | 'code' | 'preview'>('design');
const showTemplatesDropdown = ref(false);
const manualMjmlCode = ref('');
const isCodeModified = ref(false);

const mjmlOutput = computed(() => emailBuilder.generateMjml());

const handleTabChange = (tab: 'design' | 'code' | 'preview') => {
  if (tab === 'code') {
    manualMjmlCode.value = mjmlOutput.value;
    isCodeModified.value = false;
  }
  activeTab.value = tab;
};

const handleCodeInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  manualMjmlCode.value = target.value;
  isCodeModified.value = manualMjmlCode.value !== mjmlOutput.value;
};

const handleApplyCode = () => {
  emailBuilder.importMjml(manualMjmlCode.value);
  isCodeModified.value = false;
};

const handleResetCode = () => {
  manualMjmlCode.value = mjmlOutput.value;
  isCodeModified.value = false;
};

const handleCopyCode = () => {
  navigator.clipboard.writeText(manualMjmlCode.value);
};

const templatesByCategory = computed(() => {
  const categories = {
    marketing: [] as ExampleTemplate[],
    transactional: [] as ExampleTemplate[],
    newsletter: [] as ExampleTemplate[],
    notification: [] as ExampleTemplate[]
  };

  exampleTemplates.forEach(template => {
    categories[template.category].push(template);
  });

  return categories;
});

const mjmlTemplatesByCategory = computed(() => {
  const categories = {
    marketing: [] as MjmlTemplate[],
    transactional: [] as MjmlTemplate[],
    newsletter: [] as MjmlTemplate[],
    notification: [] as MjmlTemplate[],
    ecommerce: [] as MjmlTemplate[],
    seasonal: [] as MjmlTemplate[]
  };

  mjmlTemplates.forEach(template => {
    categories[template.category].push(template);
  });

  return categories;
});

const categoryLabels: Record<string, string> = {
  marketing: 'Marketing',
  transactional: 'Transactional',
  newsletter: 'Newsletter',
  notification: 'Notifications',
  ecommerce: 'E-commerce',
  seasonal: 'Seasonal'
};

const handleSave = () => {
  emit('save', mjmlOutput.value);
};

const handleExport = () => {
  const blob = new Blob([mjmlOutput.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${emailBuilder.template.value.name || 'email-template'}.mjml`;
  a.click();
  URL.revokeObjectURL(url);
};

const loadExampleTemplate = (template: ExampleTemplate) => {
  emailBuilder.loadTemplate(JSON.parse(JSON.stringify(template.template)));
  showTemplatesDropdown.value = false;
};

const loadMjmlTemplate = (template: MjmlTemplate) => {
  emailBuilder.importMjml(template.mjml);
  showTemplatesDropdown.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.templates-dropdown-container')) {
    showTemplatesDropdown.value = false;
  }
};
</script>

<template>
  <div class="email-builder flex flex-col h-full bg-gray-50" @click="handleClickOutside">
    <!-- Header -->
    <header class="email-builder-header flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-semibold text-gray-900">Email Template Builder</h1>
        <button
          @click="emailBuilder.clearTemplate()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
        >
          <i class="fas fa-plus mr-1"></i>
          New
        </button>
        <div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            @click="handleTabChange('design')"
            :class="[
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1 px-2.5',
              activeTab === 'design'
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            ]"
          >
            <i class="fas fa-edit mr-1"></i>
            Design
          </button>
          <button
            @click="handleTabChange('code')"
            :class="[
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1 px-2.5',
              activeTab === 'code'
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            ]"
          >
            <i class="fas fa-code mr-1"></i>
            Code
          </button>
          <button
            @click="handleTabChange('preview')"
            :class="[
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1 px-2.5',
              activeTab === 'preview'
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            ]"
          >
            <i class="fas fa-eye mr-1"></i>
            Preview
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- Templates Dropdown -->
        <div class="templates-dropdown-container relative w-[480px]">
          <button
            @click.stop="showTemplatesDropdown = !showTemplatesDropdown"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
          >
            <i class="fas fa-file-alt mr-1"></i>
            Templates
            <i class="fas fa-chevron-down ml-1 text-xs"></i>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showTemplatesDropdown"
            class="templates-dropdown absolute right-0 top-full mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] overflow-hidden"
          >
            <div class="p-3 border-b border-gray-200 bg-gray-100">
              <h3 class="text-sm font-semibold text-gray-900">Email Templates</h3>
              <p class="text-xs text-gray-500">Choose a template to get started</p>
            </div>
            <div class="templates-dropdown-scroll max-h-[60vh] overflow-y-auto">
              <!-- MJML Templates Section -->
              <div class="px-3 py-2 bg-blue-50 border-b border-gray-200">
                <div class="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                  <i class="fas fa-star text-[10px]"></i>
                  MJML Templates
                </div>
              </div>
              <template v-for="(templates, category) in mjmlTemplatesByCategory" :key="'mjml-' + category">
                <div v-if="templates.length > 0" class="py-2">
                  <div class="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ categoryLabels[category] }}
                  </div>
                  <button
                    v-for="template in templates"
                    :key="template.id"
                    @click="loadMjmlTemplate(template)"
                    class="template-item w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <div class="text-sm font-medium text-gray-900">{{ template.name }}</div>
                    <div class="text-xs text-gray-500">{{ template.description }}</div>
                  </button>
                </div>
              </template>

              <!-- Custom Templates Section -->
              <div class="px-3 py-2 bg-gray-50 border-y border-gray-200 mt-2">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <i class="fas fa-puzzle-piece text-[10px]"></i>
                  Custom Templates
                </div>
              </div>
              <template v-for="(templates, category) in templatesByCategory" :key="'custom-' + category">
                <div v-if="templates.length > 0" class="py-2">
                  <div class="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ categoryLabels[category] }}
                  </div>
                  <button
                    v-for="template in templates"
                    :key="template.id"
                    @click="loadExampleTemplate(template)"
                    class="template-item w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <div class="text-sm font-medium text-gray-900">{{ template.name }}</div>
                    <div class="text-xs text-gray-500">{{ template.description }}</div>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <button
          @click="handleExport"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
        >
          <i class="fas fa-download mr-1"></i>
          Export MJML
        </button>
        <button
          @click="handleSave"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
        >
          <i class="fas fa-save mr-1"></i>
          Save
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="email-builder-content flex flex-1 overflow-hidden">
      <!-- Design Tab -->
      <template v-if="activeTab === 'design'">
        <!-- Left Sidebar - Elements -->
        <aside class="email-builder-sidebar w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <ElementToolbar />
        </aside>

        <!-- Center - Canvas -->
        <main class="email-builder-canvas flex-1 overflow-auto bg-gray-100 p-6">
          <EmailCanvas />
        </main>

        <!-- Right Sidebar - Properties -->
        <aside class="email-builder-properties w-80 border-l border-gray-200 bg-white overflow-y-auto">
          <PropertyPanel />
        </aside>
      </template>

      <!-- Code Tab -->
      <template v-else-if="activeTab === 'code'">
        <div class="flex-1 p-4 overflow-hidden flex flex-col">
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
              <div class="flex flex-col gap-1">
                <h2 class="text-base font-semibold text-gray-900">
                  MJML Source Code
                  <span v-if="isCodeModified" class="ml-2 text-xs text-amber-500">(modified)</span>
                </h2>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="isCodeModified"
                  @click="handleResetCode"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
                >
                  <i class="fas fa-undo mr-1"></i>
                  Reset
                </button>
                <button
                  v-if="isCodeModified"
                  @click="handleApplyCode"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                >
                  <i class="fas fa-check mr-1"></i>
                  Apply Changes
                </button>
                <button
                  @click="handleCopyCode"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
                >
                  <i class="fas fa-copy mr-1"></i>
                  Copy
                </button>
              </div>
            </div>
            <div class="p-4 flex-1 overflow-hidden">
              <textarea
                :value="manualMjmlCode"
                @input="handleCodeInput"
                class="code-editor w-full h-full bg-zinc-900 text-zinc-100 p-4 rounded-lg text-sm font-mono resize-none border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellcheck="false"
              ></textarea>
            </div>
          </div>
        </div>
      </template>

      <!-- Preview Tab -->
      <template v-else-if="activeTab === 'preview'">
        <MjmlPreview :mjml="mjmlOutput" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.email-builder {
  min-height: 600px;
  max-height: 100vh;
  overflow: hidden;
}

.email-builder-content {
  min-height: 0;
}

.email-builder-sidebar,
.email-builder-properties {
  flex-shrink: 0;
  min-height: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.email-builder-sidebar > *,
.email-builder-properties > * {
  flex: 1 1 auto;
  min-height: 0;
}

.templates-dropdown {
  animation: dropdown-fade-in 0.15s ease-out;
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
