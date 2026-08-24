import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import '@/styles/QuickActionsModals.css';

const CourseCreationModal = ({
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
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Create New Course</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting} className="text-gray-500 hover:text-gray-900" aria-label="Close modal">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="qa-modal-content">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="course-title" className="text-sm font-semibold text-gray-700">Course Title <span className="text-red-500">*</span></Label>
                  <Input id="course-title" type="text" placeholder="e.g., Complete Web Development Bootcamp" value={formData.title} onChange={(e) => onInputChange('title', e.target.value)} className={errors.title ? 'border-red-500 text-gray-900' : 'text-gray-900'} disabled={isSubmitting} />
                  {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-category" className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></Label>
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
                    <Label htmlFor="course-level" className="text-sm font-semibold text-gray-700">Difficulty Level <span className="text-red-500">*</span></Label>
                    <Select value={formData.level} onValueChange={(value) => onInputChange('level', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.level ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select level" /></SelectTrigger>
                      <SelectContent>
                        {constants.levels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.level && <p className="text-sm text-red-600">{errors.level}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-duration" className="text-sm font-semibold text-gray-700">Duration <span className="text-red-500">*</span></Label>
                    <Input id="course-duration" type="text" placeholder="e.g., 40 hours" value={formData.duration} onChange={(e) => onInputChange('duration', e.target.value)} className={errors.duration ? 'border-red-500 text-gray-900' : 'text-gray-900'} disabled={isSubmitting} />
                    {errors.duration && <p className="text-sm text-red-600">{errors.duration}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-price" className="text-sm font-semibold text-gray-700">Price Type <span className="text-red-500">*</span></Label>
                    <Select value={formData.price} onValueChange={(value) => onInputChange('price', value)} disabled={isSubmitting}>
                      <SelectTrigger className={errors.price ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select price type" /></SelectTrigger>
                      <SelectContent>
                        {constants.priceTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-instructor" className="text-sm font-semibold text-gray-700">Instructor Name <span className="text-red-500">*</span></Label>
                  <Input id="course-instructor" type="text" placeholder="e.g., Dr. Angela Yu" value={formData.instructor} onChange={(e) => onInputChange('instructor', e.target.value)} className={errors.instructor ? 'border-red-500 text-gray-900' : 'text-gray-900'} disabled={isSubmitting} />
                  {errors.instructor && <p className="text-sm text-red-600">{errors.instructor}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-description" className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></Label>
                  <Textarea id="course-description" placeholder="Provide a detailed description of the course..." value={formData.description} onChange={(e) => onInputChange('description', e.target.value)} rows={4} className={`text-gray-900 resize-none ${errors.description ? 'border-red-500' : ''}`} disabled={isSubmitting} />
                  {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-image" className="text-sm font-semibold text-gray-700">Course Image</Label>
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Course preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                      <Button type="button" variant="destructive" size="sm" onClick={() => onInputChange('image', '')} className="absolute top-2 right-2" disabled={isSubmitting}>Remove</Button>
                    </div>
                  ) : (
                    <label className="project-creation-image-dropzone cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload course image</p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 5MB)</p>
                    </label>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="text-gray-700">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 text-white">{isSubmitting ? 'Creating...' : 'Create Course'}</Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CourseCreationModal;