import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import LanguagePairCard from './LanguagePairCard';

const DEFAULT_PAIR = {
  source: '',
  target: '',
  basePrice: 0,
  priceUnit: 'Per Word',
  vat: false,
  vatPercentage: 0,
  category: 'General'
};

export default function ServiceFormModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    languagePairs: []
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: '',
          description: '',
          status: 'Active',
          languagePairs: [{ ...DEFAULT_PAIR, id: `temp-${Date.now()}` }]
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Service name is required";
    
    if (formData.languagePairs.length === 0) {
      newErrors.general = "At least one language pair is required";
    }

    const pairErrors = {};
    let hasPairErrors = false;

    formData.languagePairs.forEach((pair, idx) => {
      const err = {};
      if (!pair.source) err.source = "Required";
      if (!pair.target) err.target = "Required";
      if (pair.source && pair.target && pair.source === pair.target) {
        err.target = "Must differ from source";
      }
      if (pair.basePrice <= 0) err.basePrice = "Must be > 0";
      
      if (Object.keys(err).length > 0) {
        pairErrors[idx] = err;
        hasPairErrors = true;
      }
    });

    if (hasPairErrors) newErrors.pairs = pairErrors;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...formData.languagePairs];
    updatedPairs[index] = { ...updatedPairs[index], [field]: value };
    setFormData({ ...formData, languagePairs: updatedPairs });
  };

  const addPair = () => {
    setFormData({
      ...formData,
      languagePairs: [...formData.languagePairs, { ...DEFAULT_PAIR, id: `temp-${Date.now()}` }]
    });
  };

  const removePair = (index) => {
    const updatedPairs = formData.languagePairs.filter((_, idx) => idx !== index);
    setFormData({ ...formData, languagePairs: updatedPairs });
  };

  return (
    <div className="modal-backdrop flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-card w-full max-w-3xl max-h-[90vh] rounded-xl shadow-xl flex flex-col relative overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl font-bold text-foreground">
            {initialData ? 'Edit Service' : 'Create New Service'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name" className="text-foreground font-semibold">Service Name *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`text-foreground ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="e.g. Certified Legal Translation"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-foreground font-semibold">Description</Label>
                <textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
                  placeholder="Describe this service offering..."
                />
              </div>

              <div className="flex items-center space-x-3 bg-muted/40 p-4 rounded-lg border border-border md:col-span-2">
                <Switch 
                  id="status-toggle"
                  checked={formData.status === 'Active'}
                  onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'Active' : 'Inactive'})}
                />
                <div>
                  <Label htmlFor="status-toggle" className="text-foreground font-semibold cursor-pointer">
                    Service Status: <span className={formData.status === 'Active' ? 'text-success' : 'text-muted-foreground'}>{formData.status}</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">Inactive services will not be visible to clients.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-foreground">Language Pairs</h3>
                <Button type="button" variant="outline" size="sm" onClick={addPair} className="bg-primary/5 text-primary hover:bg-primary/10 border-primary/20">
                  <Plus className="w-4 h-4 mr-1" /> Add Language Pair
                </Button>
              </div>
              
              {errors.general && <p className="text-sm text-destructive p-2 bg-destructive/10 rounded">{errors.general}</p>}

              <AnimatePresence>
                {formData.languagePairs.map((pair, index) => (
                  <motion.div
                    key={pair.id || index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LanguagePairCard 
                      pair={pair} 
                      index={index} 
                      onChange={handlePairChange}
                      onRemove={removePair}
                      errors={errors.pairs?.[index]}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {formData.languagePairs.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                  No language pairs configured. Click the button above to add one.
                </div>
              )}
            </div>

          </form>
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="text-foreground">
            Cancel
          </Button>
          <Button type="submit" form="service-form" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            {initialData ? 'Save Changes' : 'Create Service'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}