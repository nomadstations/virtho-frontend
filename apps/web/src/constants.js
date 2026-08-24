export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  
  // Health
  HEALTH_WELLNESS: '/health/wellness',
  HEALTH_ID: '/health/id',
  HEALTH_LEGAL: '/health/legal',
  
  // Knowledge
  LEARNING_RESOURCES: '/knowledge/resources',
  LEARNING: '/knowledge/courses',
  EDUCATIONAL_PROGRAMS: '/knowledge/programs',
  
  // Social
  COMMUNITY: '/social/communities',
  
  // Economy
  JOBS: '/economy/jobs',
  MARKETPLACE: '/economy/marketplace',
  FINANCES: '/economy/finances',
  LOGISTICS: '/economy/logistics',
  
  // Culture
  GAMES: '/culture/games',
  
  // General cross-realm pages
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog/:id',
  PROJECTS: '/projects',
  EVENTS: '/events',
  
  // Auth & System
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  SUPPORT: '/support',
  TERMS: '/terms',
  PRIVACY: '/privacy',
};

export const NAV_LINKS = [
  {
    name: 'Health',
    realm: 'health',
    dropdown: true,
    subLinks: [
      { name: 'Wellness', path: ROUTES.HEALTH_WELLNESS },
      { name: 'Health ID', path: ROUTES.HEALTH_ID },
      { name: 'Legal & Insurance', path: ROUTES.HEALTH_LEGAL },
    ]
  },
  {
    name: 'Knowledge',
    realm: 'knowledge',
    dropdown: true,
    subLinks: [
      { name: 'Learning resources', path: ROUTES.LEARNING_RESOURCES },
      { name: 'Courses', path: ROUTES.LEARNING },
      { name: 'Educational Programs', path: ROUTES.EDUCATIONAL_PROGRAMS },
      { name: 'Blogs', path: '/blogs?realm=knowledge' },
      { name: 'Projects', path: '/projects?realm=knowledge' },
      { name: 'Events', path: '/events?realm=knowledge' },
    ]
  },
  {
    name: 'Social',
    realm: 'social',
    dropdown: true,
    subLinks: [
      { name: 'Communities', path: ROUTES.COMMUNITY },
      { name: 'Blogs', path: '/blogs?realm=social' },
      { name: 'Projects', path: '/projects?realm=social' },
      { name: 'Events', path: '/events?realm=social' },
    ]
  },
  {
    name: 'Economy',
    realm: 'economy',
    dropdown: true,
    subLinks: [
      { name: 'Jobs', path: ROUTES.JOBS },
      { name: 'Marketplace', path: ROUTES.MARKETPLACE },
      { name: 'Finances', path: ROUTES.FINANCES },
      { name: 'Logistics', path: ROUTES.LOGISTICS },
      { name: 'Blogs', path: '/blogs?realm=economy' },
      { name: 'Projects', path: '/projects?realm=economy' },
      { name: 'Events', path: '/events?realm=economy' },
    ]
  },
  {
    name: 'Culture & Art',
    realm: 'culture',
    dropdown: true,
    subLinks: [
      { name: 'Games', path: ROUTES.GAMES },
      { name: 'Blogs', path: '/blogs?realm=culture' },
      { name: 'Projects', path: '/projects?realm=culture' },
      { name: 'Events', path: '/events?realm=culture' },
    ]
  }
];