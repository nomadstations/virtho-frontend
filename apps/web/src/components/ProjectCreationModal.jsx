import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { REALM_LABELS } from '@/utils/realmLabels';
import '@/styles/QuickActionsModals.css';

const ProjectCreationModal = ({
  isOpen,
  onClose,
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onImageUpload,
  onSubmit,
  constants,
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    AVAILABLE_CATEGORIES,
    AVAILABLE_STATUSES,
    AVAILABLE_TEAMS,
    MAX_TITLE_LENGTH,
    MAX_DESCRIPTION_LENGTH,
  } = constants;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRealmChange = (realmKey, isChecked) => {
    const currentRealms = formData.realms || [];
    const newRealms = isChecked 
      ? [...currentRealms, realmKey]
      : currentRealms.filter(r => r !== realmKey);
    onInputChange('realms', newRealms);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="qa-modal-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-title" 
          />
          <motion.div
            className="qa-modal-container qa-modal-2xl"
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="qa-modal-header">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                Create New Project
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-900" aria-label="Close modal" disabled={isSubmitting}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="qa-modal-content">
              <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
                <div>
                  <Label htmlFor="project-title" className="text-gray-700 font-semibold">
                    Project Title <span className="text-red-500">*</span>
                  </Label>
                  <Input id="project-title" value={formData.title} onChange={(e) => onInputChange('title', e.target.value)} placeholder="Enter project title" maxLength={MAX_TITLE_LENGTH} className={cn("mt-2 text-gray-900", errors.title && "border-red-500 focus-visible:ring-red-500")} disabled={isSubmitting} autoFocus />
                  <div className="flex items-center justify-between mt-1">
                    {errors.title ? <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p> : <span />}
                    <span className={cn("text-xs", formData.title.length >= MAX_TITLE_LENGTH ? "text-red-600 font-semibold" : "text-gray-500")}>{formData.title.length}/{MAX_TITLE_LENGTH}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="project-description" className="text-gray-700 font-semibold">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea id="project-description" value={formData.description} onChange={(e) => onInputChange('description', e.target.value)} placeholder="Describe your project..." maxLength={MAX_DESCRIPTION_LENGTH} rows={4} className={cn("mt-2 resize-none text-gray-900", errors.description && "border-red-500 focus-visible:ring-red-500")} disabled={isSubmitting} />
                  <div className="flex items-center justify-between mt-1">
                    {errors.description ? <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p> : <span />}
                    <span className={cn("text-xs", formData.description.length >= MAX_DESCRIPTION_LENGTH ? "text-red-600 font-semibold" : "text-gray-500")}>{formData.description.length}/{MAX_DESCRIPTION_LENGTH}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">
                    Realms <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(REALM_LABELS).map(([key, label]) => {
                      const isChecked = (formData.realms || []).includes(key);
                      return (
                        <label key={key} className={`flex items-center gap-2 px-3 py-1.5 border rounded-full cursor-pointer transition-colors ${isChecked ? 'bg-purple-50 border-purple-200' : 'bg-white hover:bg-gray-50 border-gray-200'}`}>
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={(e) => handleRealmChange(key, e.target.checked)}
                            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                            disabled={isSubmitting}
                          />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.realms && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.realms}</p>}
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">Project Image</Label>
                  {formData.imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                      <img src={formData.imagePreview} alt="Project preview" className="w-full h-48 object-cover" />
                      <button type="button" onClick={handleRemoveImage} disabled={isSubmitting} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50" aria-label="Remove image">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={cn("project-creation-image-dropzone block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors", isDragging && "border-lavender-primary bg-lavender-lightest border-solid", errors.image ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-50")}>
                      <Upload className="w-8 h-8 text-lavender-primary mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">Click or drag to upload</p>
                      <p className="text-xs text-gray-500">JPG, PNG, WebP (max 5MB)</p>
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/jpg" onChange={handleFileSelect} className="hidden" disabled={isSubmitting} />
                    </div>
                  )}
                  {errors.image && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.image}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-category" className="text-gray-700 font-semibold">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)} disabled={isSubmitting}>
                      <SelectTrigger id="project-category" className={cn("mt-2 text-gray-900", errors.category && "border-red-500")}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_CATEGORIES.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <span className={cn("px-2 py-1 rounded-md text-xs font-semibold", category.color)}>{category.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="project-status" className="text-gray-700 font-semibold">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => onInputChange('status', value)} disabled={isSubmitting}>
                      <SelectTrigger id="project-status" className="mt-2 text-gray-900"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <span className={cn("px-2 py-1 rounded-md text-xs font-semibold", status.color)}>{status.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-team" className="text-gray-700 font-semibold">Assign Team</Label>
                    <Select value={formData.team} onValueChange={(value) => onInputChange('team', value)} disabled={isSubmitting}>
                      <SelectTrigger id="project-team" className="mt-2 text-gray-900"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_TEAMS.map((team) => (
                          <SelectItem key={team.value} value={team.value}>{team.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project-date" className="text-gray-700 font-semibold">Creation Date</Label>
                    <Input id="project-date" type="date" value={formData.createdDate} disabled className="mt-2 bg-gray-100 text-gray-600 cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="w-full sm:w-auto">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-lavender-primary hover:bg-lavender-dark text-white">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : 'Create Project'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectCreationModal;