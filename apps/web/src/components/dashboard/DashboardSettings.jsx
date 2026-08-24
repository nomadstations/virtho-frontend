import React, { useState, useEffect } from 'react';
import { X, GripVertical, RotateCcw, Save, Zap, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { getMenuItems, saveMenuConfig, getDefaultMenuItems } from '@/constants/menuConfig.js';
import { useQuickLinks } from '@/hooks/useQuickLinks.js';
import { useQuickActions } from '@/hooks/useQuickActions.js';
import { ALL_QUICK_LINKS } from '@/constants/quickLinksConfig';

function DashboardSettings({ isOpen, onClose, onMenuUpdate }) {
  // Snapshot states
  const [initialMenu, setInitialMenu] = useState([]);
  const [initialQuickLinks, setInitialQuickLinks] = useState([]);
  const [initialQuickActions, setInitialQuickActions] = useState([]);

  // Staging states
  const [localMenu, setLocalMenu] = useState([]);
  const [localQuickLinks, setLocalQuickLinks] = useState([]);
  const [localQuickActions, setLocalQuickActions] = useState([]);

  const { toast } = useToast();
  
  const { 
    selectedQuickLinks, 
    updateQuickLinks, 
    navigationEntities 
  } = useQuickLinks();

  const { 
    quickActions, 
    availableActions, 
    saveQuickActions 
  } = useQuickActions();

  // Load snapshots securely when modal opens
  useEffect(() => {
    if (isOpen) {
      // Menu Items
      const menu = getMenuItems();
      setLocalMenu(menu);
      setInitialMenu(JSON.parse(JSON.stringify(menu)));

      // Quick Links (tracking active IDs)
      const linkIds = selectedQuickLinks.map(l => l.id);
      setLocalQuickLinks(linkIds);
      setInitialQuickLinks(linkIds);

      // Quick Actions (tracking active IDs)
      const actionIds = quickActions.map(a => a.id);
      setLocalQuickActions(actionIds);
      setInitialQuickActions(actionIds);
    }
  }, [isOpen, selectedQuickLinks, quickActions]);

  // Deep Dirty Checking
  const isMenuDirty = JSON.stringify(localMenu) !== JSON.stringify(initialMenu);
  const isLinksDirty = JSON.stringify([...localQuickLinks].sort()) !== JSON.stringify([...initialQuickLinks].sort());
  const isActionsDirty = JSON.stringify([...localQuickActions].sort()) !== JSON.stringify([...initialQuickActions].sort());
  
  const isDirty = isMenuDirty || isLinksDirty || isActionsDirty;

  // Handlers - Modifying LOCAL Staging State ONLY
  const toggleMenuVisibility = (id) => {
    setLocalMenu(prev => prev.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const handleMenuReorder = (newOrder) => {
    setLocalMenu(newOrder);
  };

  const toggleQuickLink = (id) => {
    setLocalQuickLinks(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const toggleQuickAction = (id) => {
    setLocalQuickActions(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleMenuReset = () => {
    const defaults = getDefaultMenuItems();
    setLocalMenu(defaults);
  };

  const handleSaveAll = () => {
    // Commit Menu
    if (isMenuDirty) {
      saveMenuConfig(localMenu);
    }
    // Commit Quick Links
    if (isLinksDirty) {
      const activeEntities = ALL_QUICK_LINKS.filter(e => localQuickLinks.includes(e.id));
      updateQuickLinks(activeEntities);
    }
    // Commit Quick Actions
    if (isActionsDirty) {
      const activeActionsList = availableActions.filter(a => localQuickActions.includes(a.id));
      saveQuickActions(activeActionsList);
    }

    toast({
      title: 'Settings Saved',
      description: 'Your dashboard configuration has been updated successfully.',
    });
    
    if (onMenuUpdate) {
      onMenuUpdate();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose(); // Staging state gets destroyed
  };

  const mainMenuItems = localMenu.filter(item => item.category === 'Main');
  const settingsItems = localMenu.filter(item => item.category === 'Settings');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={handleCancel}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Settings</h2>
              <p className="text-sm text-gray-600 mt-1">
                Customize your dashboard menu, quick links, and quick actions
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Tabs defaultValue="menu" className="flex flex-col flex-1 overflow-hidden">
            <div className="px-6 pt-4 border-b border-gray-200 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-10">
                <TabsTrigger value="menu">
                  Menu
                  {isMenuDirty && <span className="ml-2 w-2 h-2 bg-amber-500 rounded-full" />}
                </TabsTrigger>
                <TabsTrigger value="links">
                  Links
                  {isLinksDirty && <span className="ml-2 w-2 h-2 bg-amber-500 rounded-full" />}
                </TabsTrigger>
                <TabsTrigger value="actions">
                  Actions
                  {isActionsDirty && <span className="ml-2 w-2 h-2 bg-amber-500 rounded-full" />}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* MENU ITEMS TAB */}
              <TabsContent value="menu" className="mt-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Menu Customization</h3>
                    <Button variant="outline" size="sm" onClick={handleMenuReset} className="text-gray-600">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tip:</strong> Hidden menu items will also be automatically removed from Quick Links.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <Reorder.Group
                      axis="y"
                      values={mainMenuItems}
                      onReorder={(newOrder) => {
                        const allItems = [...newOrder, ...settingsItems];
                        handleMenuReorder(allItems);
                      }}
                      className="space-y-2"
                    >
                      {mainMenuItems.map((item) => (
                        <Reorder.Item key={item.id} value={item} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3 p-4">
                            <div className="menu-drag-handle cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            <Checkbox id={`menu-${item.id}`} checked={item.visible} onCheckedChange={() => toggleMenuVisibility(item.id)} />
                            <item.iconComponent className="w-5 h-5 text-lavender-primary flex-shrink-0" />
                            <Label htmlFor={`menu-${item.id}`} className="text-gray-900 font-medium cursor-pointer flex-1">
                              {item.label}
                            </Label>
                            {!item.visible && <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">Hidden</span>}
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                </div>
              </TabsContent>

              {/* QUICK LINKS TAB */}
              <TabsContent value="links" className="mt-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-lavender-primary" />
                      <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Select which navigation links to display on your dashboard ({localQuickLinks.length} selected).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-3">
                      {navigationEntities.map((entity) => {
                        const IconComponent = entity.icon;
                        const isSelected = localQuickLinks.includes(entity.id);
                        
                        return (
                          <div
                            key={entity.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected ? 'bg-lavender-lightest border-lavender-light shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleQuickLink(entity.id)}
                          >
                            <Checkbox id={`ql-${entity.id}`} checked={isSelected} onCheckedChange={() => toggleQuickLink(entity.id)} />
                            {IconComponent && <IconComponent className={`w-5 h-5 ${isSelected ? 'text-lavender-primary' : 'text-gray-600'}`} strokeWidth={1.5} />}
                            <Label htmlFor={`ql-${entity.id}`} className="text-gray-900 font-medium cursor-pointer flex-1">
                              {entity.name}
                            </Label>
                            {isSelected && <Check className="w-4 h-4 text-green-600" strokeWidth={2} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* QUICK ACTIONS TAB */}
              <TabsContent value="actions" className="mt-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Customize action buttons for one-click common tasks ({localQuickActions.length} selected).
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-3">
                      {availableActions.map((action) => {
                        const isSelected = localQuickActions.includes(action.id);
                        return (
                          <div
                            key={action.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleQuickAction(action.id)}
                          >
                            <Checkbox id={`qa-${action.id}`} checked={isSelected} onCheckedChange={() => toggleQuickAction(action.id)} />
                            <action.iconComponent className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-gray-600'}`} />
                            <Label htmlFor={`qa-${action.id}`} className="text-gray-900 font-medium cursor-pointer flex-1">
                              {action.label}
                            </Label>
                            {isSelected && <Check className="w-4 h-4 text-green-600" strokeWidth={2} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="text-sm text-gray-600">
                {isDirty ? (
                  <span className="text-amber-600 font-medium">• Pending changes</span>
                ) : (
                  <span>No changes</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancel} className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300">
                  {isDirty ? 'Cancel' : 'Close'}
                </Button>
                <Button onClick={handleSaveAll} disabled={!isDirty} className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default DashboardSettings;