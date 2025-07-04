export const APP_CONSTANTS = {
  NAME: 'Contextually Personal AI',
  VERSION: '1.0.0',
  DESCRIPTION: 'Human-Centered Intelligence for Africa\'s Future',
  AUTHOR: 'Klingbo Intelligence',
  WEBSITE: 'https://klingbo.ai',
};

export const API_CONSTANTS = {
  VERSION: 'v1',
  PREFIX: '/api',
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ha', name: 'Hausa' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
];

export const SUPPORTED_COUNTRIES = [
  { code: 'NG', name: 'Nigeria', currency: 'NGN' },
  { code: 'GH', name: 'Ghana', currency: 'GHS' },
  { code: 'KE', name: 'Kenya', currency: 'KES' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
  { code: 'EG', name: 'Egypt', currency: 'EGP' },
  { code: 'MA', name: 'Morocco', currency: 'MAD' },
  { code: 'SN', name: 'Senegal', currency: 'XOF' },
  { code: 'CI', name: 'Côte d\'Ivoire', currency: 'XOF' },
];

export const CONTENT_TYPES = {
  LESSON: 'lesson',
  QUIZ: 'quiz',
  EXERCISE: 'exercise',
  ASSESSMENT: 'assessment',
} as const;

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const CONTENT_FORMATS = {
  TEXT: 'text',
  AUDIO: 'audio',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
} as const;

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
} as const;

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  SESSION_CREATED: 'Learning session created successfully',
  CONTENT_GENERATED: 'Content generated successfully',
} as const; 