/**
 * Utility functions for mapping application routes to functional zones.
 */

export function getSectionKeyFromLocation(location) {
  const path = location.pathname.toLowerCase();

  // 1. Health Zone Routes
  if (path.startsWith('/health') || path.startsWith('/wellness')) {
    return 'health';
  }

  // 2. Community Zone Routes
  if (
    path.startsWith('/community') || 
    path.startsWith('/communities') ||
    path.startsWith('/organizations') || 
    path.startsWith('/dashboard/organizations') ||
    path.startsWith('/groups') || 
    path.startsWith('/dashboard/groups') ||
    path.startsWith('/gallery')
  ) {
    return 'community';
  }
  
  if (path.startsWith('/blogs')) {
    return 'blogs';
  }

  // 3. Economy Zone Routes
  if (
    path.startsWith('/projects') || 
    path.startsWith('/project') ||
    path.startsWith('/create-project') || 
    path.startsWith('/dashboard/projects')
  ) {
    return 'projects';
  }

  if (path.startsWith('/jobs') || path.startsWith('/dashboard/jobs')) {
    return 'jobs';
  }

  if (
    path.startsWith('/marketplace') || 
    path.startsWith('/product') || 
    path.startsWith('/success') || 
    path.startsWith('/store')
  ) {
    return 'marketplace';
  }

  if (path.startsWith('/learning') || path.startsWith('/dashboard/learning')) {
    return 'economy'; // learning section falls under economy for now
  }

  // 4. Neutral / System Routes
  if (
    path.startsWith('/users') || 
    path.startsWith('/dashboard/people') || 
    path.startsWith('/dashboard/teams') || 
    path.startsWith('/teams') ||
    path.startsWith('/profile')
  ) {
    return 'users';
  }

  if (path.startsWith('/settings')) {
    return 'settings';
  }

  // 5. Default Neutral (Home, Dashboard index, Login, About, etc.)
  return 'home';
}