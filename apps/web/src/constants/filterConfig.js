export const PROJECT_FILTERS = {
  categories: ['Web Development', 'Mobile App', 'Design', 'Data Science', 'AI/ML', 'Other'],
  statuses: ['active', 'archived']
};

export const COMMUNITY_FILTERS = {
  userTypes: [
    { value: 'Human', label: 'People' },
    { value: 'Group', label: 'Groups' },
    { value: 'Organization', label: 'Organizations' }
  ],
  locations: [
    'Africa',
    'Asia',
    'Australia and Oceania',
    'Europe',
    'Global',
    'North America',
    'South America'
  ],
  activityLevels: ['High', 'Medium', 'Low']
};

export const MARKETPLACE_FILTERS = {
  categories: ['Digital', 'Merchandise', 'Services']
};

export const BLOG_FILTERS = {
  entityTypes: ['Human', 'Group', 'Organization'],
  dateRanges: ['Past Week', 'Past Month', 'Past Year', 'All Time'],
  readTimes: ['< 5 mins', '5-10 mins', '> 10 mins']
};