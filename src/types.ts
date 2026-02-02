// MJML Email Builder Types
// Based on https://documentation.mjml.io/#standard-body-components

export interface EmailElement {
  id: string;
  type: EmailElementType;
  attributes: Record<string, string>;
  content?: string;
  children?: EmailElement[];
}

export type EmailElementType =
  // Layout components
  | 'mj-section'
  | 'mj-column'
  | 'mj-group'
  | 'mj-hero'
  | 'mj-wrapper'
  // Content components
  | 'mj-text'
  | 'mj-image'
  | 'mj-button'
  | 'mj-divider'
  | 'mj-spacer'
  | 'mj-table'
  | 'mj-raw'
  // Social components
  | 'mj-social'
  | 'mj-social-element'
  | 'mj-navbar'
  | 'mj-navbar-link'
  // Advanced components
  | 'mj-accordion'
  | 'mj-accordion-element'
  | 'mj-accordion-title'
  | 'mj-accordion-text'
  | 'mj-carousel'
  | 'mj-carousel-image';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: EmailElement[];
  attributes: {
    backgroundColor?: string;
    width?: string;
    fontFamily?: string;
  };
}

export interface DragItem {
  type: EmailElementType;
  label: string;
  icon: string;
  defaultAttributes: Record<string, string>;
  defaultContent?: string;
}

export interface ElementConfig {
  label: string;
  icon: string;
  category: 'layout' | 'content' | 'social' | 'advanced';
  description: string;
  defaultAttributes: Record<string, string>;
  defaultContent?: string;
  editableAttributes: AttributeConfig[];
}

export interface AttributeConfig {
  name: string;
  label: string;
  type: 'text' | 'color' | 'select' | 'number' | 'textarea' | 'url' | 'boolean';
  options?: { value: string; label: string }[];
  default?: string;
  description?: string;
}

