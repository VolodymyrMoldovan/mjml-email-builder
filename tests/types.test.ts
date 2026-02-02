// Uses vitest globals (config has globals: true)
import {
  generateId,
  createDefaultElement,
  ELEMENT_CONFIGS,
  type EmailElementType
} from '../src/types';

describe('types', () => {
  describe('generateId', () => {
    it('should generate a unique id', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
    });

    it('should start with el_ prefix', () => {
      const id = generateId();

      expect(id.startsWith('el_')).toBe(true);
    });
  });

  describe('ELEMENT_CONFIGS', () => {
    it('should have config for mj-section', () => {
      expect(ELEMENT_CONFIGS['mj-section']).toBeDefined();
      expect(ELEMENT_CONFIGS['mj-section'].label).toBe('Section');
      expect(ELEMENT_CONFIGS['mj-section'].category).toBe('layout');
    });

    it('should have config for mj-text', () => {
      expect(ELEMENT_CONFIGS['mj-text']).toBeDefined();
      expect(ELEMENT_CONFIGS['mj-text'].label).toBe('Text');
      expect(ELEMENT_CONFIGS['mj-text'].category).toBe('content');
      expect(ELEMENT_CONFIGS['mj-text'].defaultContent).toBe('Enter your text here');
    });

    it('should have config for mj-button', () => {
      expect(ELEMENT_CONFIGS['mj-button']).toBeDefined();
      expect(ELEMENT_CONFIGS['mj-button'].label).toBe('Button');
      expect(ELEMENT_CONFIGS['mj-button'].defaultContent).toBe('Click Here');
    });

    it('should have config for mj-image', () => {
      expect(ELEMENT_CONFIGS['mj-image']).toBeDefined();
      expect(ELEMENT_CONFIGS['mj-image'].defaultAttributes.src).toContain('placehold');
    });

    it('should have editable attributes for each element', () => {
      const types: EmailElementType[] = ['mj-section', 'mj-column', 'mj-text', 'mj-button', 'mj-image'];

      types.forEach(type => {
        expect(ELEMENT_CONFIGS[type].editableAttributes).toBeDefined();
        expect(Array.isArray(ELEMENT_CONFIGS[type].editableAttributes)).toBe(true);
      });
    });
  });

  describe('createDefaultElement', () => {
    it('should create a section with default attributes', () => {
      const section = createDefaultElement('mj-section');

      expect(section.type).toBe('mj-section');
      expect(section.id).toBeDefined();
      expect(section.attributes).toBeDefined();
      expect(section.attributes['padding']).toBe('20px 0');
    });

    it('should create a section with a default column child', () => {
      const section = createDefaultElement('mj-section');

      expect(section.children).toBeDefined();
      expect(section.children).toHaveLength(1);
      expect(section.children![0].type).toBe('mj-column');
    });

    it('should create a text element with default content', () => {
      const text = createDefaultElement('mj-text');

      expect(text.type).toBe('mj-text');
      expect(text.content).toBe('Enter your text here');
    });

    it('should create a button element with default content', () => {
      const button = createDefaultElement('mj-button');

      expect(button.type).toBe('mj-button');
      expect(button.content).toBe('Click Here');
      expect(button.attributes['href']).toBe('#');
    });

    it('should create an image element with default src', () => {
      const image = createDefaultElement('mj-image');

      expect(image.type).toBe('mj-image');
      expect(image.attributes['src']).toContain('placehold');
    });

    it('should create a hero with a default column child', () => {
      const hero = createDefaultElement('mj-hero');

      expect(hero.children).toBeDefined();
      expect(hero.children).toHaveLength(1);
      expect(hero.children![0].type).toBe('mj-column');
    });

    it('should create a social element with default social icons', () => {
      const social = createDefaultElement('mj-social');

      expect(social.children).toBeDefined();
      expect(social.children!.length).toBeGreaterThan(0);
      expect(social.children![0].type).toBe('mj-social-element');
    });

    it('should create a navbar with default links', () => {
      const navbar = createDefaultElement('mj-navbar');

      expect(navbar.children).toBeDefined();
      expect(navbar.children!.length).toBeGreaterThan(0);
      expect(navbar.children![0].type).toBe('mj-navbar-link');
    });

    it('should create an accordion with default accordion element', () => {
      const accordion = createDefaultElement('mj-accordion');

      expect(accordion.children).toBeDefined();
      expect(accordion.children).toHaveLength(1);
      expect(accordion.children![0].type).toBe('mj-accordion-element');
    });

    it('should create a carousel with default images', () => {
      const carousel = createDefaultElement('mj-carousel');

      expect(carousel.children).toBeDefined();
      expect(carousel.children!.length).toBeGreaterThan(0);
      expect(carousel.children![0].type).toBe('mj-carousel-image');
    });

    it('should generate unique ids for each created element', () => {
      const element1 = createDefaultElement('mj-text');
      const element2 = createDefaultElement('mj-text');

      expect(element1.id).not.toBe(element2.id);
    });
  });
});
