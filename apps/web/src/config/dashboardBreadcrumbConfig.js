export const getDashboardBreadcrumbLabel = (pathname) => {
  // Static route mappings
  const routeMap = {
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/create-project': 'Create Project',
    '/projects': 'Projects',
    '/organizations': 'Organizations',
    '/groups': 'Groups',
    '/blogs': 'Blogs',
    '/products': 'Products',
    '/events': 'Events',
    '/teams': 'Teams',
    '/portfolio': 'Portfolio',
    '/courses': 'Courses',
  };

  // Check for exact match first
  if (routeMap[pathname]) {
    return routeMap[pathname];
  }

  // Handle dynamic routes
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Handle /project/:id
  if (pathSegments[0] === 'project' && pathSegments.length === 2) {
    return 'Project Details';
  }

  // Handle /organization/:id
  if (pathSegments[0] === 'organization' && pathSegments.length === 2) {
    return 'Organization Details';
  }

  // Handle /group/:id
  if (pathSegments[0] === 'group' && pathSegments.length === 2) {
    return 'Group Details';
  }

  // Handle /course/:id
  if (pathSegments[0] === 'course' && pathSegments.length === 2) {
    return 'Course Details';
  }

  // Handle /blog/:id
  if (pathSegments[0] === 'blog' && pathSegments.length === 2) {
    return 'Blog Details';
  }

  // Handle /product/:id
  if (pathSegments[0] === 'product' && pathSegments.length === 2) {
    return 'Product Details';
  }

  // Handle /event/:id
  if (pathSegments[0] === 'event' && pathSegments.length === 2) {
    return 'Event Details';
  }

  // Handle /team/:id
  if (pathSegments[0] === 'team' && pathSegments.length === 2) {
    return 'Team Details';
  }

  // Default fallback
  return pathSegments[pathSegments.length - 1]
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Page';
};

export const generateDashboardBreadcrumbs = (pathname) => {
  const crumbs = [
    { label: 'Dashboard home', path: '/dashboard' }
  ];

  if (pathname === '/dashboard' || pathname === '/') {
    return crumbs;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip adding 'dashboard' segment as it's already the root
    if (segment === 'dashboard') {
      return;
    }

    const label = getDashboardBreadcrumbLabel(currentPath);
    crumbs.push({
      label,
      path: currentPath
    });
  });

  return crumbs;
};