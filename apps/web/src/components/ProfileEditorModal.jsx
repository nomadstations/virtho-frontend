import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArchiveUserDialog } from '@/components/ArchiveUserDialog';
import DialogWrapper from '@/components/DialogWrapper';

export function ProfileEditorModal({ isOpen, onClose }) {
  const { currentUser, updateUserProfile, uploadProfilePicture } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    role: '',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        role: currentUser.role || '',
        location: currentUser.location || '',
        website: currentUser.website || '',
        socialLinks: {
          twitter: currentUser.socialLinks?.twitter || '',
          linkedin: currentUser.socialLinks?.linkedin || '',
          github: currentUser.socialLinks?.github || '',
        },
      });
      setPreviewImage(currentUser.avatar || null);
    }
  }, [isOpen, currentUser]);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a JPG, PNG, or WebP image.',
        variant: 'destructive',
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Image must be smaller than 5MB.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

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
      handleFileSelect(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload profile picture if changed
      if (previewImage && previewImage !== currentUser?.avatar) {
        await uploadProfilePicture(previewImage);
      }

      // Update profile data
      await updateUserProfile(formData);

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <>
      <DialogWrapper isOpen={isOpen} onClose={onClose} size="xl">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="py-6 space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-lavender-lighter shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-lavender-primary text-white flex items-center justify-center text-4xl font-bold border-4 border-lavender-lighter shadow-lg">
                    {getInitials(formData.name)}
                  </div>
                )}
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full max-w-md border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-lavender-primary bg-lavender-lightest'
                    : 'border-gray-300 hover:border-lavender-light hover:bg-gray-50'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-lavender-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, or WebP (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Email (Display Only)
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="bio" className="text-gray-700 font-semibold">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900 resize-none"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-gray-700 font-semibold">
                  Role/Title
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="e.g. Developer, Designer"
                  className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-700 font-semibold">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. New York, USA"
                  className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="website" className="text-gray-700 font-semibold">
                  Website/Portfolio
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                  type="url"
                  className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                />
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Social Media Links (Optional)
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="twitter" className="text-gray-600 text-sm">
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      placeholder="@username"
                      className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="text-gray-600 text-sm">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github" className="text-gray-600 text-sm">
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={formData.socialLinks.github}
                      onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                      placeholder="github.com/username"
                      className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Archive Account Section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-900 mb-1">
                    Danger Zone
                  </h4>
                  <p className="text-xs text-red-700 mb-3">
                    Archiving your account will disable access and hide your profile. This action can be reversed by contacting support.
                  </p>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setIsArchiveDialogOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Archive Account
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogWrapper>

      <ArchiveUserDialog
        isOpen={isArchiveDialogOpen}
        onClose={() => setIsArchiveDialogOpen(false)}
        onCloseParent={onClose}
      />
    </>
  );
}