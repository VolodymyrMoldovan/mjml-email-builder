<script setup lang="ts">
import { inject, computed, ref, watch, onMounted, onUnmounted } from 'vue';
import type { EmailElementType, EmailElement } from '../types';
import { ELEMENT_CONFIGS } from '../types';
import mjml2html from 'mjml-browser';

const emailBuilder = inject('emailBuilder') as ReturnType<typeof import('../useEmailBuilder').useEmailBuilder>;

const viewMode = ref<'edit' | 'preview'>('edit');
const renderedHtml = ref('');
const editableHtml = ref('');
const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeHeight = ref(600);

const canvasStyle = computed(() => ({
  backgroundColor: emailBuilder.template.value.attributes.backgroundColor,
  width: emailBuilder.template.value.attributes.width,
  fontFamily: emailBuilder.template.value.attributes.fontFamily
}));

const mjmlOutput = computed(() => emailBuilder.generateMjml());

// Generate element ID mappings for the MJML
const generateMjmlWithIds = (): { mjml: string; elementMap: Map<string, EmailElement> } => {
  const elementMap = new Map<string, EmailElement>();

  const processElement = (element: EmailElement, indent: number): string => {
    const indentStr = '  '.repeat(indent);
    elementMap.set(element.id, element);

    const attrs = Object.entries(element.attributes)
      .filter(([_, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');

    // Add css-class for selection styling
    const cssClass = element.attributes['css-class']
      ? `${element.attributes['css-class']} eb-${element.id}`
      : `eb-${element.id}`;
    const cssClassAttr = `css-class="${cssClass}"`;

    if (element.children && element.children.length > 0) {
      let result = `${indentStr}<${element.type} ${cssClassAttr}${attrs ? ' ' + attrs : ''}>\n`;
      element.children.forEach(child => {
        result += processElement(child, indent + 1);
      });
      result += `${indentStr}</${element.type}>\n`;
      return result;
    } else if (element.content) {
      return `${indentStr}<${element.type} ${cssClassAttr}${attrs ? ' ' + attrs : ''}>${element.content}</${element.type}>\n`;
    } else {
      return `${indentStr}<${element.type} ${cssClassAttr}${attrs ? ' ' + attrs : ''} />\n`;
    }
  };

  const template = emailBuilder.template.value;
  let mjml = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="${template.attributes.fontFamily}" />
    </mj-attributes>
    <mj-style>
      .eb-hover { outline: 2px solid rgba(59, 130, 246, 0.5) !important; outline-offset: -2px; cursor: pointer; }
      .eb-selected { outline: 2px solid #3b82f6 !important; outline-offset: -2px; position: relative; }
    </mj-style>
  </mj-head>
  <mj-body background-color="${template.attributes.backgroundColor}" width="${template.attributes.width}">
`;

  template.body.forEach(element => {
    mjml += processElement(element, 2);
  });

  mjml += `  </mj-body>
</mjml>`;

  return { mjml, elementMap };
};

// Build the interaction script with floating toolbar
const buildInteractionScript = (): string => {
  return `
<style>
  .eb-toolbar {
    position: fixed;
    display: none;
    align-items: center;
    gap: 2px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .eb-toolbar.visible { display: flex; }
  .eb-toolbar-label {
    padding: 4px 8px;
    font-size: 11px;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 4px;
    border-right: 1px solid #e5e7eb;
    margin-right: 2px;
  }
  .eb-toolbar-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
  }
  .eb-toolbar-btn:hover { background: #f3f4f6; }
  .eb-toolbar-btn.danger:hover { background: #fee2e2; color: #dc2626; }
  .eb-toolbar-btn svg { width: 14px; height: 14px; }
  .eb-drop-target { outline: 2px dashed #3b82f6 !important; outline-offset: -2px; background-color: rgba(59, 130, 246, 0.1) !important; }
  .eb-drop-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: #3b82f6;
    pointer-events: none;
    z-index: 9999;
    border-radius: 2px;
  }
</style>

<div id="eb-toolbar" class="eb-toolbar">
  <div class="eb-toolbar-label">
    <span id="eb-toolbar-icon"></span>
    <span id="eb-toolbar-name">Element</span>
  </div>
  <button class="eb-toolbar-btn" id="eb-btn-up" title="Move Up">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
  </button>
  <button class="eb-toolbar-btn" id="eb-btn-down" title="Move Down">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <button class="eb-toolbar-btn" id="eb-btn-copy" title="Duplicate">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
  </button>
  <button class="eb-toolbar-btn danger" id="eb-btn-delete" title="Delete">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
  </button>
</div>

<script>
(function() {
  var hoveredEl = null;
  var selectedId = null;
  var selectedEl = null;
  var toolbar = document.getElementById('eb-toolbar');
  var toolbarName = document.getElementById('eb-toolbar-name');

  var elementLabels = {
    'mj-section': 'Section',
    'mj-column': 'Column',
    'mj-text': 'Text',
    'mj-image': 'Image',
    'mj-button': 'Button',
    'mj-divider': 'Divider',
    'mj-spacer': 'Spacer',
    'mj-social': 'Social',
    'mj-hero': 'Hero',
    'mj-navbar': 'Navbar',
    'mj-table': 'Table',
    'mj-accordion': 'Accordion',
    'mj-carousel': 'Carousel',
    'mj-wrapper': 'Wrapper',
    'mj-group': 'Group',
    'mj-raw': 'Raw HTML'
  };

  function getElementId(el) {
    while (el && el !== document.body) {
      var cls = el.className || '';
      if (typeof cls === 'string') {
        var match = cls.match(/eb-([a-zA-Z0-9_-]+)/);
        if (match) return match[1];
      }
      el = el.parentElement;
    }
    return null;
  }

  function getElementType(id) {
    if (!id) return null;
    var el = document.querySelector('.eb-' + id);
    if (!el) return null;
    var cls = el.className || '';
    // Try to find mj-* class
    var types = Object.keys(elementLabels);
    for (var i = 0; i < types.length; i++) {
      if (cls.indexOf(types[i].replace('mj-', 'mj-')) >= 0) {
        return types[i];
      }
    }
    return null;
  }

  function positionToolbar() {
    if (!selectedEl || !toolbar) return;
    var rect = selectedEl.getBoundingClientRect();
    var toolbarWidth = 200;
    var toolbarHeight = 36;
    var top = rect.top - toolbarHeight - 4;
    if (top < 0) top = rect.bottom + 4;
    // Position on the right side of the element
    var right = window.innerWidth - rect.right;
    if (right < 10) right = 10;
    if (rect.right < toolbarWidth) right = window.innerWidth - toolbarWidth - 10;
    toolbar.style.top = top + 'px';
    toolbar.style.left = 'auto';
    toolbar.style.right = right + 'px';
  }

  function showToolbar(id, type) {
    if (!toolbar) return;
    var label = elementLabels[type] || 'Element';
    toolbarName.textContent = label;
    toolbar.classList.add('visible');
    positionToolbar();
  }

  function hideToolbar() {
    if (toolbar) toolbar.classList.remove('visible');
  }

  document.body.addEventListener('mouseover', function(e) {
    var id = getElementId(e.target);
    if (id && id !== selectedId) {
      if (hoveredEl) hoveredEl.classList.remove('eb-hover');
      var el = document.querySelector('.eb-' + id);
      if (el) {
        el.classList.add('eb-hover');
        hoveredEl = el;
      }
    }
  });

  document.body.addEventListener('mouseout', function(e) {
    var id = getElementId(e.target);
    if (hoveredEl && id) {
      hoveredEl.classList.remove('eb-hover');
      hoveredEl = null;
    }
  });

  document.body.addEventListener('click', function(e) {
    if (e.target.closest('#eb-toolbar')) return;
    if (e.target.closest('#eb-inline-editor')) return;
    e.preventDefault();
    e.stopPropagation();
    var id = getElementId(e.target);
    window.parent.postMessage({ type: 'eb-click', id: id }, '*');
  });

  // Inline editing
  var inlineEditor = null;
  var editingId = null;
  var editingType = null;

  function createInlineEditor() {
    if (inlineEditor) return inlineEditor;
    inlineEditor = document.createElement('div');
    inlineEditor.id = 'eb-inline-editor';
    inlineEditor.contentEditable = 'true';
    inlineEditor.style.cssText = 'position:fixed;min-width:200px;min-height:40px;padding:10px 15px;background:white;border:2px solid #3b82f6;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-family:inherit;font-size:14px;line-height:1.5;z-index:10001;outline:none;overflow:auto;max-height:300px;';
    document.body.appendChild(inlineEditor);

    inlineEditor.addEventListener('keydown', function(e) {
      e.stopPropagation();
      if (e.key === 'Escape') {
        cancelInlineEdit();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        finishInlineEdit();
      }
    });

    inlineEditor.addEventListener('blur', function(e) {
      // Small delay to check if focus moved to a valid target
      setTimeout(function() {
        if (document.activeElement !== inlineEditor) {
          finishInlineEdit();
        }
      }, 100);
    });

    return inlineEditor;
  }

  function startInlineEdit(id, el) {
    if (!id || !el) return;

    // Get element type
    var type = null;
    var cls = el.className || '';
    if (cls.indexOf('mj-text') >= 0 || el.querySelector('p, div')) type = 'mj-text';
    else if (cls.indexOf('mj-button') >= 0 || el.tagName === 'A') type = 'mj-button';

    // Only allow editing text and button elements
    if (type !== 'mj-text' && type !== 'mj-button') return;

    editingId = id;
    editingType = type;

    var editor = createInlineEditor();

    // Find the text content element
    var textEl = el.querySelector('p, div, a') || el;
    var content = textEl.innerText || textEl.textContent || '';

    editor.innerText = content;

    // Position the editor over the element
    var rect = el.getBoundingClientRect();
    editor.style.top = rect.top + 'px';
    editor.style.left = rect.left + 'px';
    editor.style.width = Math.max(rect.width, 200) + 'px';
    editor.style.display = 'block';

    editor.focus();

    // Select all text
    var range = document.createRange();
    range.selectNodeContents(editor);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // Hide toolbar while editing
    hideToolbar();
  }

  function finishInlineEdit() {
    if (!inlineEditor || !editingId) return;

    var newContent = inlineEditor.innerText || '';
    window.parent.postMessage({
      type: 'eb-inline-edit',
      id: editingId,
      content: newContent
    }, '*');

    inlineEditor.style.display = 'none';
    editingId = null;
    editingType = null;
  }

  function cancelInlineEdit() {
    if (!inlineEditor) return;
    inlineEditor.style.display = 'none';
    editingId = null;
    editingType = null;
  }

  document.body.addEventListener('dblclick', function(e) {
    if (e.target.closest('#eb-toolbar')) return;
    if (e.target.closest('#eb-inline-editor')) return;
    e.preventDefault();
    e.stopPropagation();

    var id = getElementId(e.target);
    if (id) {
      var el = document.querySelector('.eb-' + id);
      if (el) {
        startInlineEdit(id, el);
      }
    }
  });

  // Toolbar button handlers
  document.getElementById('eb-btn-up').addEventListener('click', function(e) {
    e.stopPropagation();
    if (selectedId) window.parent.postMessage({ type: 'eb-action', action: 'move-up', id: selectedId }, '*');
  });
  document.getElementById('eb-btn-down').addEventListener('click', function(e) {
    e.stopPropagation();
    if (selectedId) window.parent.postMessage({ type: 'eb-action', action: 'move-down', id: selectedId }, '*');
  });
  document.getElementById('eb-btn-copy').addEventListener('click', function(e) {
    e.stopPropagation();
    if (selectedId) window.parent.postMessage({ type: 'eb-action', action: 'duplicate', id: selectedId }, '*');
  });
  document.getElementById('eb-btn-delete').addEventListener('click', function(e) {
    e.stopPropagation();
    if (selectedId) window.parent.postMessage({ type: 'eb-action', action: 'delete', id: selectedId }, '*');
  });

  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'eb-select') {
      var prev = document.querySelector('.eb-selected');
      if (prev) prev.classList.remove('eb-selected');
      selectedId = e.data.id;
      selectedEl = null;
      if (selectedId) {
        var el = document.querySelector('.eb-' + selectedId);
        if (el) {
          el.classList.add('eb-selected');
          selectedEl = el;
          showToolbar(selectedId, e.data.elementType);
        }
      } else {
        hideToolbar();
      }
    }
  });

  window.addEventListener('scroll', positionToolbar);
  window.addEventListener('resize', positionToolbar);

  function sendHeight() {
    var h = document.documentElement.scrollHeight || 400;
    window.parent.postMessage({ type: 'eb-height', height: h }, '*');
  }

  if (window.ResizeObserver) {
    new ResizeObserver(sendHeight).observe(document.body);
  }
  setTimeout(sendHeight, 100);
  window.addEventListener('load', sendHeight);

  // Drag and drop handling for content elements
  var currentDropTarget = null;
  var draggedType = null;

  function findDropContainer(el) {
    while (el && el !== document.body) {
      var cls = el.className || '';
      if (typeof cls === 'string') {
        var match = cls.match(/eb-([a-zA-Z0-9_-]+)/);
        if (match) {
          return { el: el, id: match[1] };
        }
      }
      el = el.parentElement;
    }
    return null;
  }

  function clearDropTarget() {
    if (currentDropTarget) {
      currentDropTarget.classList.remove('eb-drop-target');
      currentDropTarget = null;
    }
  }

  // Listen for drag state from parent
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'eb-drag-start') {
      draggedType = e.data.elementType;
    } else if (e.data && e.data.type === 'eb-drag-end') {
      draggedType = null;
      clearDropTarget();
    }
  });

  document.body.addEventListener('dragover', function(e) {
    if (!draggedType) return;
    e.preventDefault();
    e.stopPropagation();

    var container = findDropContainer(e.target);
    if (container) {
      if (currentDropTarget !== container.el) {
        clearDropTarget();
        currentDropTarget = container.el;
        currentDropTarget.classList.add('eb-drop-target');
      }
    }
  });

  document.body.addEventListener('dragleave', function(e) {
    if (!draggedType) return;
    if (e.relatedTarget === null || !document.body.contains(e.relatedTarget)) {
      clearDropTarget();
    }
  });

  document.body.addEventListener('drop', function(e) {
    if (!draggedType) return;
    e.preventDefault();
    e.stopPropagation();

    var container = findDropContainer(e.target);
    if (container) {
      window.parent.postMessage({
        type: 'eb-drop',
        elementType: draggedType,
        targetId: container.id
      }, '*');
    }

    clearDropTarget();
    draggedType = null;
  });
})();
<\/script>
`;
};

// Render MJML for preview mode
watch(mjmlOutput, (mjml) => {
  if (mjml) {
    try {
      const result = mjml2html(mjml, { validationLevel: 'soft' });
      renderedHtml.value = result.html;
    } catch (e) {
      console.error('MJML render error:', e);
      renderedHtml.value = '';
    }
  }
}, { immediate: true });

// Render MJML for edit mode with element IDs
watch([() => emailBuilder.template.value, () => emailBuilder.template.value.body], () => {
  try {
    const { mjml } = generateMjmlWithIds();
    const result = mjml2html(mjml, { validationLevel: 'soft' });
    const script = buildInteractionScript();
    editableHtml.value = result.html.replace('</body>', script + '</body>');
  } catch (e) {
    console.error('MJML edit render error:', e);
    editableHtml.value = '';
  }
}, { immediate: true, deep: true });

// Handle messages from iframe
const handleMessage = (e: MessageEvent) => {
  if (!e.data || typeof e.data !== 'object') return;

  if (e.data.type === 'eb-click') {
    emailBuilder.selectElement(e.data.id || null);
  } else if (e.data.type === 'eb-height') {
    iframeHeight.value = Math.max(400, e.data.height || 400);
  } else if (e.data.type === 'eb-action') {
    const id = e.data.id;
    if (!id) return;
    switch (e.data.action) {
      case 'move-up':
        emailBuilder.moveElement(id, 'up');
        break;
      case 'move-down':
        emailBuilder.moveElement(id, 'down');
        break;
      case 'duplicate':
        emailBuilder.duplicateElement(id);
        break;
      case 'delete':
        emailBuilder.removeElement(id);
        break;
    }
  } else if (e.data.type === 'eb-drop') {
    // Handle drop from iframe
    const { elementType, targetId } = e.data;
    if (elementType && targetId) {
      emailBuilder.addElement(elementType, targetId);
    }
    emailBuilder.isDragging.value = false;
    emailBuilder.draggedType.value = null;
  } else if (e.data.type === 'eb-inline-edit') {
    // Handle inline text editing
    const { id, content } = e.data;
    if (id && content !== undefined) {
      emailBuilder.updateElementContent(id, content);
    }
  }
};

// Sync selection state with iframe when it loads or selection changes
const syncSelectionToIframe = () => {
  if (iframeRef.value?.contentWindow) {
    const selectedEl = emailBuilder.selectedElement.value;
    iframeRef.value.contentWindow.postMessage(
      {
        type: 'eb-select',
        id: emailBuilder.selectedElementId.value,
        elementType: selectedEl?.type || null
      },
      '*'
    );
  }
};

// Watch for iframe load to sync initial selection
const handleIframeLoad = () => {
  setTimeout(syncSelectionToIframe, 50);
};

watch(() => emailBuilder.selectedElementId.value, () => {
  syncSelectionToIframe();
});

// Notify iframe when drag state changes
watch(() => emailBuilder.isDragging.value, (isDragging) => {
  if (iframeRef.value?.contentWindow) {
    if (isDragging) {
      iframeRef.value.contentWindow.postMessage({
        type: 'eb-drag-start',
        elementType: emailBuilder.draggedType.value
      }, '*');
    } else {
      iframeRef.value.contentWindow.postMessage({
        type: 'eb-drag-end'
      }, '*');
    }
  }
});

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});

const handleDragOver = (e: DragEvent) => {
  if (viewMode.value !== 'edit') return;
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy';
  }
};

const handleDrop = (e: DragEvent) => {
  if (viewMode.value !== 'edit') return;
  e.preventDefault();
  const type = e.dataTransfer?.getData('elementType') as EmailElementType;
  if (type && (type === 'mj-section' || type === 'mj-hero')) {
    emailBuilder.addElement(type);
  }
  emailBuilder.isDragging.value = false;
  emailBuilder.draggedType.value = null;
};

const handleCanvasClick = (e: MouseEvent) => {
  if (viewMode.value !== 'edit') return;
  if (e.target === e.currentTarget) {
    emailBuilder.selectElement(null);
  }
};
</script>

<template>
  <div class="email-canvas-container flex flex-col h-full">
    <!-- Canvas Content -->
    <div
      class="email-canvas-wrapper flex-1"
      @click="handleCanvasClick"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <!-- Edit Mode with Iframe -->
      <div
        v-if="viewMode === 'edit'"
        class="email-canvas mx-auto shadow-lg bg-white"
        :style="{ width: canvasStyle.width }"
      >
        <!-- Empty State -->
        <div
          v-if="emailBuilder.template.value.body.length === 0"
          class="empty-state flex flex-col items-center justify-center py-32 text-center"
          :class="{ 'drop-zone-active': emailBuilder.isDragging.value }"
        >
          <i class="fas fa-envelope-open-text text-4xl text-muted-foreground mb-4"></i>
          <h3 class="text-lg font-medium text-foreground mb-2">Start Building Your Email</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Drag a Section or Hero element here to begin
          </p>
          <div class="flex gap-2">
            <button
              @click="emailBuilder.addElement('mj-section')"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            >
              <i class="fas fa-plus mr-1"></i>
              Add Section
            </button>
            <button
              @click="emailBuilder.addElement('mj-hero')"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer border py-1.5 px-3 bg-transparent border-gray-200 text-gray-900 hover:bg-gray-100"
            >
              <i class="fas fa-star mr-1"></i>
              Add Hero
            </button>
          </div>
        </div>

        <!-- Iframe with MJML Content -->
        <template v-if="emailBuilder.template.value.body.length > 0">
          <!-- Drop Zone Indicator for sections/heroes (shown at top) -->
          <div
            v-if="emailBuilder.isDragging.value && (emailBuilder.draggedType.value === 'mj-section' || emailBuilder.draggedType.value === 'mj-hero')"
            class="drop-zone-indicator"
          >
            <i class="fas fa-plus-circle mr-2"></i>
            Drop to add {{ ELEMENT_CONFIGS[emailBuilder.draggedType.value!]?.label || 'element' }}
          </div>

          <iframe
            ref="iframeRef"
            :srcdoc="editableHtml"
            class="w-full border-0"
            :style="{ height: iframeHeight + 'px' }"
            sandbox="allow-same-origin allow-scripts"
            @load="handleIframeLoad"
          ></iframe>
        </template>
      </div>

      <!-- Preview Mode -->
      <div
        v-else
        class="email-preview-frame mx-auto shadow-lg bg-white"
        :style="{ width: canvasStyle.width }"
      >
        <iframe
          v-if="renderedHtml"
          :srcdoc="renderedHtml"
          class="w-full border-0"
          style="min-height: 600px; height: 100%;"
          sandbox="allow-same-origin"
        ></iframe>
        <div v-else class="flex items-center justify-center py-20">
          <div class="text-center text-gray-500">
            <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
            <p class="text-sm">Rendering preview...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-canvas-container {
  min-height: 100%;
}

.email-canvas-wrapper {
  min-height: 400px;
}

.email-canvas {
  min-height: 400px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.email-preview-frame {
  min-height: 600px;
  border-radius: 8px;
  overflow: hidden;
}

.empty-state {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  margin: 20px;
  transition: all 0.2s;
}

.empty-state.drop-zone-active {
  border-color: var(--primary, #3b82f6);
  background-color: rgba(59, 130, 246, 0.05);
}

.drop-zone-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed var(--primary, #3b82f6);
  border-radius: 8px;
  margin: 10px 20px;
  background-color: rgba(59, 130, 246, 0.05);
  color: var(--primary, #3b82f6);
  font-size: 14px;
}
</style>
