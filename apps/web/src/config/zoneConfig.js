export const ZONES = ['health', 'knowledge', 'social', 'economy', 'culture'];
export const SYSTEM_ZONE = 'settings';

export const CATEGORY_LABELS = {
  health: 'Health',
  knowledge: 'Knowledge',
  social: 'Social',
  economy: 'Economy',
  culture: 'Culture&Art',
  settings: 'Settings'
};

// THIS MAP IS THE ONLY PLACE A MODULE'S DEFAULT ZONE IS DECLARED.
export const MODULE_ZONE_MAP = {
  home: null,
  social: 'social',
  community: 'social',
  groups: 'social',
  blogs: 'social',
  learning: 'knowledge',
  courses: 'knowledge',
  economy: 'economy',
  marketplace: 'economy',
  jobs: 'economy',
  projects: 'economy',
  store: 'economy',
  health: 'health',
  wellness: 'health',
  games: 'culture',
  users: 'settings',
  settings: 'settings'
};

// Unified structure for grouped realm dropdown menus
export const REALM_DROPDOWN_CONFIG = {
  health: {
    nativeItems: [
      { name: 'Wellness', path: '/health/wellness' },
      { name: 'Health ID', path: '/health/id' },
      { name: 'Legal & Insurance', path: '/health/legal' }
    ],
    contentItems: [
      { name: 'Blogs', path: '/blogs?realm=health' },
      { name: 'Projects', path: '/projects?realm=health' },
      { name: 'Events', path: '/events?realm=health' }
    ]
  },
  knowledge: {
    nativeItems: [
      { name: 'Learning', path: '/learning' },
      { name: 'Educational Programs', path: '/educational-programs' },
      { name: 'Resources', path: '/learning-resources' }
    ],
    contentItems: [
      { name: 'Blogs', path: '/blogs?realm=knowledge' },
      { name: 'Projects', path: '/projects?realm=knowledge' },
      { name: 'Events', path: '/events?realm=knowledge' }
    ]
  },
  social: {
    nativeItems: [
      { name: 'Community', path: '/community' },
      { name: 'Groups', path: '/dashboard/groups' },
      { name: 'Organizations', path: '/dashboard/organizations' }
    ],
    contentItems: [
      { name: 'Blogs', path: '/blogs?realm=social' },
      { name: 'Projects', path: '/projects?realm=social' },
      { name: 'Events', path: '/events?realm=social' }
    ]
  },
  economy: {
    nativeItems: [
      { name: 'Marketplace', path: '/marketplace' },
      { name: 'Jobs', path: '/jobs' },
      { name: 'Finances', path: '/finances' },
      { name: 'Logistics', path: '/logistics' }
    ],
    contentItems: [
      { name: 'Blogs', path: '/blogs?realm=economy' },
      { name: 'Projects', path: '/projects?realm=economy' },
      { name: 'Events', path: '/events?realm=economy' }
    ]
  },
  culture: {
    nativeItems: [
      { name: 'Gallery', path: '/gallery' },
      { name: 'Games', path: '/games' }
    ],
    contentItems: [
      { name: 'Blogs', path: '/blogs?realm=culture' },
      { name: 'Projects', path: '/projects?realm=culture' },
      { name: 'Events', path: '/events?realm=culture' }
    ]
  }
};

// Dynamic map parameter ensures backward compatibility while supporting context overrides
export function getZoneForKey(key, dynamicMap = null) {
  if (dynamicMap && key in dynamicMap) {
    return dynamicMap[key];
  }
  return MODULE_ZONE_MAP[key] || null;
}