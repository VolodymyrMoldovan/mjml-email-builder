import { config } from '@vue/test-utils';

// Global test setup
config.global.stubs = {
  // Stub any global components if needed
};

// Mock DOMParser for MJML import tests
if (typeof window !== 'undefined' && !window.DOMParser) {
  // DOMParser should be available in happy-dom
}
