import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GripVertical, RotateCcw, Save, X, Settings as SettingsIcon, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Reorder } from 'framer-motion';
import { getMenuItems, saveMenuConfig, resetToDefaults } from '@/constants/menuConfig.js';
import { ManageQuickLinksModal } from '@/components/dashboard/ManageQuickLinksModal.jsx';
import { ManageQuickActionsModal } from '@/components/dashboard/ManageQuickActionsModal.jsx';
import { useQuickLinks } from '@/hooks/useQuickLinks.js';
import { useQuickActions } from '@/hooks/useQuickActions.js';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import ZoneAssignmentSection from '@/ui/components/ZoneAssignmentSection';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showQuickLinksModal, setShowQuickLinksModal] = useState(false);
  const [showQuickActionsModal, setShowQuickActionsModal] = useState(false);
  const { toast } = useToast();
  const { quickLinks, availableEntities, updateQuickLinks } = useQuickLinks();
  const { quickActions, availableActions, saveQuickActions, resetToDefaults: resetQuickActions } = useQuickActions();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    const items = getMenuItems();
    setMenuItems(items);
    setHasChanges(false);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const toggleVisibility = (id) => {
    setMenuItems(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, visible: !item.visible } : item
      );
      setHasChanges(true);
      return updated;
    });
  };

  const handleReorder = (newOrder) => {
    setMenuItems(newOrder);
    setHasChanges(true);
  };

  const handleSave = () => {
    const success = saveMenuConfig(menuItems);
    if (success) {
      toast({
        title: 'Settings Saved',
        description: 'Dashboard menu configuration has been updated successfully.',
      });
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('dashboardMenuUpdate'));
      }
      
      setHasChanges(false);
      navigate('/dashboard');
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save menu configuration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    const defaults = resetToDefaults();
    setMenuItems(defaults);
    setHasChanges(true);
    toast({
      title: 'Reset to Defaults',
      description: 'Menu configuration has been reset to default settings.',
    });
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickActionsSave = (actions) => {
    saveQuickActions(actions);
  };

  const handleQuickActionsReset = () => {
    resetQuickActions();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast({
      title: `${isDarkMode ? 'Light' : 'Dark'} Mode Enabled`,
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} mode. Your preference has been saved.`,
    });
  };

  const mainMenuItems = menuItems.filter(item => item.category === 'Main');
  const settingsItems = menuItems.filter(item => item.category === 'Settings');

  return (
    <>
      <Helmet>
        <title>Settings - Virtho</title>
        <meta name="description" content="Customize your dashboard menu, quick links, quick actions, realms, and appearance settings" />
      </Helmet>

      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <DashboardBreadcrumb />

          <div 
            className="relative mb-8 rounded-xl overflow-hidden border shadow-sm"
            style={{ 
              borderColor: 'hsl(var(--zone-settings))' 
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: 'hsl(var(--zone-settings))' }} />
            <div className="p-6 pt-8" style={{ backgroundColor: 'hsl(var(--zone-settings-soft))' }}>
              <div className="flex items-center gap-3 mb-2">
                <SettingsIcon className="w-8 h-8" style={{ color: 'hsl(var(--zone-settings-ink))' }} />
                <h1 className="text-3xl font-bold" style={{ color: 'hsl(var(--zone-settings-ink))' }}>System Settings</h1>
              </div>
              <p style={{ color: 'hsl(var(--zone-settings-ink))', opacity: 0.8 }}>
                Customize your dashboard menu, quick links, quick actions, realms, and appearance
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <Tabs defaultValue="appearance" className="w-full">
              <div className="border-b border-gray-200 px-6 pt-6 bg-gray-50">
                <TabsList className="grid w-full max-w-3xl grid-cols-5 bg-white border shadow-sm">
                  <TabsTrigger value="appearance" className="data-[state=active]:bg-zone-settings-soft data-[state=active]:text-zone-settings-ink">Appearance</TabsTrigger>
                  <TabsTrigger value="menu" className="data-[state=active]:bg-zone-settings-soft data-[state=active]:text-zone-settings-ink">Menu Items</TabsTrigger>
                  <TabsTrigger value="links" className="data-[state=active]:bg-zone-settings-soft data-[state=active]:text-zone-settings-ink">Quick Links</TabsTrigger>
                  <TabsTrigger value="actions" className="data-[state=active]:bg-zone-settings-soft data-[state=active]:text-zone-settings-ink">Quick Actions</TabsTrigger>
                  <TabsTrigger value="realms" className="data-[state=active]:bg-zone-settings-soft data-[state=active]:text-zone-settings-ink">Realms</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="appearance" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Theme Preferences</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Choose your preferred color scheme. Your selection will be saved automatically.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-amber-100 text-amber-600'
                          }`}>
                            {isDarkMode ? (
                              <Moon className="w-6 h-6" />
                            ) : (
                              <Sun className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {isDarkMode 
                                ? 'Dark theme is easier on your eyes in low light' 
                                : 'Light theme is perfect for bright environments'}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleThemeToggle}
                          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                          style={{ outlineColor: 'hsl(var(--zone-settings))' }}
                          role="switch"
                          aria-checked={isDarkMode}
                          aria-label="Toggle dark mode"
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                              isDarkMode ? 'translate-x-9' : 'translate-x-1'
                            }`}
                          >
                            {isDarkMode ? (
                              <Moon className="w-4 h-4 text-indigo-600 m-1" />
                            ) : (
                              <Sun className="w-4 h-4 text-amber-600 m-1" />
                            )}
                          </span>
                        </button>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div 
                            onClick={() => !isDarkMode || handleThemeToggle()}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              !isDarkMode 
                                ? 'border-gray-400 bg-gray-100 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Sun className={`w-5 h-5 ${!isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} />
                              <span className={`font-semibold ${!isDarkMode ? 'text-gray-900' : 'text-gray-700'}`}>
                                Light Mode
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Clean and bright interface
                            </p>
                          </div>

                          <div 
                            onClick={() => isDarkMode || handleThemeToggle()}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              isDarkMode 
                                ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Moon className={`w-5 h-5 ${isDarkMode ? 'text-indigo-600' : 'text-gray-400'}`} />
                              <span className={`font-semibold ${isDarkMode ? 'text-indigo-600' : 'text-gray-700'}`}>
                                Dark Mode
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Easy on your eyes at night
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="menu" className="mt-0 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Menu Customization</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Drag items to reorder, uncheck to hide from sidebar
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <Reorder.Group
                      axis="y"
                      values={mainMenuItems}
                      onReorder={(newOrder) => {
                        const allItems = [...newOrder, ...settingsItems];
                        handleReorder(allItems);
                      }}
                      className="space-y-2"
                    >
                      {mainMenuItems.map((item) => (
                        <Reorder.Item
                          key={item.id}
                          value={item}
                          className="bg-white rounded-lg border border-gray-200 shadow-sm"
                        >
                          <div className="flex items-center gap-3 p-4">
                            <div className="menu-drag-handle cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            
                            <Checkbox
                              id={`menu-${item.id}`}
                              checked={item.visible}
                              onCheckedChange={() => toggleVisibility(item.id)}
                            />
                            
                            <item.iconComponent className="w-5 h-5 flex-shrink-0" style={{ color: 'hsl(var(--zone-settings))' }} />
                            
                            <Label
                              htmlFor={`menu-${item.id}`}
                              className="text-gray-900 font-medium cursor-pointer flex-1"
                            >
                              {item.label}
                              {item.comingSoon && (
                                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                  Coming Soon
                                </span>
                              )}
                            </Label>
                            
                            {!item.visible && (
                              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                Hidden
                              </span>
                            )}
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                </TabsContent>

                <TabsContent value="links" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage quick access links displayed on your dashboard
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowQuickLinksModal(true)}
                      className="w-full sm:w-auto justify-start border-gray-300 hover:bg-zone-settings-soft hover:text-zone-settings-ink transition-colors"
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Manage Quick Links ({quickLinks.length} selected)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="mt-0 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Customize action buttons for common tasks on your dashboard
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowQuickActionsModal(true)}
                      className="w-full sm:w-auto justify-start border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                    >
                      <Zap className="w-4 h-4 mr-2 text-amber-600" />
                      Manage Quick Actions ({quickActions.length} selected)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="realms" className="mt-0 space-y-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Module Realm Assignments</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Map application modules to distinct logical realms to customize navigation colors and contexts.
                      </p>
                    </div>
                    <div className="max-w-2xl border rounded-lg p-6 bg-gray-50/50">
                      <ZoneAssignmentSection />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg mt-8 -mx-4 md:-mx-8 px-4 md:px-8 py-4 z-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {hasChanges ? (
                  <span className="text-amber-600 font-medium">• Unsaved changes</span>
                ) : (
                  <span>No changes</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'hsl(var(--zone-settings-ink))' }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <ManageQuickLinksModal
        isOpen={showQuickLinksModal}
        onClose={() => setShowQuickLinksModal(false)}
        quickLinks={quickLinks}
        availableEntities={availableEntities}
        updateQuickLinks={updateQuickLinks}
      />

      <ManageQuickActionsModal
        isOpen={showQuickActionsModal}
        onClose={() => setShowQuickActionsModal(false)}
        availableActions={availableActions}
        selectedActionIds={quickActions.map(a => a.id)}
        onSave={handleQuickActionsSave}
        onReset={handleQuickActionsReset}
      />
    </>
  );
}