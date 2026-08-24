import React, { useState, useEffect } from 'react';
import { X, Check, Zap, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ROOT CAUSE & FIX SUMMARY:
 * Issue: Toggles mutated tracking states directly; save buttons lacked true dirty validation.
 * Fix: Isolated `localSelectedIds` state. Enforced strictly enabling/disabling "Save Changes" based on deep `isDirty` array comparison. Implemented strict revert on Cancel.
 */
export function ManageQuickActionsModal({ isOpen, onClose, availableActions, selectedActionIds, onSave, onReset }) {
  const [localSelectedIds, setLocalSelectedIds] = useState([]);
  const [initialIds, setInitialIds] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const ids = selectedActionIds || [];
      setLocalSelectedIds(ids);
      setInitialIds(ids);
    }
  }, [isOpen, selectedActionIds]);

  // Deep array comparison to accurately detect dirty state
  const isDirty = JSON.stringify([...localSelectedIds].sort()) !== JSON.stringify([...initialIds].sort());

  const isSelected = (actionId) => localSelectedIds.includes(actionId);

  const toggleAction = (actionId) => {
    setLocalSelectedIds(prev => 
      prev.includes(actionId) ? prev.filter(id => id !== actionId) : [...prev, actionId]
    );
  };

  const handleSave = () => {
    try {
      const selectedActions = availableActions.filter(action => localSelectedIds.includes(action.id));
      
      if (selectedActions.length === 0) {
        toast({
          title: 'No Actions Selected',
          description: 'Please select at least one quick action.',
          variant: 'destructive',
        });
        return;
      }
      
      onSave(selectedActions);
      
      toast({
        title: 'Quick Actions Updated',
        description: `Successfully updated quick actions (${localSelectedIds.length} selected)`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save quick actions.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    onReset();
    toast({ title: 'Reset to Defaults', description: 'Quick actions have been reset to default settings.' });
    onClose();
  };

  const handleCancel = () => {
    setLocalSelectedIds(initialIds); // Revert changes safely
    onClose();
  };

  if (!availableActions || availableActions.length === 0) return null;

  const groupedActions = availableActions.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {});

  const selectedActions = availableActions.filter(action => localSelectedIds.includes(action.id));

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
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[85vh] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Quick Actions</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Select actions to display on your dashboard ({localSelectedIds.length} selected)
                </p>
              </div>
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
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Selected Actions</h3>
                  <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {localSelectedIds.length}
                  </span>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-100 min-h-[400px]">
                  {localSelectedIds.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm py-12">
                      <Zap className="w-12 h-12 mb-3 opacity-30" />
                      <p>No quick actions selected</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedActions.map((action) => (
                        <div key={action.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
                          <action.iconComponent className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <span className="text-gray-900 font-medium flex-1">{action.label}</span>
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Available Actions</h3>
                  <Button variant="outline" size="sm" onClick={handleReset} className="text-gray-600 hover:text-gray-900">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                  {Object.entries(groupedActions).map(([category, actions]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span>{category}</span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </h4>
                      <div className="space-y-2">
                        {actions.map((action) => {
                          const selected = isSelected(action.id);
                          return (
                            <div
                              key={action.id}
                              className={`quick-action-checkbox flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                selected ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                              }`}
                              onClick={() => toggleAction(action.id)}
                            >
                              <Checkbox checked={selected} onCheckedChange={() => toggleAction(action.id)} className="flex-shrink-0" />
                              <action.iconComponent className={`w-5 h-5 flex-shrink-0 ${selected ? 'text-amber-600' : 'text-gray-600'}`} />
                              <Label className="text-gray-900 font-medium cursor-pointer flex-1">
                                {action.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              {isDirty ? (
                <span className="text-amber-600 font-medium">• Pending changes</span>
              ) : (
                'Quick actions provide one-click access to common tasks'
              )}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel} className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300">
                {isDirty ? 'Cancel' : 'Close'}
              </Button>
              <Button onClick={handleSave} disabled={!isDirty} className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}