import type { EmailTemplate } from './types';
import { generateId } from './types';

export interface ExampleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'transactional' | 'newsletter' | 'notification';
  template: EmailTemplate;
}

export const exampleTemplates: ExampleTemplate[] = [
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    description: 'Onboarding email for new users',
    category: 'transactional',
    template: {
      id: generateId(),
      name: 'Welcome Email',
      subject: 'Welcome to Our Platform!',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#3498db', 'padding': '20px 0' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'color': '#ffffff', 'font-size': '28px', 'align': 'center', 'font-weight': 'bold' },
              content: 'Welcome to Our Platform!'
            }]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '40px 20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '16px', 'color': '#333333', 'line-height': '1.6' },
                content: 'Hi {{firstName}},<br><br>Thank you for joining us! We\'re excited to have you on board. Your account has been successfully created and you\'re ready to get started.'
              },
              {
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#3498db', 'color': '#ffffff', 'border-radius': '4px', 'href': '{{loginUrl}}', 'align': 'center' },
                content: 'Get Started'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#666666', 'padding-top': '20px' },
                content: 'If you have any questions, feel free to reply to this email or contact our support team.'
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#f8f9fa', 'padding': '20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'font-size': '12px', 'color': '#999999', 'align': 'center' },
              content: '© 2024 Your Company. All rights reserved.'
            }]
          }]
        }
      ]
    }
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    description: 'E-commerce order confirmation email',
    category: 'transactional',
    template: {
      id: generateId(),
      name: 'Order Confirmation',
      subject: 'Order Confirmed - #{{orderNumber}}',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#2ecc71', 'padding': '30px 0' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'color': '#ffffff', 'font-size': '24px', 'align': 'center', 'font-weight': 'bold' },
                content: 'Order Confirmed!'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'color': '#ffffff', 'font-size': '16px', 'align': 'center' },
                content: 'Order #{{orderNumber}}'
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '30px 20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '16px', 'color': '#333333' },
                content: 'Hi {{customerName}},<br><br>Thank you for your order! We\'ve received your order and it\'s being processed.'
              },
              {
                id: generateId(),
                type: 'mj-divider',
                attributes: { 'border-color': '#e0e0e0', 'padding': '20px 0' }
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#333333', 'font-weight': 'bold' },
                content: 'Order Summary'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#666666', 'line-height': '1.8' },
                content: '{{orderItems}}<br><br><strong>Subtotal:</strong> {{subtotal}}<br><strong>Shipping:</strong> {{shipping}}<br><strong>Total:</strong> {{total}}'
              },
              {
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#3498db', 'color': '#ffffff', 'border-radius': '4px', 'href': '{{trackingUrl}}', 'align': 'center' },
                content: 'Track Your Order'
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#f8f9fa', 'padding': '20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'font-size': '12px', 'color': '#999999', 'align': 'center' },
              content: 'Questions? Contact us at support@company.com'
            }]
          }]
        }
      ]
    }
  },
  {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    description: 'Company newsletter with featured content',
    category: 'newsletter',
    template: {
      id: generateId(),
      name: 'Monthly Newsletter',
      subject: 'Your Monthly Update - {{monthYear}}',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Georgia, serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#1a1a2e', 'padding': '30px 0' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'color': '#ffffff', 'font-size': '32px', 'align': 'center', 'font-weight': 'bold' },
              content: 'Monthly Newsletter'
            }]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '30px 20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '20px', 'color': '#1a1a2e', 'font-weight': 'bold' },
                content: 'Featured Article'
              },
              {
                id: generateId(),
                type: 'mj-image',
                attributes: { 'src': 'https://placehold.co/560x200', 'alt': 'Featured Image', 'padding': '10px 0' }
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '16px', 'color': '#333333', 'line-height': '1.6' },
                content: '{{featuredArticleTitle}}<br><br>{{featuredArticleExcerpt}}'
              },
              {
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#e94560', 'color': '#ffffff', 'border-radius': '25px', 'href': '{{articleUrl}}' },
                content: 'Read More'
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#f8f9fa', 'padding': '30px 20px' },
          children: [
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '50%' },
              children: [
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '16px', 'color': '#1a1a2e', 'font-weight': 'bold' },
                  content: 'Quick Links'
                },
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '14px', 'color': '#666666', 'line-height': '2' },
                  content: '• New Features<br>• Tips & Tricks<br>• Community Updates<br>• Upcoming Events'
                }
              ]
            },
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '50%' },
              children: [
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '16px', 'color': '#1a1a2e', 'font-weight': 'bold' },
                  content: 'Stay Connected'
                },
                {
                  id: generateId(),
                  type: 'mj-social',
                  attributes: { 'mode': 'horizontal', 'icon-size': '30px', 'align': 'left' }
                }
              ]
            }
          ]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#1a1a2e', 'padding': '20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'font-size': '12px', 'color': '#cccccc', 'align': 'center' },
              content: 'You\'re receiving this because you subscribed to our newsletter.<br><a href="{{unsubscribeUrl}}" style="color: #e94560;">Unsubscribe</a>'
            }]
          }]
        }
      ]
    }
  },
  {
    id: 'password-reset',
    name: 'Password Reset',
    description: 'Security email for password reset requests',
    category: 'notification',
    template: {
      id: generateId(),
      name: 'Password Reset',
      subject: 'Reset Your Password',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#e74c3c', 'padding': '20px 0' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'color': '#ffffff', 'font-size': '24px', 'align': 'center', 'font-weight': 'bold' },
              content: 'Password Reset Request'
            }]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '40px 20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '16px', 'color': '#333333', 'line-height': '1.6' },
                content: 'Hi {{firstName}},<br><br>We received a request to reset your password. Click the button below to create a new password. This link will expire in 24 hours.'
              },
              {
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#e74c3c', 'color': '#ffffff', 'border-radius': '4px', 'href': '{{resetUrl}}', 'align': 'center', 'padding': '20px 0' },
                content: 'Reset Password'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#666666' },
                content: 'If you didn\'t request this, you can safely ignore this email. Your password will remain unchanged.'
              },
              {
                id: generateId(),
                type: 'mj-divider',
                attributes: { 'border-color': '#e0e0e0', 'padding': '20px 0' }
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '12px', 'color': '#999999' },
                content: 'If the button doesn\'t work, copy and paste this link into your browser:<br>{{resetUrl}}'
              }
            ]
          }]
        }
      ]
    }
  },
  {
    id: 'promotional-sale',
    name: 'Promotional Sale',
    description: 'Marketing email for sales and promotions',
    category: 'marketing',
    template: {
      id: generateId(),
      name: 'Promotional Sale',
      subject: 'Flash Sale - Up to 50% Off!',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-hero',
          attributes: {
            'background-color': '#9b59b6',
            'height': '300px',
            'padding': '50px 0',
            'mode': 'fixed-height'
          },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'color': '#ffffff', 'font-size': '48px', 'align': 'center', 'font-weight': 'bold' },
                content: 'FLASH SALE'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'color': '#ffffff', 'font-size': '24px', 'align': 'center' },
                content: 'Up to 50% Off Everything!'
              },
              {
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#ffffff', 'color': '#9b59b6', 'border-radius': '25px', 'href': '{{shopUrl}}', 'font-weight': 'bold' },
                content: 'Shop Now'
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '30px 20px' },
          children: [
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '33%' },
              children: [
                {
                  id: generateId(),
                  type: 'mj-image',
                  attributes: { 'src': 'https://placehold.co/180x180', 'alt': 'Product 1' }
                },
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '14px', 'align': 'center', 'color': '#333333' },
                  content: '<strong>Product Name</strong><br><s>$99</s> <span style="color:#e74c3c;">$49</span>'
                }
              ]
            },
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '33%' },
              children: [
                {
                  id: generateId(),
                  type: 'mj-image',
                  attributes: { 'src': 'https://placehold.co/180x180', 'alt': 'Product 2' }
                },
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '14px', 'align': 'center', 'color': '#333333' },
                  content: '<strong>Product Name</strong><br><s>$79</s> <span style="color:#e74c3c;">$39</span>'
                }
              ]
            },
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '33%' },
              children: [
                {
                  id: generateId(),
                  type: 'mj-image',
                  attributes: { 'src': 'https://placehold.co/180x180', 'alt': 'Product 3' }
                },
                {
                  id: generateId(),
                  type: 'mj-text',
                  attributes: { 'font-size': '14px', 'align': 'center', 'color': '#333333' },
                  content: '<strong>Product Name</strong><br><s>$129</s> <span style="color:#e74c3c;">$64</span>'
                }
              ]
            }
          ]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#f8f9fa', 'padding': '20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#666666', 'align': 'center' },
                content: 'Hurry! Sale ends in 24 hours.'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '12px', 'color': '#999999', 'align': 'center' },
                content: '<a href="{{unsubscribeUrl}}" style="color: #999999;">Unsubscribe</a> | <a href="{{preferencesUrl}}" style="color: #999999;">Preferences</a>'
              }
            ]
          }]
        }
      ]
    }
  },
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Reminder email for scheduled appointments',
    category: 'notification',
    template: {
      id: generateId(),
      name: 'Appointment Reminder',
      subject: 'Reminder: Your Appointment on {{appointmentDate}}',
      attributes: {
        backgroundColor: '#f4f4f4',
        width: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      body: [
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#16a085', 'padding': '25px 0' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'color': '#ffffff', 'font-size': '24px', 'align': 'center', 'font-weight': 'bold' },
              content: 'Appointment Reminder'
            }]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '30px 20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '16px', 'color': '#333333' },
                content: 'Hi {{firstName}},<br><br>This is a friendly reminder about your upcoming appointment.'
              },
              {
                id: generateId(),
                type: 'mj-divider',
                attributes: { 'border-color': '#e0e0e0', 'padding': '15px 0' }
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '18px', 'color': '#16a085', 'font-weight': 'bold', 'align': 'center' },
                content: '{{appointmentDate}}<br>{{appointmentTime}}'
              },
              {
                id: generateId(),
                type: 'mj-text',
                attributes: { 'font-size': '14px', 'color': '#666666', 'align': 'center' },
                content: '<strong>Location:</strong> {{location}}<br><strong>With:</strong> {{staffName}}'
              },
              {
                id: generateId(),
                type: 'mj-divider',
                attributes: { 'border-color': '#e0e0e0', 'padding': '15px 0' }
              }
            ]
          }]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#ffffff', 'padding': '0 20px 30px' },
          children: [
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '50%' },
              children: [{
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#16a085', 'color': '#ffffff', 'border-radius': '4px', 'href': '{{confirmUrl}}', 'width': '100%' },
                content: 'Confirm'
              }]
            },
            {
              id: generateId(),
              type: 'mj-column',
              attributes: { 'width': '50%' },
              children: [{
                id: generateId(),
                type: 'mj-button',
                attributes: { 'background-color': '#e74c3c', 'color': '#ffffff', 'border-radius': '4px', 'href': '{{rescheduleUrl}}', 'width': '100%' },
                content: 'Reschedule'
              }]
            }
          ]
        },
        {
          id: generateId(),
          type: 'mj-section',
          attributes: { 'background-color': '#f8f9fa', 'padding': '20px' },
          children: [{
            id: generateId(),
            type: 'mj-column',
            attributes: { 'width': '100%' },
            children: [{
              id: generateId(),
              type: 'mj-text',
              attributes: { 'font-size': '12px', 'color': '#999999', 'align': 'center' },
              content: 'Need to cancel? Please let us know at least 24 hours in advance.<br>Contact: {{contactPhone}} | {{contactEmail}}'
            }]
          }]
        }
      ]
    }
  }
];

export const getTemplatesByCategory = (category: ExampleTemplate['category']) => {
  return exampleTemplates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return exampleTemplates.find(t => t.id === id);
};
