import { FileText, Briefcase, ShoppingBag, Users, GraduationCap, Lightbulb, UserCircle, Building2, KeyRound as UsersRound, Briefcase as JobIcon, Store, Book } from 'lucide-react';

export const ALL_QUICK_LINKS = [
  // Content Management
  {
    id: 'blogs',
    name: 'Blogs',
    icon: FileText,
    path: '/blogs',
    type: 'navigation',
    category: 'content',
    description: 'Manage your blog posts and articles'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: Briefcase,
    path: '/dashboard/projects',
    type: 'navigation',
    category: 'content',
    description: 'Manage your projects and portfolio'
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: GraduationCap,
    path: '/dashboard/learning',
    type: 'navigation',
    category: 'education',
    description: 'Manage your courses and learning materials'
  },
  
  // E-commerce
  {
    id: 'marketplace',
    name: 'Marketplace',
    icon: Store,
    path: '/marketplace',
    type: 'navigation',
    category: 'commerce',
    description: 'Browse and manage marketplace items'
  },
  {
    id: 'store',
    name: 'Store',
    icon: ShoppingBag,
    path: '/store',
    type: 'navigation',
    category: 'commerce',
    description: 'Manage your online store products'
  },
  
  // Community & Collaboration
  {
    id: 'community',
    name: 'Community',
    icon: UsersRound,
    path: '/community',
    type: 'navigation',
    category: 'social',
    description: 'Connect with community members'
  },
  {
    id: 'teams',
    name: 'Teams',
    icon: Users,
    path: '/dashboard/teams',
    type: 'navigation',
    category: 'collaboration',
    description: 'Manage your teams and collaborations'
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: JobIcon,
    path: '/dashboard/jobs',
    type: 'navigation',
    category: 'career',
    description: 'Manage your job postings'
  },
  
  // Organization Management
  {
    id: 'organizations',
    name: 'Organizations',
    icon: Building2,
    path: '/dashboard/organizations',
    type: 'navigation',
    category: 'management',
    description: 'Manage organizations and entities'
  },
  {
    id: 'groups',
    name: 'Groups',
    icon: UsersRound,
    path: '/dashboard/groups',
    type: 'navigation',
    category: 'management',
    description: 'Manage groups and communities'
  },
  
  // User Management
  {
    id: 'users',
    name: 'Users',
    icon: UserCircle,
    path: '/dashboard/people',
    type: 'navigation',
    category: 'management',
    description: 'Manage users and permissions'
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: UserCircle,
    path: '/profile',
    type: 'navigation',
    category: 'personal',
    description: 'View and edit your profile'
  },
  
  // Resources
  {
    id: 'resources',
    name: 'Resources',
    icon: Book,
    path: '/resources',
    type: 'navigation',
    category: 'education',
    description: 'Access helpful resources and guides'
  },
  {
    id: 'ideas',
    name: 'Ideas',
    icon: Lightbulb,
    path: '/ideas',
    type: 'navigation',
    category: 'innovation',
    description: 'Share and explore new ideas'
  }
];

export const DEFAULT_SELECTED_QUICK_LINKS = [
  'blogs',
  'projects',
  'learning',
  'marketplace',
  'store',
  'community',
  'teams',
  'jobs'
];

export const MAX_QUICK_LINKS = 10;
export const MIN_QUICK_LINKS = 1;

export function validateQuickLinksConfig() {
  const errors = [];
  
  DEFAULT_SELECTED_QUICK_LINKS.forEach(id => {
    const exists = ALL_QUICK_LINKS.find(link => link.id === id);
    if (!exists) {
      errors.push(`Default selection '${id}' not found in ALL_QUICK_LINKS`);
    }
  });
  
  const ids = ALL_QUICK_LINKS.map(link => link.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    errors.push(`Duplicate IDs found: ${duplicates.join(', ')}`);
  }
  
  ALL_QUICK_LINKS.forEach(link => {
    if (!link.id) errors.push('Quick link missing id');
    if (!link.name) errors.push(`Quick link ${link.id} missing name`);
    if (!link.icon) errors.push(`Quick link ${link.id} missing icon`);
    if (link.type === 'navigation' && !link.path) {
      errors.push(`Navigation link ${link.id} missing path`);
    }
  });
  
  if (DEFAULT_SELECTED_QUICK_LINKS.length > MAX_QUICK_LINKS) {
    errors.push(`Too many defaults: ${DEFAULT_SELECTED_QUICK_LINKS.length} (max: ${MAX_QUICK_LINKS})`);
  }
  
  if (DEFAULT_SELECTED_QUICK_LINKS.length < MIN_QUICK_LINKS) {
    errors.push(`Too few defaults: ${DEFAULT_SELECTED_QUICK_LINKS.length} (min: ${MIN_QUICK_LINKS})`);
  }
  
  if (errors.length > 0) {
    console.error('[quickLinksConfig] Validation errors:', errors);
  }
  
  return errors;
}

validateQuickLinksConfig();

export function getQuickLinksByCategory(category) {
  return ALL_QUICK_LINKS.filter(link => link.category === category);
}

export function getCategories() {
  const categories = new Set(ALL_QUICK_LINKS.map(link => link.category));
  return Array.from(categories);
}

export function isValidQuickLinkId(id) {
  return ALL_QUICK_LINKS.some(link => link.id === id);
}