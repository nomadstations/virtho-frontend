import { ROUTES, NAV_LINKS as MAIN_LINKS } from '../constants';

export const MAIN_NAVIGATION = MAIN_LINKS;

export const FOOTER_LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Contacts', path: '/contact' },
  { name: 'Support Us', path: '/support' },
  { name: 'Terms of Use', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Gallery', path: '/gallery' },
];

export const DASHBOARD_MENU = [
  { name: 'Overview', path: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Projects', path: '/projects-management', icon: 'FolderKanban' },
  { name: 'Communities', path: '/dashboard/groups', icon: 'Users' },
  { name: 'Jobs', path: '/dashboard/jobs', icon: 'Briefcase' },
  { name: 'Learning', path: '/dashboard/learning', icon: 'GraduationCap' },
  { name: 'Organizations', path: '/dashboard/organizations', icon: 'Building' },
];

export const BREADCRUMB_PATHS = {
  home: { label: 'Home', path: '/' },
  projects: { label: 'Projects', path: '/projects' },
  community: { label: 'Community', path: '/community' },
  jobs: { label: 'Jobs', path: '/jobs' },
  learning: { label: 'Learning', path: '/learning' },
  marketplace: { label: 'Marketplace', path: '/marketplace' },
  blogs: { label: 'Blogs', path: '/blogs' },
};