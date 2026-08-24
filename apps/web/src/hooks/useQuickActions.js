import { useState, useEffect } from 'react';
import { Building2, Users, FolderOpen, KeyRound as UsersRound, FileText, Calendar, ShoppingBag, GraduationCap, Briefcase } from 'lucide-react';

const STORAGE_KEY = 'dashboardQuickActions';

const AVAILABLE_QUICK_ACTIONS = [
  { id: 'create-organization', label: 'Create Organization', icon: 'Building2', iconComponent: Building2, category: 'Core Actions' },
  { id: 'create-group', label: 'Create Group', icon: 'Users', iconComponent: Users, category: 'Core Actions' },
  { id: 'create-project', label: 'Create Project', icon: 'FolderOpen', iconComponent: FolderOpen, category: 'Core Actions' },
  { id: 'create-team', label: 'Create Team', icon: 'UsersRound', iconComponent: UsersRound, category: 'People Management' },
  { id: 'create-post', label: 'Write a Post', icon: 'FileText', iconComponent: FileText, category: 'Content Creation' },
  { id: 'create-event', label: 'Create Event', icon: 'Calendar', iconComponent: Calendar, category: 'Content Creation' },
  { id: 'add-product', label: 'Add Product', icon: 'ShoppingBag', iconComponent: ShoppingBag, category: 'Commerce' },
  { id: 'add-course', label: 'Add Course', icon: 'GraduationCap', iconComponent: GraduationCap, category: 'Learning' },
  { id: 'post-job', label: 'Post a Job', icon: 'Briefcase', iconComponent: Briefcase, category: 'Jobs' },
];

const DEFAULT_SELECTED_IDS = ['create-organization', 'create-group', 'create-project'];

export function getQuickActions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const selectedIds = JSON.parse(stored);
      if (!Array.isArray(selectedIds)) throw new Error('Invalid format');
      const validIds = selectedIds.filter(id => id !== 'create-user' && id !== 'create-order');
      return AVAILABLE_QUICK_ACTIONS.filter(action => validIds.includes(action.id));
    }
  } catch (error) {
    console.error('[useQuickActions] Error loading quick actions:', error);
  }
  return AVAILABLE_QUICK_ACTIONS.filter(action => DEFAULT_SELECTED_IDS.includes(action.id));
}

export function saveQuickActions(actions) {
  try {
    const actionIds = actions.map(action => action.id).filter(id => id !== 'create-user' && id !== 'create-order');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actionIds));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dashboardQuickActionsUpdate'));
    }
    return true;
  } catch (error) {
    console.error('[useQuickActions] Error saving quick actions:', error);
    return false;
  }
}

export function resetQuickActionsToDefaults() {
  try {
    const defaults = AVAILABLE_QUICK_ACTIONS.filter(action => DEFAULT_SELECTED_IDS.includes(action.id));
    saveQuickActions(defaults);
    return defaults;
  } catch (error) {
    return AVAILABLE_QUICK_ACTIONS.filter(action => DEFAULT_SELECTED_IDS.includes(action.id));
  }
}

export function useQuickActions() {
  const [quickActions, setQuickActions] = useState(() => getQuickActions());
  const [availableActions] = useState(AVAILABLE_QUICK_ACTIONS);

  useEffect(() => {
    const handleUpdate = () => {
      setQuickActions(getQuickActions());
    };
    
    window.addEventListener('dashboardQuickActionsUpdate', handleUpdate);
    return () => window.removeEventListener('dashboardQuickActionsUpdate', handleUpdate);
  }, []);

  const handleSaveQuickActions = (actions) => {
    return saveQuickActions(actions);
  };

  const handleResetToDefaults = () => {
    return resetQuickActionsToDefaults();
  };

  return {
    quickActions,
    availableActions,
    resetToDefaults: handleResetToDefaults,
    saveQuickActions: handleSaveQuickActions
  };
}