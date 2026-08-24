import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploadField from '@/components/ImageUploadField';
import { useProjectForm } from '@/hooks/useProjectForm';
import { CATEGORY_OPTIONS, STATUS_OPTIONS, VALIDATION_RULES } from '@/constants/projectConstants';

export default function EnhancedProjectForm({ initialData = {} }) {
  const {
    formData,
    errors,
    isSubmitting,
    teams,
    isLoadingTeams,
    handleFieldChange,
    handleImageChange,
    handleSubmit,
    handleCancel,
  } = useProjectForm(initialData);

  const titleCharsRemaining = VALIDATION_RULES.title.maxLength - formData.title.length;
  const descCharsRemaining = VALIDATION_RULES.description.maxLength - formData.description.length;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getCategoryOption = (value) => {
    return CATEGORY_OPTIONS.find(opt => opt.value === value);
  };

  const getStatusOption = (value) => {
    return STATUS_OPTIONS.find(opt => opt.value === value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image Upload */}
        <div className="space-y-4">
          <div>
            <Label className="text-gray-900 font-semibold mb-2 block">
              Project Image
              <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
            </Label>
            <ImageUploadField
              value={formData.image}
              onChange={handleImageChange}
              error={errors.image}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="space-y-5">
          {/* Project Title */}
          <div>
            <Label htmlFor="title" className="text-gray-900 font-semibold mb-2 block">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter project title"
              className={`text-gray-900 ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
              disabled={isSubmitting}
              maxLength={VALIDATION_RULES.title.maxLength}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.title ? (
                <p className="text-sm text-red-600">{errors.title}</p>
              ) : (
                <p className="text-xs text-gray-500">
                  {VALIDATION_RULES.title.minLength}-{VALIDATION_RULES.title.maxLength} characters
                </p>
              )}
              <p
                className={`text-xs ${
                  titleCharsRemaining < 20 ? 'text-amber-600' : 'text-gray-500'
                }`}
              >
                {titleCharsRemaining} chars remaining
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-900 font-semibold mb-2 block">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe your project in detail..."
              rows={5}
              className={`resize-none text-gray-900 ${
                errors.description ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              disabled={isSubmitting}
              maxLength={VALIDATION_RULES.description.maxLength}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.description ? (
                <p className="text-sm text-red-600">{errors.description}</p>
              ) : (
                <p className="text-xs text-gray-500">
                  {VALIDATION_RULES.description.minLength}-{VALIDATION_RULES.description.maxLength}{' '}
                  characters
                </p>
              )}
              <p
                className={`text-xs ${
                  descCharsRemaining < 50 ? 'text-amber-600' : 'text-gray-500'
                }`}
              >
                {descCharsRemaining} chars remaining
              </p>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-gray-900 font-semibold mb-2 block">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleFieldChange('category', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={`text-gray-900 ${errors.category ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder="Select a category">
                  {formData.category && (
                    <div className="flex items-center gap-2">
                      {getCategoryOption(formData.category)?.icon &&
                        React.createElement(getCategoryOption(formData.category).icon, {
                          className: 'w-4 h-4',
                        })}
                      <span>{getCategoryOption(formData.category)?.label}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-gray-900 font-semibold mb-2 block">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleFieldChange('status', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={`text-gray-900 ${errors.status ? 'border-red-500' : ''}`}
              >
                <SelectValue>
                  {formData.status && (
                    <div className="flex items-center gap-2">
                      <span>{getStatusOption(formData.status)?.icon}</span>
                      <span>{getStatusOption(formData.status)?.label}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded border ${option.color}`}>
                        {option.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
          </div>

          {/* Team */}
          <div>
            <Label htmlFor="team" className="text-gray-900 font-semibold mb-2 block">
              Assign Team
              <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
            </Label>
            <Select
              value={formData.team}
              onValueChange={(value) => handleFieldChange('team', value)}
              disabled={isSubmitting || isLoadingTeams}
            >
              <SelectTrigger className="text-gray-900">
                <SelectValue placeholder={isLoadingTeams ? 'Loading teams...' : 'Select a team'} />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{team.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{team.members} members</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.team && <p className="text-sm text-red-600 mt-1">{errors.team}</p>}
          </div>

          {/* Creation Date (Read-only) */}
          <div>
            <Label htmlFor="createdAt" className="text-gray-900 font-semibold mb-2 block">
              Creation Date
            </Label>
            <div className="relative">
              <Input
                id="createdAt"
                value={formatDate(new Date())}
                readOnly
                disabled
                className="bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-lavender-primary hover:bg-lavender-dark text-white h-12 font-semibold"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Creating Project...
            </>
          ) : (
            'Create Project'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1 h-12 font-medium"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}