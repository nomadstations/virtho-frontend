import { ROUTES } from '@/constants';

export const getBreadcrumbPaths = (pathname, isDashboard = false) => {
  // Determine if we're in dashboard context
  const isInDashboard = isDashboard || 
    pathname.startsWith('/dashboard') || 
    pathname === '/profile' || 
    pathname === '/settings' ||
    pathname === '/create-project' ||
    pathname.startsWith('/project/');

  // Use "Dashboard home" for dashboard pages, "Home" for public pages
  const home = isInDashboard 
    ? { label: 'Dashboard home', href: '/dashboard' }
    : { label: 'Home', href: ROUTES.HOME };

  if (!pathname || pathname === ROUTES.HOME || pathname === '/') return [home];
  if (pathname === '/dashboard') return [home];

  const parts = pathname.split('/').filter(Boolean);
  const paths = [home];

  const routeMap = {
    'marketplace': { label: 'Marketplace', href: ROUTES.MARKETPLACE },
    'product': { label: 'Marketplace', href: ROUTES.MARKETPLACE },
    'community': { label: 'Community', href: ROUTES.COMMUNITY },
    'projects': { label: 'Projects', href: ROUTES.PROJECTS },
    'project': { label: 'Projects', href: ROUTES.PROJECTS },
    'jobs': { label: 'Jobs', href: ROUTES.JOBS },
    'learning': { label: 'Learning', href: ROUTES.LEARNING },
    'blogs': { label: 'Blogs', href: ROUTES.BLOGS },
    'blog': { label: 'Blogs', href: ROUTES.BLOGS },
    'dashboard': { label: 'Dashboard', href: ROUTES.DASHBOARD },
    'create-project': { label: 'Create Project', href: '/create-project' },
    'profile': { label: 'Profile', href: '/profile' },
    'settings': { label: 'Settings', href: '/settings' },
    'contact': { label: 'Contact', href: ROUTES.CONTACT },
    'support-us': { label: 'Support Us', href: ROUTES.SUPPORT },
    'terms': { label: 'Terms', href: ROUTES.TERMS },
    'privacy': { label: 'Privacy', href: ROUTES.PRIVACY },
    'gallery': { label: 'Gallery', href: '/gallery' },
    'organizations': { label: 'Organizations', href: ROUTES.ORGANIZATIONS },
    'groups': { label: 'Groups', href: ROUTES.GROUPS },
  };

  if (parts[0] && routeMap[parts[0]]) {
    paths.push(routeMap[parts[0]]);
  }

  return paths;
};