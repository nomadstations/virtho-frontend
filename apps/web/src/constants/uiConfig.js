export const UI_CONFIG = {
  PAGINATION: {
    PROJECTS: 12,
    JOBS: 10,
    COURSES: 12,
    COMMUNITIES: 12,
    MARKETPLACE: 12,
  },
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  MOBILE_BREAKPOINT: 768,
  ANIMATIONS: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    },
  },
  ERROR_MESSAGES: {
    DEFAULT: 'An unexpected error occurred. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    AUTH_REQUIRED: 'You must be logged in to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
  },
  SUCCESS_MESSAGES: {
    SAVED: 'Changes saved successfully!',
    CREATED: 'Item created successfully!',
    DELETED: 'Item deleted successfully!',
    ADDED_TO_CART: 'Item added to your cart.',
  }
};