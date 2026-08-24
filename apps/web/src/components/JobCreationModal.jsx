import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import '@/styles/QuickActionsModals.css';

const JobCreationModal = ({
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

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="qa-modal-overlay" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.2 }}
            className="qa-modal-container qa-modal-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="qa-modal-header">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Create New Job Posting</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting} className="text-gray-500 hover:text-gray-900" aria-label="Close modal">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="qa-modal-content">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job-title" className="text-sm font-semibold text-gray-700">Job Title <span className="text-red-500">*</span></Label>
                  <Input id="job-title" type="text" placeholder="e.g., Senior Frontend Developer" value={formData.title} onChange={(e) => onInputChange('title', e.target.value)} className={errors.title ? 'border-red-500 text-gray-900' : 'text-gray-900'} disabled={isSubmitting} />
                  {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-company" className="text-sm font-semibold text-gray-700">Company Name <span className="text-red-500">*</span></Label>
                  <Input id="job-company" type="text" placeholder="e.g., TechFlow Solutions" value={formData.company} onChange={(e) => onInputChange('company', e.target.value)} className={errors.company ? 'border-red-500 text-gray-900' : 'text-gray-900'} disabled={isSubmitting} />
                  {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-category" className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></Label>
                    <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.category ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {constants.categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-type" className="text-sm font-semibold text-gray-700">Job Type <span className="text-red-500">*</span></Label>
                    <Select value={formData.type} onValueChange={(value) => onInputChange('type', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.type ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {constants.types.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-experience" className="text-sm font-semibold text-gray-700">Experience Level <span className="text-red-500">*</span></Label>
                    <Select value={formData.experienceLevel} onValueChange={(value) => onInputChange('experienceLevel', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.experienceLevel ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select level" /></SelectTrigger>
                      <SelectContent>
                        {constants.experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experienceLevel && <p className="text-sm text-red-600">{errors.experienceLevel}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-location" className="text-sm font-semibold text-gray-700">Location <span className="text-red-500">*</span></Label>
                    <Select value={formData.location} onValueChange={(value) => onInputChange('location', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.location ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select location" /></SelectTrigger>
                      <SelectContent>
                        {constants.locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-salary" className="text-sm font-semibold text-gray-700">Salary Range</Label>
                  <Input id="job-salary" type="text" placeholder="e.g., $120k - $150k" value={formData.salary} onChange={(e) => onInputChange('salary', e.target.value)} className="text-gray-900" disabled={isSubmitting} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-skills" className="text-sm font-semibold text-gray-700">Required Skills</Label>
                  <Input id="job-skills" type="text" placeholder="e.g., React, TypeScript, Node.js (comma-separated)" value={formData.skills} onChange={(e) => onInputChange('skills', e.target.value)} className="text-gray-900" disabled={isSubmitting} />
                  <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description" className="text-sm font-semibold text-gray-700">Job Description <span className="text-red-500">*</span></Label>
                  <Textarea id="job-description" placeholder="Provide a detailed description of the job role..." value={formData.description} onChange={(e) => onInputChange('description', e.target.value)} rows={4} className={`text-gray-900 resize-none ${errors.description ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                  {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-logo" className="text-sm font-semibold text-gray-700">Company Logo</Label>
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Company logo preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                      <Button type="button" variant="destructive" size="sm" onClick={() => onInputChange('image', '')} className="absolute top-2 right-2" disabled={isSubmitting}>Remove</Button>
                    </div>
                  ) : (
                    <label className="project-creation-image-dropzone cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload company logo</p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 5MB)</p>
                    </label>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="text-gray-700">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 text-white">{isSubmitting ? 'Creating...' : 'Create Job'}</Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobCreationModal;