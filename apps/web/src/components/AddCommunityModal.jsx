import React from 'react';
import { X, Upload, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddCommunityModal = ({
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
  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-lg">
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Create New Community</h2>
        </div>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Community Name */}
          <div className="space-y-2">
            <Label htmlFor="community-name" className="text-sm font-semibold text-gray-700">
              Community Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="community-name"
              type="text"
              placeholder="e.g., Tech Innovators Network"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className={`text-gray-900 ${errors.name ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="community-category" className="text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => onInputChange('category', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className={`text-gray-900 ${errors.category ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {constants.categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="community-type" className="text-sm font-semibold text-gray-700">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => onInputChange('type', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className={`text-gray-900 ${errors.type ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {constants.types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="community-location" className="text-sm font-semibold text-gray-700">
              Location <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.location}
              onValueChange={(value) => onInputChange('location', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`text-gray-900 ${errors.location ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {constants.locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Contact Email & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="community-email" className="text-sm font-semibold text-gray-700">
                Contact Email
              </Label>
              <Input
                id="community-email"
                type="email"
                placeholder="contact@example.com"
                value={formData.contactEmail}
                onChange={(e) => onInputChange('contactEmail', e.target.value)}
                className="text-gray-900"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="community-website" className="text-sm font-semibold text-gray-700">
                Website
              </Label>
              <Input
                id="community-website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => onInputChange('website', e.target.value)}
                className="text-gray-900"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Member Count */}
          <div className="space-y-2">
            <Label htmlFor="community-members" className="text-sm font-semibold text-gray-700">
              Member Count
            </Label>
            <Input
              id="community-members"
              type="number"
              placeholder="e.g., 250"
              value={formData.memberCount}
              onChange={(e) => onInputChange('memberCount', e.target.value)}
              className="text-gray-900"
              disabled={isSubmitting}
              min="0"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="community-description" className="text-sm font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="community-description"
              placeholder="Provide a detailed description of the community..."
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              rows={4}
              className={`text-gray-900 resize-none ${errors.description ? 'border-red-500' : ''}`}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Community Logo */}
          <div className="space-y-2">
            <Label htmlFor="community-logo" className="text-sm font-semibold text-gray-700">
              Community Logo
            </Label>
            {formData.logo ? (
              <div className="relative">
                <img
                  src={formData.logo}
                  alt="Community logo preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onInputChange('logo', '')}
                  className="absolute top-2 right-2"
                  disabled={isSubmitting}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <label className="project-creation-image-dropzone cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload community logo
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or WEBP (max. 5MB)
                </p>
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Community'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommunityModal;