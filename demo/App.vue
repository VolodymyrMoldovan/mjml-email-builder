<script setup lang="ts">
import { ref } from 'vue';
import { EmailBuilder } from '../src';

const savedMjml = ref('');
const showSaveModal = ref(false);

const handleSave = (mjml: string) => {
  savedMjml.value = mjml;
  showSaveModal.value = true;
  console.log('Saved MJML:', mjml);
};

const handleChange = (mjml: string) => {
  console.log('Template changed');
};

const closeSaveModal = () => {
  showSaveModal.value = false;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(savedMjml.value);
};
</script>

<template>
  <div class="demo-app">
    <header class="demo-header">
      <div class="demo-header-content">
        <h1>
          <i class="fas fa-envelope-open-text"></i>
          MJML Email Builder
        </h1>
        <p>A Vue 3 drag-and-drop email template builder</p>
      </div>
      <div class="demo-header-links">
        <a href="https://github.com/yourusername/mjml-email-builder" target="_blank" class="demo-link">
          <i class="fab fa-github"></i>
          GitHub
        </a>
        <a href="https://mjml.io/documentation" target="_blank" class="demo-link">
          <i class="fas fa-book"></i>
          MJML Docs
        </a>
      </div>
    </header>

    <main class="demo-main">
      <EmailBuilder @save="handleSave" @change="handleChange" />
    </main>

    <!-- Save Modal -->
    <div v-if="showSaveModal" class="modal-overlay" @click="closeSaveModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>
            <i class="fas fa-check-circle text-green-500"></i>
            Template Saved!
          </h2>
          <button @click="closeSaveModal" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Your MJML template has been saved. You can copy the code below:</p>
          <div class="code-preview">
            <pre>{{ savedMjml.slice(0, 500) }}{{ savedMjml.length > 500 ? '...' : '' }}</pre>
          </div>
          <div class="modal-actions">
            <button @click="copyToClipboard" class="btn btn-primary">
              <i class="fas fa-copy"></i>
              Copy MJML
            </button>
            <button @click="closeSaveModal" class="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.demo-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.demo-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo-header p {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  opacity: 0.8;
}

.demo-header-links {
  display: flex;
  gap: 1rem;
}

.demo-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.demo-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.demo-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
}

.modal-close:hover {
  color: #1f2937;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0 0 1rem;
  color: #4b5563;
}

.code-preview {
  background: #1e293b;
  border-radius: 0.375rem;
  padding: 1rem;
  max-height: 200px;
  overflow: auto;
}

.code-preview pre {
  margin: 0;
  font-size: 0.75rem;
  color: #e2e8f0;
  white-space: pre-wrap;
  word-break: break-all;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.text-green-500 {
  color: #22c55e;
}
</style>
