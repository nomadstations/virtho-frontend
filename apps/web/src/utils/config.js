export const PAGINATION_LIMITS = {
  PROJECTS: 12,
  JOBS: 10,
  COURSES: 12,
  COMMUNITIES: 12,
  MARKETPLACE: 12,
};

export const ANIMATION_VARIANTS = {
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
};

export const ROUTE_PATHS = {
  HOME: '/',
  PROJECTS: '/projects',
  COMMUNITY: '/community',
  JOBS: '/jobs',
  LEARNING: '/learning',
  MARKETPLACE: '/marketplace',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: false,
  ENABLE_SOCIAL_LOGIN: false,
};