export function generatePublicBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return [];
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' }
  ];

  if (segments[0] === 'project' || segments[0] === 'projects') {
    breadcrumbs.push({ label: 'Projects', path: '/projects' });
    
    if (segments[1] === 'create') {
      breadcrumbs.push({ label: 'Create Project', path: '/projects/create' });
    } else if (segments[1]) {
      if (segments[2] === 'microsite') {
        breadcrumbs.push({ label: 'Project', path: `/project/${segments[1]}` });
        breadcrumbs.push({ label: 'Microsite', path: `/project/${segments[1]}/microsite` });
      } else if (segments[2] === 'resources') {
        breadcrumbs.push({ label: 'Project', path: `/project/${segments[1]}` });
        breadcrumbs.push({ label: 'Resources', path: `/project/${segments[1]}/resources` });
      } else {
        breadcrumbs.push({ label: 'Project Details', path: `/project/${segments[1]}` });
      }
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'jobs') {
    breadcrumbs.push({ label: 'Jobs', path: '/jobs' });
    
    if (segments[1]) {
      breadcrumbs.push({ label: 'Job Details', path: `/jobs/${segments[1]}` });
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'learning') {
    breadcrumbs.push({ label: 'Learning', path: '/learning' });
    
    if (segments[1]) {
      breadcrumbs.push({ label: 'Course Details', path: `/learning/${segments[1]}` });
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'community' || segments[0] === 'communities') {
    breadcrumbs.push({ label: 'Community', path: '/community' });
    
    if (segments[1] === 'human' && segments[2]) {
      breadcrumbs.push({ label: 'Member Profile', path: `/community/human/${segments[2]}` });
    } else if (segments[1] === 'group' && segments[2]) {
      breadcrumbs.push({ label: 'Group', path: `/community/group/${segments[2]}` });
    } else if (segments[1] === 'organization' && segments[2]) {
      breadcrumbs.push({ label: 'Organization', path: `/community/organization/${segments[2]}` });
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'marketplace' || segments[0] === 'product') {
    breadcrumbs.push({ label: 'Marketplace', path: '/marketplace' });
    
    if (segments[0] === 'product' && segments[1]) {
      breadcrumbs.push({ label: 'Product Details', path: `/product/${segments[1]}` });
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'blogs') {
    breadcrumbs.push({ label: 'Blogs', path: '/blogs' });
    
    if (segments[1]) {
      breadcrumbs.push({ label: 'Blog Post', path: `/blogs/${segments[1]}` });
    }
    
    return breadcrumbs;
  }

  if (segments[0] === 'health') {
    breadcrumbs.push({ label: 'Health', path: '/health/wellness' });
    
    if (segments[1] === 'wellness') {
      breadcrumbs.push({ label: 'Wellness', path: '/health/wellness' });
    } else if (segments[1] === 'health-id') {
      breadcrumbs.push({ label: 'Health ID', path: '/health/health-id' });
    } else if (segments[1] === 'legal-insurance') {
      breadcrumbs.push({ label: 'Legal & Insurance', path: '/health/legal-insurance' });
    }
    
    return breadcrumbs;
  }

  const staticPages = {
    'about': 'About Us',
    'contact': 'Contact',
    'support': 'Support Us',
    'terms': 'Terms of Service',
    'privacy': 'Privacy Policy',
    'gallery': 'Gallery',
  };

  if (staticPages[segments[0]]) {
    breadcrumbs.push({ label: staticPages[segments[0]], path: `/${segments[0]}` });
    return breadcrumbs;
  }

  segments.forEach((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({ label, path });
  });

  return breadcrumbs;
}