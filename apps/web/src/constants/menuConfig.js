import { LayoutDashboard, Building2, Users as GroupIcon, UserCircle, KeyRound as UsersRound, FolderKanban, ShoppingBag, GraduationCap, Briefcase, MessageSquare, Settings, HelpCircle } from 'lucide-react';

const MENU_ITEMS = [
  // Main Navigation
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    iconComponent: LayoutDashboard,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'organizations',
    label: 'Organizations',
    path: '/dashboard/organizations',
    iconComponent: Building2,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'groups',
    label: 'Groups',
    path: '/dashboard/groups',
    iconComponent: GroupIcon,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'people',
    label: 'People',
    path: '/dashboard/people',
    iconComponent: UserCircle,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'teams',
    label: 'Teams',
    path: '/dashboard/teams',
    iconComponent: UsersRound,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/dashboard/projects',
    iconComponent: FolderKanban,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    path: '/dashboard/marketplace',
    iconComponent: ShoppingBag,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'learning',
    label: 'Learning',
    path: '/dashboard/learning',
    iconComponent: GraduationCap,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'jobs',
    label: 'Jobs',
    path: '/dashboard/jobs',
    iconComponent: Briefcase,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  {
    id: 'community',
    label: 'Community',
    path: '/dashboard/community',
    iconComponent: MessageSquare,
    category: 'Main',
    visible: true,
    comingSoon: false
  },
  
  // Settings Navigation
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    iconComponent: Settings,
    category: 'Settings',
    visible: true,
    comingSoon: false
  },
  {
    id: 'help',
    label: 'Help & Support',
    path: '/help',
    iconComponent: HelpCircle,
    category: 'Settings',
    visible: true,
    comingSoon: true
  }
];

const STORAGE_KEY = 'dashboardMenuConfig';
const ORDER_STORAGE_KEY = 'dashboardMenuOrder';

export function getMenuItems() {
  try {
    const storedConfig = localStorage.getItem(STORAGE_KEY);
    const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
    
    if (storedConfig) {
      const config = JSON.parse(storedConfig);
      const order = storedOrder ? JSON.parse(storedOrder) : null;
      
      let items = MENU_ITEMS.map(item => {
        const savedItem = config.find(c => c.id === item.id);
        return savedItem ? { ...item, visible: savedItem.visible } : item;
      });
      
      if (order && Array.isArray(order)) {
        const orderedItems = [];
        order.forEach(id => {
          const item = items.find(i => i.id === id);
          if (item) orderedItems.push(item);
        });
        
        items.forEach(item => {
          if (!orderedItems.find(i => i.id === item.id)) {
            orderedItems.push(item);
          }
        });
        
        return orderedItems;
      }
      
      return items;
    }
  } catch (error) {
    console.error('Error loading menu config:', error);
  }
  
  return MENU_ITEMS;
}

export function saveMenuConfig(items) {
  try {
    const config = items.map(item => ({
      id: item.id,
      visible: item.visible
    }));
    
    const order = items.map(item => item.id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new Event('dashboardMenuUpdate'));
    }
    
    return true;
  } catch (error) {
    console.error('Error saving menu config:', error);
    return false;
  }
}

export function resetToDefaults() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ORDER_STORAGE_KEY);
    
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new Event('dashboardMenuUpdate'));
    }
    
    return MENU_ITEMS;
  } catch (error) {
    console.error('Error resetting menu config:', error);
    return MENU_ITEMS;
  }
}

export function getDefaultMenuItems() {
  return MENU_ITEMS;
}