export const ELEMENT_CONFIGS: Record<EmailElementType, ElementConfig> = {
  // ==================== LAYOUT COMPONENTS ====================

  'mj-section': {
    label: 'Section',
    icon: 'fa-layer-group',
    category: 'layout',
    description: 'Row structure for email layout; contains columns or groups',
    defaultAttributes: {
      'padding': '20px 0',
      'background-color': '#ffffff'
    },
    editableAttributes: [
      { name: 'padding', label: 'Padding', type: 'text', default: '20px 0', description: 'Supports up to 4 values (top right bottom left)' },
      { name: 'background-color', label: 'Background Color', type: 'color', default: '#ffffff' },
      { name: 'background-url', label: 'Background Image URL', type: 'url' },
      { name: 'background-size', label: 'Background Size', type: 'select', default: 'auto', options: [
        { value: 'auto', label: 'Auto' },
        { value: 'cover', label: 'Cover' },
        { value: 'contain', label: 'Contain' }
      ]},
      { name: 'background-repeat', label: 'Background Repeat', type: 'select', default: 'repeat', options: [
        { value: 'repeat', label: 'Repeat' },
        { value: 'no-repeat', label: 'No Repeat' }
      ]},
      { name: 'border-radius', label: 'Border Radius', type: 'text', default: '0' },
      { name: 'full-width', label: 'Full Width', type: 'select', options: [
        { value: '', label: 'No' },
        { value: 'full-width', label: 'Yes' }
      ]},
      { name: 'direction', label: 'Direction', type: 'select', default: 'ltr', options: [
        { value: 'ltr', label: 'Left to Right' },
        { value: 'rtl', label: 'Right to Left' }
      ]},
      { name: 'text-align', label: 'Text Align', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]}
    ]
  },

  'mj-column': {
    label: 'Column',
    icon: 'fa-columns',
    category: 'layout',
    description: 'Responsive container organizing content; stacks vertically on mobile',
    defaultAttributes: {
      'width': '100%',
      'padding': '0'
    },
    editableAttributes: [
      { name: 'width', label: 'Width', type: 'text', default: '100%', description: 'Percentage or pixels (e.g., 50% or 300px)' },
      { name: 'padding', label: 'Padding', type: 'text', default: '0' },
      { name: 'background-color', label: 'Background Color', type: 'color' },
      { name: 'border', label: 'Border', type: 'text', description: 'CSS border format (e.g., 1px solid #ccc)' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' },
      { name: 'vertical-align', label: 'Vertical Align', type: 'select', default: 'top', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]},
      { name: 'direction', label: 'Direction', type: 'select', default: 'ltr', options: [
        { value: 'ltr', label: 'Left to Right' },
        { value: 'rtl', label: 'Right to Left' }
      ]}
    ]
  },

  'mj-group': {
    label: 'Group',
    icon: 'fa-object-group',
    category: 'layout',
    description: 'Prevents adjacent columns from stacking on mobile, maintaining side-by-side layout',
    defaultAttributes: {
      'width': '100%'
    },
    editableAttributes: [
      { name: 'width', label: 'Width', type: 'text', default: '100%' },
      { name: 'background-color', label: 'Background Color', type: 'color' },
      { name: 'direction', label: 'Direction', type: 'select', default: 'ltr', options: [
        { value: 'ltr', label: 'Left to Right' },
        { value: 'rtl', label: 'Right to Left' }
      ]},
      { name: 'vertical-align', label: 'Vertical Align', type: 'select', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]}
    ]
  },

  'mj-hero': {
    label: 'Hero',
    icon: 'fa-star',
    category: 'layout',
    description: 'Hero image section with background support; acts as section with single column',
    defaultAttributes: {
      'mode': 'fixed-height',
      'height': '300px',
      'background-color': '#2c3e50',
      'background-url': '',
      'background-width': '600px',
      'background-height': '300px',
      'padding': '100px 0',
      'vertical-align': 'middle'
    },
    editableAttributes: [
      { name: 'mode', label: 'Mode', type: 'select', default: 'fixed-height', options: [
        { value: 'fixed-height', label: 'Fixed Height' },
        { value: 'fluid-height', label: 'Fluid Height' }
      ]},
      { name: 'height', label: 'Height', type: 'text', default: '300px', description: 'Required for fixed-height mode' },
      { name: 'background-color', label: 'Background Color', type: 'color', default: '#2c3e50' },
      { name: 'background-url', label: 'Background Image URL', type: 'url' },
      { name: 'background-width', label: 'Background Width', type: 'text', default: '600px' },
      { name: 'background-height', label: 'Background Height', type: 'text', default: '300px' },
      { name: 'background-position', label: 'Background Position', type: 'text', default: 'center center' },
      { name: 'padding', label: 'Padding', type: 'text', default: '100px 0' },
      { name: 'vertical-align', label: 'Vertical Align', type: 'select', default: 'middle', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]}
    ]
  },

  'mj-wrapper': {
    label: 'Wrapper',
    icon: 'fa-box',
    category: 'layout',
    description: 'Wraps multiple sections; enables nested layouts with shared borders/backgrounds',
    defaultAttributes: {
      'padding': '20px 0',
      'background-color': '#ffffff'
    },
    editableAttributes: [
      { name: 'padding', label: 'Padding', type: 'text', default: '20px 0' },
      { name: 'background-color', label: 'Background Color', type: 'color' },
      { name: 'background-url', label: 'Background Image URL', type: 'url' },
      { name: 'background-size', label: 'Background Size', type: 'text', default: 'auto' },
      { name: 'border', label: 'Border', type: 'text' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' },
      { name: 'full-width', label: 'Full Width', type: 'select', options: [
        { value: '', label: 'No' },
        { value: 'full-width', label: 'Yes' }
      ]}
    ]
  },

  // ==================== CONTENT COMPONENTS ====================

  'mj-text': {
    label: 'Text',
    icon: 'fa-font',
    category: 'content',
    description: 'Text container supporting HTML content with styling capabilities',
    defaultAttributes: {
      'font-size': '13px',
      'color': '#000000',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'line-height': '1',
      'align': 'left',
      'padding': '10px 25px'
    },
    defaultContent: 'Enter your text here',
    editableAttributes: [
      { name: 'font-size', label: 'Font Size', type: 'text', default: '13px' },
      { name: 'color', label: 'Text Color', type: 'color', default: '#000000' },
      { name: 'font-family', label: 'Font Family', type: 'text', default: 'Ubuntu, Helvetica, Arial, sans-serif' },
      { name: 'font-weight', label: 'Font Weight', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' },
        { value: '300', label: 'Light' },
        { value: '500', label: 'Medium' },
        { value: '600', label: 'Semi Bold' },
        { value: '700', label: 'Bold' }
      ]},
      { name: 'font-style', label: 'Font Style', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Italic' }
      ]},
      { name: 'align', label: 'Alignment', type: 'select', default: 'left', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
        { value: 'justify', label: 'Justify' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'line-height', label: 'Line Height', type: 'text', default: '1' },
      { name: 'letter-spacing', label: 'Letter Spacing', type: 'text' },
      { name: 'text-decoration', label: 'Text Decoration', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' },
        { value: 'line-through', label: 'Line Through' }
      ]},
      { name: 'text-transform', label: 'Text Transform', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'capitalize', label: 'Capitalize' }
      ]},
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  'mj-image': {
    label: 'Image',
    icon: 'fa-image',
    category: 'content',
    description: 'Responsive image element similar to HTML <img /> tag',
    defaultAttributes: {
      'src': 'https://placehold.co/300x200',
      'alt': 'Image',
      'width': '300px',
      'padding': '10px 25px',
      'align': 'center'
    },
    editableAttributes: [
      { name: 'src', label: 'Image URL', type: 'url', default: 'https://placehold.co/300x200', description: 'Mandatory' },
      { name: 'alt', label: 'Alt Text', type: 'text', default: 'Image' },
      { name: 'width', label: 'Width', type: 'text', default: '300px', description: 'Pixels only (e.g., 300px)' },
      { name: 'height', label: 'Height', type: 'text', default: 'auto' },
      { name: 'href', label: 'Link URL', type: 'url', description: 'Click redirect URL' },
      { name: 'target', label: 'Link Target', type: 'select', options: [
        { value: '_blank', label: 'New Tab' },
        { value: '_self', label: 'Same Tab' }
      ]},
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'border', label: 'Border', type: 'text' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' },
      { name: 'fluid-on-mobile', label: 'Fluid on Mobile', type: 'select', options: [
        { value: '', label: 'No' },
        { value: 'true', label: 'Yes (Full Width)' }
      ]},
      { name: 'title', label: 'Title', type: 'text' }
    ]
  },

  'mj-button': {
    label: 'Button',
    icon: 'fa-square',
    category: 'content',
    description: 'Creates a customizable clickable button element',
    defaultAttributes: {
      'background-color': '#414141',
      'color': '#ffffff',
      'font-size': '13px',
      'border-radius': '3px',
      'padding': '10px 25px',
      'inner-padding': '10px 25px',
      'href': '#',
      'align': 'center'
    },
    defaultContent: 'Click Here',
    editableAttributes: [
      { name: 'href', label: 'Button URL', type: 'url', default: '#' },
      { name: 'background-color', label: 'Background Color', type: 'color', default: '#414141' },
      { name: 'color', label: 'Text Color', type: 'color', default: '#ffffff' },
      { name: 'font-size', label: 'Font Size', type: 'text', default: '13px' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'font-weight', label: 'Font Weight', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' }
      ]},
      { name: 'border-radius', label: 'Border Radius', type: 'text', default: '3px' },
      { name: 'border', label: 'Border', type: 'text', description: 'CSS border format' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'vertical-align', label: 'Vertical Align', type: 'select', default: 'middle', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]},
      { name: 'padding', label: 'Outer Padding', type: 'text', default: '10px 25px' },
      { name: 'inner-padding', label: 'Inner Padding', type: 'text', default: '10px 25px' },
      { name: 'width', label: 'Width', type: 'text' },
      { name: 'height', label: 'Height', type: 'text' },
      { name: 'text-decoration', label: 'Text Decoration', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' }
      ]},
      { name: 'text-transform', label: 'Text Transform', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'capitalize', label: 'Capitalize' }
      ]},
      { name: 'target', label: 'Link Target', type: 'select', options: [
        { value: '_blank', label: 'New Tab' },
        { value: '_self', label: 'Same Tab' }
      ]}
    ]
  },

  'mj-divider': {
    label: 'Divider',
    icon: 'fa-minus',
    category: 'content',
    description: 'Displays a horizontal divider with customizable border styling',
    defaultAttributes: {
      'border-color': '#000000',
      'border-width': '4px',
      'border-style': 'solid',
      'width': '100%',
      'padding': '10px 25px'
    },
    editableAttributes: [
      { name: 'border-color', label: 'Color', type: 'color', default: '#000000' },
      { name: 'border-width', label: 'Thickness', type: 'text', default: '4px' },
      { name: 'border-style', label: 'Style', type: 'select', default: 'solid', options: [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' }
      ]},
      { name: 'width', label: 'Width', type: 'text', default: '100%' },
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  'mj-spacer': {
    label: 'Spacer',
    icon: 'fa-arrows-alt-v',
    category: 'content',
    description: 'Blank space element for separating content vertically',
    defaultAttributes: {
      'height': '20px'
    },
    editableAttributes: [
      { name: 'height', label: 'Height', type: 'text', default: '20px' },
      { name: 'padding', label: 'Padding', type: 'text' },
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  'mj-table': {
    label: 'Table',
    icon: 'fa-table',
    category: 'content',
    description: 'Data table component accepting plain HTML content only',
    defaultAttributes: {
      'width': '100%',
      'cellpadding': '0',
      'cellspacing': '0',
      'font-size': '13px',
      'padding': '10px 25px'
    },
    defaultContent: '<tr><td>Column 1</td><td>Column 2</td></tr><tr><td>Data 1</td><td>Data 2</td></tr>',
    editableAttributes: [
      { name: 'width', label: 'Width', type: 'text', default: '100%' },
      { name: 'cellpadding', label: 'Cell Padding', type: 'text', default: '0' },
      { name: 'cellspacing', label: 'Cell Spacing', type: 'text', default: '0' },
      { name: 'border', label: 'Border', type: 'text', default: 'none' },
      { name: 'font-size', label: 'Font Size', type: 'text', default: '13px' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'color', label: 'Text Color', type: 'color' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'left', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  // ==================== SOCIAL COMPONENTS ====================

  'mj-social': {
    label: 'Social',
    icon: 'fa-share-alt',
    category: 'social',
    description: 'Displays social network icons with associated links; supports multiple platforms',
    defaultAttributes: {
      'mode': 'horizontal',
      'icon-size': '20px',
      'align': 'center',
      'padding': '10px 25px'
    },
    editableAttributes: [
      { name: 'mode', label: 'Mode', type: 'select', default: 'horizontal', options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' }
      ]},
      { name: 'icon-size', label: 'Icon Size', type: 'text', default: '20px' },
      { name: 'icon-padding', label: 'Icon Padding', type: 'text' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'font-size', label: 'Font Size', type: 'text' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'color', label: 'Text Color', type: 'color' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' },
      { name: 'inner-padding', label: 'Inner Padding', type: 'text' },
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  'mj-navbar': {
    label: 'Navbar',
    icon: 'fa-bars',
    category: 'social',
    description: 'Navigation menu with optional hamburger mode for mobile responsiveness',
    defaultAttributes: {
      'align': 'center',
      'padding': '10px 25px'
    },
    defaultContent: 'Home | About | Contact',
    editableAttributes: [
      { name: 'hamburger', label: 'Hamburger Mode', type: 'select', options: [
        { value: '', label: 'No' },
        { value: 'hamburger', label: 'Yes' }
      ]},
      { name: 'base-url', label: 'Base URL', type: 'url' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'ico-color', label: 'Hamburger Icon Color', type: 'color', default: '#000000' },
      { name: 'ico-font-size', label: 'Hamburger Icon Size', type: 'text', default: '30px' },
      { name: 'ico-padding', label: 'Hamburger Icon Padding', type: 'text' }
    ]
  },

  // ==================== ADVANCED COMPONENTS ====================

  'mj-accordion': {
    label: 'Accordion',
    icon: 'fa-chevron-down',
    category: 'advanced',
    description: 'Interactive component that stacks content in collapsible tabs, reducing mobile scrolling',
    defaultAttributes: {
      'border': '2px solid black',
      'padding': '10px 25px',
      'icon-position': 'right',
      'icon-width': '32px',
      'icon-height': '32px'
    },
    defaultContent: '<mj-accordion-element><mj-accordion-title>Question 1</mj-accordion-title><mj-accordion-text>Answer 1</mj-accordion-text></mj-accordion-element>',
    editableAttributes: [
      { name: 'border', label: 'Border', type: 'text', default: '2px solid black' },
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'icon-position', label: 'Icon Position', type: 'select', default: 'right', options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'icon-width', label: 'Icon Width', type: 'text', default: '32px' },
      { name: 'icon-height', label: 'Icon Height', type: 'text', default: '32px' },
      { name: 'icon-wrapped-url', label: 'Collapsed Icon URL', type: 'url' },
      { name: 'icon-unwrapped-url', label: 'Expanded Icon URL', type: 'url' },
      { name: 'icon-align', label: 'Icon Align', type: 'select', default: 'middle', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]},
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'container-background-color', label: 'Container Background', type: 'color' }
    ]
  },

  'mj-carousel': {
    label: 'Carousel',
    icon: 'fa-images',
    category: 'advanced',
    description: 'Gallery component displaying images with thumbnail navigation and hover interactions',
    defaultAttributes: {
      'icon-width': '44px',
      'thumbnails': 'visible',
      'padding': '10px 25px'
    },
    defaultContent: '',
    editableAttributes: [
      { name: 'icon-width', label: 'Icon Width', type: 'text', default: '44px' },
      { name: 'left-icon', label: 'Left Arrow URL', type: 'url' },
      { name: 'right-icon', label: 'Right Arrow URL', type: 'url' },
      { name: 'thumbnails', label: 'Thumbnails', type: 'select', default: 'visible', options: [
        { value: 'visible', label: 'Visible' },
        { value: 'hidden', label: 'Hidden' }
      ]},
      { name: 'tb-width', label: 'Thumbnail Width', type: 'text' },
      { name: 'tb-border', label: 'Thumbnail Border', type: 'text' },
      { name: 'tb-border-radius', label: 'Thumbnail Border Radius', type: 'text' },
      { name: 'tb-hover-border-color', label: 'Thumbnail Hover Border', type: 'color' },
      { name: 'tb-selected-border-color', label: 'Thumbnail Selected Border', type: 'color', default: '#ccc' },
      { name: 'align', label: 'Alignment', type: 'select', default: 'center', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '10px 25px' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' }
    ]
  },

  'mj-raw': {
    label: 'Raw HTML',
    icon: 'fa-code',
    category: 'advanced',
    description: 'Raw HTML content not parsed by MJML engine; useful for custom HTML or templating',
    defaultAttributes: {},
    defaultContent: '<!-- Custom HTML here -->',
    editableAttributes: []
  },

  // ==================== CHILD COMPONENTS ====================

  'mj-social-element': {
    label: 'Social Icon',
    icon: 'fa-share-square',
    category: 'social',
    description: 'Individual social network icon with link; child of mj-social',
    defaultAttributes: {
      'name': 'facebook',
      'href': 'https://facebook.com'
    },
    editableAttributes: [
      { name: 'name', label: 'Platform', type: 'select', default: 'facebook', options: [
        { value: 'facebook', label: 'Facebook' },
        { value: 'facebook-noshare', label: 'Facebook (No Share)' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'twitter-noshare', label: 'Twitter (No Share)' },
        { value: 'x', label: 'X (Twitter)' },
        { value: 'x-noshare', label: 'X (No Share)' },
        { value: 'google', label: 'Google' },
        { value: 'google-noshare', label: 'Google (No Share)' },
        { value: 'pinterest', label: 'Pinterest' },
        { value: 'pinterest-noshare', label: 'Pinterest (No Share)' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'linkedin-noshare', label: 'LinkedIn (No Share)' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'snapchat', label: 'Snapchat' },
        { value: 'github', label: 'GitHub' },
        { value: 'medium', label: 'Medium' },
        { value: 'soundcloud', label: 'SoundCloud' },
        { value: 'dribbble', label: 'Dribbble' },
        { value: 'vimeo', label: 'Vimeo' },
        { value: 'tumblr', label: 'Tumblr' },
        { value: 'tumblr-noshare', label: 'Tumblr (No Share)' },
        { value: 'xing', label: 'Xing' },
        { value: 'xing-noshare', label: 'Xing (No Share)' },
        { value: 'web', label: 'Website' }
      ]},
      { name: 'href', label: 'Link URL', type: 'url', default: 'https://facebook.com' },
      { name: 'src', label: 'Custom Icon URL', type: 'url', description: 'Override default icon' },
      { name: 'alt', label: 'Alt Text', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'icon-size', label: 'Icon Size', type: 'text' },
      { name: 'icon-height', label: 'Icon Height', type: 'text' },
      { name: 'icon-padding', label: 'Icon Padding', type: 'text' },
      { name: 'text-padding', label: 'Text Padding', type: 'text' },
      { name: 'background-color', label: 'Background Color', type: 'color' },
      { name: 'color', label: 'Text Color', type: 'color' },
      { name: 'font-size', label: 'Font Size', type: 'text' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' },
      { name: 'vertical-align', label: 'Vertical Align', type: 'select', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]}
    ]
  },

  'mj-navbar-link': {
    label: 'Nav Link',
    icon: 'fa-link',
    category: 'social',
    description: 'Navigation link item; child of mj-navbar',
    defaultAttributes: {
      'href': '#',
      'padding': '15px 10px'
    },
    defaultContent: 'Link',
    editableAttributes: [
      { name: 'href', label: 'Link URL', type: 'url', default: '#' },
      { name: 'target', label: 'Target', type: 'select', options: [
        { value: '_blank', label: 'New Tab' },
        { value: '_self', label: 'Same Tab' }
      ]},
      { name: 'color', label: 'Text Color', type: 'color' },
      { name: 'font-size', label: 'Font Size', type: 'text' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'font-weight', label: 'Font Weight', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'bold', label: 'Bold' }
      ]},
      { name: 'font-style', label: 'Font Style', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Italic' }
      ]},
      { name: 'text-decoration', label: 'Text Decoration', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' }
      ]},
      { name: 'text-transform', label: 'Text Transform', type: 'select', options: [
        { value: 'none', label: 'None' },
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'capitalize', label: 'Capitalize' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', default: '15px 10px' },
      { name: 'letter-spacing', label: 'Letter Spacing', type: 'text' }
    ]
  },

  'mj-accordion-element': {
    label: 'Accordion Item',
    icon: 'fa-caret-square-down',
    category: 'advanced',
    description: 'Single accordion section; child of mj-accordion',
    defaultAttributes: {
      'icon-position': 'right',
      'icon-width': '32px',
      'icon-height': '32px'
    },
    editableAttributes: [
      { name: 'icon-position', label: 'Icon Position', type: 'select', options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' }
      ]},
      { name: 'icon-width', label: 'Icon Width', type: 'text', default: '32px' },
      { name: 'icon-height', label: 'Icon Height', type: 'text', default: '32px' },
      { name: 'icon-wrapped-url', label: 'Collapsed Icon URL', type: 'url' },
      { name: 'icon-unwrapped-url', label: 'Expanded Icon URL', type: 'url' },
      { name: 'icon-align', label: 'Icon Align', type: 'select', options: [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' }
      ]},
      { name: 'background-color', label: 'Background Color', type: 'color' },
      { name: 'font-family', label: 'Font Family', type: 'text' }
    ]
  },

  'mj-accordion-title': {
    label: 'Accordion Title',
    icon: 'fa-heading',
    category: 'advanced',
    description: 'Title/header of accordion element; child of mj-accordion-element',
    defaultAttributes: {
      'color': '#000000',
      'font-size': '13px',
      'padding': '16px',
      'background-color': '#ffffff'
    },
    defaultContent: 'Accordion Title',
    editableAttributes: [
      { name: 'color', label: 'Text Color', type: 'color', default: '#000000' },
      { name: 'font-size', label: 'Font Size', type: 'text', default: '13px' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'padding', label: 'Padding', type: 'text', default: '16px' },
      { name: 'background-color', label: 'Background Color', type: 'color', default: '#ffffff' }
    ]
  },

  'mj-accordion-text': {
    label: 'Accordion Text',
    icon: 'fa-paragraph',
    category: 'advanced',
    description: 'Content body of accordion element; child of mj-accordion-element',
    defaultAttributes: {
      'color': '#000000',
      'font-size': '13px',
      'padding': '16px',
      'background-color': '#ffffff'
    },
    defaultContent: 'Accordion content goes here...',
    editableAttributes: [
      { name: 'color', label: 'Text Color', type: 'color', default: '#000000' },
      { name: 'font-size', label: 'Font Size', type: 'text', default: '13px' },
      { name: 'font-family', label: 'Font Family', type: 'text' },
      { name: 'line-height', label: 'Line Height', type: 'text' },
      { name: 'padding', label: 'Padding', type: 'text', default: '16px' },
      { name: 'background-color', label: 'Background Color', type: 'color', default: '#ffffff' }
    ]
  },

  'mj-carousel-image': {
    label: 'Carousel Image',
    icon: 'fa-image',
    category: 'advanced',
    description: 'Single image slide in carousel; child of mj-carousel',
    defaultAttributes: {
      'src': 'https://placehold.co/600x300',
      'alt': 'Carousel image'
    },
    editableAttributes: [
      { name: 'src', label: 'Image URL', type: 'url', default: 'https://placehold.co/600x300' },
      { name: 'alt', label: 'Alt Text', type: 'text', default: 'Carousel image' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'href', label: 'Link URL', type: 'url' },
      { name: 'rel', label: 'Link Rel', type: 'text' },
      { name: 'target', label: 'Link Target', type: 'select', options: [
        { value: '_blank', label: 'New Tab' },
        { value: '_self', label: 'Same Tab' }
      ]},
      { name: 'thumbnails-src', label: 'Thumbnail URL', type: 'url', description: 'Custom thumbnail image' },
      { name: 'border-radius', label: 'Border Radius', type: 'text' }
    ]
  }
};

export const generateId = (): string => {
  return 'el_' + Math.random().toString(36).substr(2, 9);
};

export const createDefaultElement = (type: EmailElementType): EmailElement => {
  const config = ELEMENT_CONFIGS[type];
  const element: EmailElement = {
    id: generateId(),
    type,
    attributes: { ...config.defaultAttributes }
  };

  if (config.defaultContent) {
    element.content = config.defaultContent;
  }

  if (type === 'mj-section') {
    element.children = [{
      id: generateId(),
      type: 'mj-column',
      attributes: { ...ELEMENT_CONFIGS['mj-column'].defaultAttributes },
      children: []
    }];
  }

  if (type === 'mj-hero') {
    element.children = [{
      id: generateId(),
      type: 'mj-column',
      attributes: { 'width': '100%' },
      children: []
    }];
  }

  // Social with default social elements
  if (type === 'mj-social') {
    element.children = [
      {
        id: generateId(),
        type: 'mj-social-element',
        attributes: { 'name': 'facebook', 'href': 'https://facebook.com' }
      },
      {
        id: generateId(),
        type: 'mj-social-element',
        attributes: { 'name': 'twitter', 'href': 'https://twitter.com' }
      },
      {
        id: generateId(),
        type: 'mj-social-element',
        attributes: { 'name': 'linkedin', 'href': 'https://linkedin.com' }
      }
    ];
  }

  // Navbar with default links
  if (type === 'mj-navbar') {
    element.children = [
      {
        id: generateId(),
        type: 'mj-navbar-link',
        attributes: { 'href': '#', 'padding': '15px 10px' },
        content: 'Home'
      },
      {
        id: generateId(),
        type: 'mj-navbar-link',
        attributes: { 'href': '#', 'padding': '15px 10px' },
        content: 'About'
      },
      {
        id: generateId(),
        type: 'mj-navbar-link',
        attributes: { 'href': '#', 'padding': '15px 10px' },
        content: 'Contact'
      }
    ];
    delete element.content; // Remove default content since we have children
  }

  // Accordion with default accordion element
  if (type === 'mj-accordion') {
    element.children = [{
      id: generateId(),
      type: 'mj-accordion-element',
      attributes: { ...ELEMENT_CONFIGS['mj-accordion-element'].defaultAttributes },
      children: [
        {
          id: generateId(),
          type: 'mj-accordion-title',
          attributes: { ...ELEMENT_CONFIGS['mj-accordion-title'].defaultAttributes },
          content: 'Question 1'
        },
        {
          id: generateId(),
          type: 'mj-accordion-text',
          attributes: { ...ELEMENT_CONFIGS['mj-accordion-text'].defaultAttributes },
          content: 'Answer to question 1 goes here...'
        }
      ]
    }];
    delete element.content;
  }

  // Carousel with default images
  if (type === 'mj-carousel') {
    element.children = [
      {
        id: generateId(),
        type: 'mj-carousel-image',
        attributes: { 'src': 'https://placehold.co/600x300/3b82f6/ffffff?text=Slide+1', 'alt': 'Slide 1' }
      },
      {
        id: generateId(),
        type: 'mj-carousel-image',
        attributes: { 'src': 'https://placehold.co/600x300/10b981/ffffff?text=Slide+2', 'alt': 'Slide 2' }
      },
      {
        id: generateId(),
        type: 'mj-carousel-image',
        attributes: { 'src': 'https://placehold.co/600x300/f59e0b/ffffff?text=Slide+3', 'alt': 'Slide 3' }
      }
    ];
  }

  return element;
};

// Social platform configurations for mj-social-element
export const SOCIAL_PLATFORMS = [
  { name: 'facebook', label: 'Facebook', icon: 'fab fa-facebook-f', color: '#3b5998' },
  { name: 'twitter', label: 'Twitter', icon: 'fab fa-twitter', color: '#1da1f2' },
  { name: 'instagram', label: 'Instagram', icon: 'fab fa-instagram', color: '#e4405f' },
  { name: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0077b5' },
  { name: 'youtube', label: 'YouTube', icon: 'fab fa-youtube', color: '#ff0000' },
  { name: 'pinterest', label: 'Pinterest', icon: 'fab fa-pinterest-p', color: '#bd081c' },
  { name: 'github', label: 'GitHub', icon: 'fab fa-github', color: '#333333' },
  { name: 'google', label: 'Google', icon: 'fab fa-google', color: '#db4437' },
  { name: 'web', label: 'Website', icon: 'fas fa-globe', color: '#4caf50' }
];
