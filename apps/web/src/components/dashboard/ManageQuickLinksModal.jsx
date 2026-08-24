import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_QUICK_LINKS } from '@/constants/quickLinksConfig';

/**
 * ROOT CAUSE & FIX SUMMARY:
 * Issue: Toggling directly mutated hook state causing leaks when closed, and Save button state wasn't reactive.
 * Fix: 
 * 1. Isolated changes in `localSelectedIds` state.
 * 2. Implemented deep array comparison `isDirty` to accurately detect state mismatch.
 * 3. Enforced strictly enabling/disabling "Save Changes" based on `isDirty`.
 * 4. Cancel safely reverts back to the `initialIds` snapshot.
 */
export function ManageQuickLinksModal({ isOpen, onClose, quickLinks = [], availableEntities = [], updateQuickLinks }) {
  const [localSelectedIds, setLocalSelectedIds] = useState([]);
  const [initialIds, setInitialIds] = useState([]);
  const { toast } = useToast();

  const entities = availableEntities.length > 0 ? availableEntities : ALL_QUICK_LINKS;

  useEffect(() => {
    if (isOpen) {
      const ids = (quickLinks || []).map(link => link.id);
      setLocalSelectedIds(ids);
      setInitialIds(ids);
    }
  }, [isOpen, quickLinks]);

  // Dirty State Detection
  const isDirty = JSON.stringify([...localSelectedIds].sort()) !== JSON.stringify([...initialIds].sort());

  const isSelected = (entity) => localSelectedIds.includes(entity.id);

  const toggleEntity = (entity) => {
    setLocalSelectedIds(prev => {
      if (prev.includes(entity.id)) {
        return prev.filter(id => id !== entity.id);
      }
      return [...prev, entity.id];
    });
  };

  const handleSave = () => {
    const selectedEntities = entities.filter(e => localSelectedIds.includes(e.id));
    updateQuickLinks(selectedEntities);
    
    toast({
      title: 'Success',
      description: `Quick links updated successfully! (${selectedEntities.length} selected)`,
    });
    
    onClose();
  };

  const handleCancel = () => {
    setLocalSelectedIds(initialIds); // Revert changes safely
    onClose();
  };

  const groupedEntities = entities.reduce((acc, entity) => {
    const category = entity?.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(entity);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-gray-900">Manage Quick Links</h2>
              <p className="text-sm text-gray-600 mt-1">
                Select entities to display in your quick links section ({localSelectedIds.length} selected)
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Selected Quick Links */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Selected Quick Links</h3>
                  <span className="text-sm font-medium text-white bg-lavender-primary px-3 py-1 rounded-full">
                    {localSelectedIds.length}
                  </span>
                </div>
                <div className="bg-lavender-lightest rounded-xl p-4 border-2 border-lavender-light min-h-[300px]">
                  {localSelectedIds.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No quick links selected
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {entities.filter(e => localSelectedIds.includes(e.id)).map((entity) => {
                        const IconComponent = entity?.icon;
                        return (
                          <div key={entity.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-lavender-light shadow-sm">
                            {IconComponent && <IconComponent className="w-5 h-5 text-lavender-primary flex-shrink-0" strokeWidth={1.5} />}
                            <span className="text-gray-900 font-medium flex-1">{entity?.name || 'Unnamed'}</span>
                            <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Available Entities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Entities</h3>
                <div className="space-y-6">
                  {Object.keys(groupedEntities).length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No entities available</div>
                  ) : (
                    Object.entries(groupedEntities).map(([category, categoryEntities]) => (
                      <div key={category}>
                        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                          {category} ({categoryEntities.length})
                        </h4>
                        <div className="space-y-2">
                          {categoryEntities.map((entity) => {
                            const IconComponent = entity?.icon;
                            const selected = isSelected(entity);
                            return (
                              <div
                                key={entity.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                  selected ? 'bg-lavender-lightest border-lavender-light shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                }`}
                                onClick={() => toggleEntity(entity)}
                              >
                                <Checkbox checked={selected} onCheckedChange={() => toggleEntity(entity)} className="flex-shrink-0" />
                                {IconComponent && <IconComponent className={`w-5 h-5 flex-shrink-0 ${selected ? 'text-lavender-primary' : 'text-gray-600'}`} strokeWidth={1.5} />}
                                <Label className="text-gray-900 font-medium cursor-pointer flex-1">
                                  {entity?.name || 'Unnamed'}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              {isDirty ? (
                <span className="text-amber-600 font-medium">• Pending changes</span>
              ) : (
                'Quick links help you access frequently used sections quickly'
              )}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel} className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300">
                {isDirty ? 'Cancel' : 'Close'}
              </Button>
              <Button onClick={handleSave} disabled={!isDirty} className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}