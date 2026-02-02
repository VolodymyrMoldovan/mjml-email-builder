import { ref, computed } from 'vue';
import type { EmailElement, EmailTemplate, EmailElementType } from './types';
import { createDefaultElement, generateId, ELEMENT_CONFIGS } from './types';

export const useEmailBuilder = () => {
  const template = ref<EmailTemplate>({
    id: generateId(),
    name: 'New Template',
    subject: 'Email Subject',
    body: [],
    attributes: {
      backgroundColor: '#f4f4f4',
      width: '600px',
      fontFamily: 'Arial, sans-serif'
    }
  });

  const selectedElementId = ref<string | null>(null);
  const isDragging = ref(false);
  const draggedType = ref<EmailElementType | null>(null);

  const selectedElement = computed(() => {
    if (!selectedElementId.value) return null;
    return findElementById(template.value.body, selectedElementId.value);
  });

  const findElementById = (elements: EmailElement[], id: string): EmailElement | null => {
    for (const element of elements) {
      if (element.id === id) return element;
      if (element.children) {
        const found = findElementById(element.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentElement = (elements: EmailElement[], id: string, parent: EmailElement | null = null): { parent: EmailElement | null; index: number } | null => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].id === id) {
        return { parent, index: i };
      }
      if (elements[i].children) {
        const found = findParentElement(elements[i].children!, id, elements[i]);
        if (found) return found;
      }
    }
    return null;
  };

  const findColumnOrSectionForElement = (elementId: string): EmailElement | null => {
    // Find the element and traverse up to find a suitable parent (column for content, body for sections)
    const element = findElementById(template.value.body, elementId);
    if (!element) return null;

    // If the element is a column, return it
    if (element.type === 'mj-column') return element;

    // If the element is a section or hero, return its first column (or create one)
    if (element.type === 'mj-section' || element.type === 'mj-hero') {
      if (element.children && element.children.length > 0) {
        // Return first column
        const column = element.children.find(c => c.type === 'mj-column');
        if (column) return column;
      }
      // Create a column if none exists
      const newColumn: EmailElement = {
        id: generateId(),
        type: 'mj-column',
        attributes: { ...ELEMENT_CONFIGS['mj-column'].defaultAttributes },
        children: []
      };
      if (!element.children) element.children = [];
      element.children.push(newColumn);
      return newColumn;
    }

    // For content elements, find their parent column
    const result = findParentElement(template.value.body, elementId);
    if (result && result.parent) {
      return findColumnOrSectionForElement(result.parent.id);
    }

    return null;
  };

  const addElement = (type: EmailElementType, parentId?: string) => {
    const newElement = createDefaultElement(type);

    if (type === 'mj-section' || type === 'mj-hero') {
      template.value.body.push(newElement);
    } else if (parentId) {
      // Find the appropriate parent (column) for content elements
      const targetColumn = findColumnOrSectionForElement(parentId);
      if (targetColumn && targetColumn.children) {
        targetColumn.children.push(newElement);
      }
    }

    selectedElementId.value = newElement.id;
    return newElement;
  };

  const removeElement = (id: string) => {
    const result = findParentElement(template.value.body, id);
    if (!result) return;

    const { parent, index } = result;
    if (parent && parent.children) {
      parent.children.splice(index, 1);
    } else {
      template.value.body.splice(index, 1);
    }

    if (selectedElementId.value === id) {
      selectedElementId.value = null;
    }
  };

  const regenerateIds = (element: EmailElement) => {
    element.id = generateId();
    if (element.children) {
      element.children.forEach(regenerateIds);
    }
  };

  const duplicateElement = (id: string) => {
    const element = findElementById(template.value.body, id);
    if (!element) return;

    const result = findParentElement(template.value.body, id);
    if (!result) return;

    const clonedElement = JSON.parse(JSON.stringify(element));
    regenerateIds(clonedElement);

    const { parent, index } = result;
    if (parent && parent.children) {
      parent.children.splice(index + 1, 0, clonedElement);
    } else {
      template.value.body.splice(index + 1, 0, clonedElement);
    }

    selectedElementId.value = clonedElement.id;
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const result = findParentElement(template.value.body, id);
    if (!result) return;

    const { parent, index } = result;
    const array = parent?.children ?? template.value.body;
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= array.length) return;

    const [removed] = array.splice(index, 1);
    array.splice(newIndex, 0, removed);
  };

  const updateElementAttribute = (id: string, key: string, value: string) => {
    const element = findElementById(template.value.body, id);
    if (element) {
      element.attributes[key] = value;
    }
  };

  const updateElementContent = (id: string, content: string) => {
    const element = findElementById(template.value.body, id);
    if (element) {
      element.content = content;
    }
  };

  const selectElement = (id: string | null) => {
    selectedElementId.value = id;
  };

  const addColumnToSection = (sectionId: string) => {
    const section = findElementById(template.value.body, sectionId);
    if (section && section.type === 'mj-section' && section.children) {
      const newColumn: EmailElement = {
        id: generateId(),
        type: 'mj-column',
        attributes: { ...ELEMENT_CONFIGS['mj-column'].defaultAttributes },
        children: []
      };
      section.children.push(newColumn);
    }
  };

  const renderElement = (element: EmailElement, indent: number): string => {
    const indentStr = '  '.repeat(indent);
    const attrs = Object.entries(element.attributes)
      .filter(([_, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');

    if (element.children && element.children.length > 0) {
      let result = `${indentStr}<${element.type}${attrs ? ' ' + attrs : ''}>\n`;
      element.children.forEach(child => {
        result += renderElement(child, indent + 1);
      });
      result += `${indentStr}</${element.type}>\n`;
      return result;
    } else if (element.content) {
      return `${indentStr}<${element.type}${attrs ? ' ' + attrs : ''}>${element.content}</${element.type}>\n`;
    } else {
      return `${indentStr}<${element.type}${attrs ? ' ' + attrs : ''} />\n`;
    }
  };

  const generateMjml = (): string => {
    let mjml = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="${template.value.attributes.fontFamily}" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="${template.value.attributes.backgroundColor}" width="${template.value.attributes.width}">
`;

    template.value.body.forEach(element => {
      mjml += renderElement(element, 2);
    });

    mjml += `  </mj-body>
</mjml>`;

    return mjml;
  };

  const loadTemplate = (newTemplate: EmailTemplate) => {
    template.value = newTemplate;
    selectedElementId.value = null;
  };

  const clearTemplate = () => {
    template.value.body = [];
    selectedElementId.value = null;
  };

  const parseElement = (node: Element): EmailElement | null => {
    const tagName = node.tagName.toLowerCase() as EmailElementType;

    // Skip non-MJML elements or unsupported elements
    if (!ELEMENT_CONFIGS[tagName]) {
      // For unknown elements, try to parse children anyway (fallback)
      const childElements = Array.from(node.children);
      if (childElements.length > 0) {
        // Return first valid child or null
        for (const child of childElements) {
          const parsed = parseElement(child as Element);
          if (parsed) return parsed;
        }
      }
      return null;
    }

    const attributes: Record<string, string> = {};
    Array.from(node.attributes).forEach(attr => {
      attributes[attr.name] = attr.value;
    });

    const element: EmailElement = {
      id: generateId(),
      type: tagName,
      attributes
    };

    const childElements = Array.from(node.children);
    if (childElements.length > 0) {
      element.children = childElements
        .map(child => parseElement(child as Element))
        .filter((el): el is EmailElement => el !== null);
    }

    // Get inner HTML content including nested HTML tags (for mj-text, mj-button)
    const getInnerContent = (el: Element): string => {
      // For elements that can have HTML content, preserve it
      if (tagName === 'mj-text' || tagName === 'mj-button') {
        // Get innerHTML but handle XML serialization
        const serializer = new XMLSerializer();
        let content = '';
        Array.from(el.childNodes).forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            content += child.textContent || '';
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            // Skip MJML child elements, only include HTML
            const childTag = (child as Element).tagName.toLowerCase();
            if (!childTag.startsWith('mj-')) {
              content += serializer.serializeToString(child);
            }
          }
        });
        return content.trim();
      }
      // For other elements, just get text content
      return Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE || n.nodeType === Node.CDATA_SECTION_NODE)
        .map(n => n.textContent || '')
        .join('')
        .trim();
    };

    const textContent = getInnerContent(node);
    if (textContent && (!element.children || element.children.length === 0)) {
      element.content = textContent;
    }

    return element;
  };

  const importMjml = (mjmlCode: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(mjmlCode, 'text/xml');

      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        console.error('MJML parse error:', parseError.textContent);
        return false;
      }

      const mjBody = doc.querySelector('mj-body');
      if (!mjBody) {
        console.error('No mj-body found in MJML');
        return false;
      }

      // Reset template attributes to defaults before parsing
      template.value.attributes = {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      };
      template.value.name = 'New Template';

      // Parse mj-body attributes
      const bgColor = mjBody.getAttribute('background-color');
      const width = mjBody.getAttribute('width');
      if (bgColor) template.value.attributes.backgroundColor = bgColor;
      if (width) template.value.attributes.width = width;

      // Parse mj-head for global attributes
      const mjHead = doc.querySelector('mj-head');
      if (mjHead) {
        // Parse mj-attributes > mj-all
        const mjAll = mjHead.querySelector('mj-all');
        if (mjAll) {
          const fontFamily = mjAll.getAttribute('font-family');
          if (fontFamily) template.value.attributes.fontFamily = fontFamily;
        }

        // Parse mj-attributes > mj-text for default text styles
        const mjTextAttr = mjHead.querySelector('mj-attributes mj-text');
        if (mjTextAttr) {
          const fontFamily = mjTextAttr.getAttribute('font-family');
          if (fontFamily && !template.value.attributes.fontFamily) {
            template.value.attributes.fontFamily = fontFamily;
          }
        }

        // Parse mj-title (store in template name)
        const mjTitle = mjHead.querySelector('mj-title');
        if (mjTitle && mjTitle.textContent) {
          template.value.name = mjTitle.textContent.trim();
        }

        // Parse mj-preview (store for later use)
        const mjPreview = mjHead.querySelector('mj-preview');
        if (mjPreview && mjPreview.textContent) {
          (template.value as any).preview = mjPreview.textContent.trim();
        }
      }

      const bodyElements = Array.from(mjBody.children)
        .map(child => parseElement(child as Element))
        .filter((el): el is EmailElement => el !== null);

      template.value.body = bodyElements;
      selectedElementId.value = null;

      return true;
    } catch (error) {
      console.error('Error importing MJML:', error);
      return false;
    }
  };

  return {
    template,
    selectedElementId,
    selectedElement,
    isDragging,
    draggedType,
    addElement,
    removeElement,
    duplicateElement,
    moveElement,
    updateElementAttribute,
    updateElementContent,
    selectElement,
    addColumnToSection,
    generateMjml,
    loadTemplate,
    clearTemplate,
    importMjml
  };
};
