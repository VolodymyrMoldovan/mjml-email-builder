// Uses vitest globals (config has globals: true)
import { useEmailBuilder } from '../src/useEmailBuilder';

describe('useEmailBuilder', () => {
  let emailBuilder: ReturnType<typeof useEmailBuilder>;

  beforeEach(() => {
    emailBuilder = useEmailBuilder();
  });

  describe('initialization', () => {
    it('should initialize with a default template', () => {
      expect(emailBuilder.template.value).toBeDefined();
      expect(emailBuilder.template.value.name).toBe('New Template');
      expect(emailBuilder.template.value.body).toEqual([]);
    });

    it('should have default template attributes', () => {
      expect(emailBuilder.template.value.attributes.backgroundColor).toBe('#f4f4f4');
      expect(emailBuilder.template.value.attributes.width).toBe('600px');
      expect(emailBuilder.template.value.attributes.fontFamily).toBe('Arial, sans-serif');
    });

    it('should have no selected element initially', () => {
      expect(emailBuilder.selectedElementId.value).toBeNull();
      expect(emailBuilder.selectedElement.value).toBeNull();
    });
  });

  describe('addElement', () => {
    it('should add a section to the body', () => {
      const section = emailBuilder.addElement('mj-section');

      expect(emailBuilder.template.value.body).toHaveLength(1);
      expect(emailBuilder.template.value.body[0].type).toBe('mj-section');
      expect(emailBuilder.selectedElementId.value).toBe(section.id);
    });

    it('should add a section with a default column', () => {
      const section = emailBuilder.addElement('mj-section');

      expect(section.children).toBeDefined();
      expect(section.children).toHaveLength(1);
      expect(section.children![0].type).toBe('mj-column');
    });

    it('should add a hero element to the body', () => {
      emailBuilder.addElement('mj-hero');

      expect(emailBuilder.template.value.body).toHaveLength(1);
      expect(emailBuilder.template.value.body[0].type).toBe('mj-hero');
    });

    it('should add content element to a column when parentId is provided', () => {
      const section = emailBuilder.addElement('mj-section');
      const column = section.children![0];

      emailBuilder.addElement('mj-text', column.id);

      expect(column.children).toHaveLength(1);
      expect(column.children![0].type).toBe('mj-text');
    });
  });

  describe('removeElement', () => {
    it('should remove a section from the body', () => {
      const section = emailBuilder.addElement('mj-section');
      expect(emailBuilder.template.value.body).toHaveLength(1);

      emailBuilder.removeElement(section.id);

      expect(emailBuilder.template.value.body).toHaveLength(0);
    });

    it('should deselect element when removed', () => {
      const section = emailBuilder.addElement('mj-section');
      expect(emailBuilder.selectedElementId.value).toBe(section.id);

      emailBuilder.removeElement(section.id);

      expect(emailBuilder.selectedElementId.value).toBeNull();
    });

    it('should remove a content element from a column', () => {
      const section = emailBuilder.addElement('mj-section');
      const column = section.children![0];
      const text = emailBuilder.addElement('mj-text', column.id);

      expect(column.children).toHaveLength(1);

      emailBuilder.removeElement(text.id);

      expect(column.children).toHaveLength(0);
    });
  });

  describe('duplicateElement', () => {
    it('should duplicate a section', () => {
      const section = emailBuilder.addElement('mj-section');

      emailBuilder.duplicateElement(section.id);

      expect(emailBuilder.template.value.body).toHaveLength(2);
      expect(emailBuilder.template.value.body[0].id).not.toBe(emailBuilder.template.value.body[1].id);
    });

    it('should select the duplicated element', () => {
      const section = emailBuilder.addElement('mj-section');
      const originalId = section.id;

      emailBuilder.duplicateElement(section.id);

      expect(emailBuilder.selectedElementId.value).not.toBe(originalId);
    });
  });

  describe('moveElement', () => {
    it('should move section up', () => {
      const section1 = emailBuilder.addElement('mj-section');
      const section2 = emailBuilder.addElement('mj-section');

      emailBuilder.moveElement(section2.id, 'up');

      expect(emailBuilder.template.value.body[0].id).toBe(section2.id);
      expect(emailBuilder.template.value.body[1].id).toBe(section1.id);
    });

    it('should move section down', () => {
      const section1 = emailBuilder.addElement('mj-section');
      const section2 = emailBuilder.addElement('mj-section');

      emailBuilder.moveElement(section1.id, 'down');

      expect(emailBuilder.template.value.body[0].id).toBe(section2.id);
      expect(emailBuilder.template.value.body[1].id).toBe(section1.id);
    });

    it('should not move first section up', () => {
      const section1 = emailBuilder.addElement('mj-section');
      emailBuilder.addElement('mj-section');

      emailBuilder.moveElement(section1.id, 'up');

      expect(emailBuilder.template.value.body[0].id).toBe(section1.id);
    });
  });

  describe('updateElementAttribute', () => {
    it('should update element attribute', () => {
      const section = emailBuilder.addElement('mj-section');

      emailBuilder.updateElementAttribute(section.id, 'background-color', '#ff0000');

      expect(emailBuilder.template.value.body[0].attributes['background-color']).toBe('#ff0000');
    });
  });

  describe('updateElementContent', () => {
    it('should update element content', () => {
      const section = emailBuilder.addElement('mj-section');
      const column = section.children![0];
      const text = emailBuilder.addElement('mj-text', column.id);

      emailBuilder.updateElementContent(text.id, 'Hello World');

      expect(column.children![0].content).toBe('Hello World');
    });
  });

  describe('selectElement', () => {
    it('should select an element', () => {
      const section = emailBuilder.addElement('mj-section');
      emailBuilder.selectElement(null);

      expect(emailBuilder.selectedElementId.value).toBeNull();

      emailBuilder.selectElement(section.id);

      expect(emailBuilder.selectedElementId.value).toBe(section.id);
    });
  });

  describe('addColumnToSection', () => {
    it('should add a column to a section', () => {
      const section = emailBuilder.addElement('mj-section');
      expect(section.children).toHaveLength(1);

      emailBuilder.addColumnToSection(section.id);

      expect(section.children).toHaveLength(2);
      expect(section.children![1].type).toBe('mj-column');
    });
  });

  describe('generateMjml', () => {
    it('should generate valid MJML structure', () => {
      const mjml = emailBuilder.generateMjml();

      expect(mjml).toContain('<mjml>');
      expect(mjml).toContain('</mjml>');
      expect(mjml).toContain('<mj-head>');
      expect(mjml).toContain('<mj-body');
    });

    it('should include template attributes in MJML', () => {
      const mjml = emailBuilder.generateMjml();

      expect(mjml).toContain('background-color="#f4f4f4"');
      expect(mjml).toContain('width="600px"');
      expect(mjml).toContain('font-family="Arial, sans-serif"');
    });

    it('should render sections and columns', () => {
      emailBuilder.addElement('mj-section');
      const mjml = emailBuilder.generateMjml();

      expect(mjml).toContain('<mj-section');
      expect(mjml).toContain('<mj-column');
    });

    it('should render content elements with their content', () => {
      const section = emailBuilder.addElement('mj-section');
      const column = section.children![0];
      const text = emailBuilder.addElement('mj-text', column.id);
      emailBuilder.updateElementContent(text.id, 'Test Content');

      const mjml = emailBuilder.generateMjml();

      expect(mjml).toContain('<mj-text');
      expect(mjml).toContain('Test Content');
    });
  });

  describe('clearTemplate', () => {
    it('should clear all elements from template', () => {
      emailBuilder.addElement('mj-section');
      emailBuilder.addElement('mj-section');
      expect(emailBuilder.template.value.body).toHaveLength(2);

      emailBuilder.clearTemplate();

      expect(emailBuilder.template.value.body).toHaveLength(0);
    });

    it('should deselect selected element', () => {
      emailBuilder.addElement('mj-section');

      emailBuilder.clearTemplate();

      expect(emailBuilder.selectedElementId.value).toBeNull();
    });
  });

  describe('loadTemplate', () => {
    it('should load a new template', () => {
      const newTemplate = {
        id: 'test-template',
        name: 'Test Template',
        subject: 'Test Subject',
        body: [],
        attributes: {
          backgroundColor: '#ffffff',
          width: '800px',
          fontFamily: 'Helvetica'
        }
      };

      emailBuilder.loadTemplate(newTemplate);

      expect(emailBuilder.template.value.name).toBe('Test Template');
      expect(emailBuilder.template.value.attributes.width).toBe('800px');
    });
  });
});
