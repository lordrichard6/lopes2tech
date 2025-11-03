/**
 * Application-wide constants
 * Centralized location for all hardcoded values used throughout the application
 */

export const APP_CONSTANTS = {
  BUSINESS: {
    COMPANY_NAME: 'lopes2tech',
    OWNER_NAME: 'Paulo R. Lopes',
    EMAIL: 'lopes2tech.ch@gmail.com',
    PHONE: '+41 78 798 95 33',
    ADDRESS: 'Zürich',
    CITY: 'Zürich',
    COUNTRY: 'Switzerland',
  },
  STRIPE: {
    DONATION_LINK: 'https://donate.stripe.com/7sY8wQ8Y2b0ddXXaGK1Nu00',
  },
  LANGUAGES: {
    SUPPORTED: ['en', 'pt', 'de'] as const,
    DEFAULT: 'en',
  },
  API: {
    CHAT_ENDPOINT: '/api/chat',
  },
  ANALYTICS: {
    GA4_MEASUREMENT_ID: 'G-P45F7T7PLH',
  },
} as const;

export type SupportedLanguage = typeof APP_CONSTANTS.LANGUAGES.SUPPORTED[number];

