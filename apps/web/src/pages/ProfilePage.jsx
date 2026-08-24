import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Upload, Trash2, AlertTriangle, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, uploadProfilePicture, archiveUserAccount } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    role: '',
    location: '',
    website: '',
    phone: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      const nameParts = (currentUser.name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setFormData({
        firstName,
        lastName,
        email: currentUser.email || '',
        phone: currentUser.phone || '',
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
  }, [currentUser]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const getInitials = (firstName, lastName) => {
    const first = firstName?.[0]?.toUpperCase() || '';
    const last = lastName?.[0]?.toUpperCase() || '';
    return first + last || 'U';
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;

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
      setHasUnsavedChanges(true);
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
    setHasUnsavedChanges(true);
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'First name is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (previewImage && previewImage !== currentUser?.avatar) {
        await uploadProfilePicture(previewImage);
      }

      const profileData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };
      await updateUserProfile(profileData);

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });

      setHasUnsavedChanges(false);
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

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setHasUnsavedChanges(true);
  };

  const handleArchiveAccount = async () => {
    setIsLoading(true);
    try {
      await archiveUserAccount();
      toast({
        title: 'Account Archived',
        description: 'Your account has been successfully archived.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Archive Failed',
        description: error.message || 'Failed to archive account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setShowArchiveConfirm(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile - Virtho</title>
        <meta name="description" content="Edit your profile information and settings" />
      </Helmet>

      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <DashboardBreadcrumb />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <p className="text-gray-600">Manage your personal information and account settings</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 font-semibold">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                          className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 font-semibold">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                          className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-semibold">
                        Email (Read Only)
                      </Label>
                      <Input
                        id="email"
                        value={formData.email}
                        disabled
                        className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1 border-gray-300 focus:border-lavender-primary focus:ring-lavender-primary text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-gray-700 font-semibold">
                        Bio / Description
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="role" className="text-gray-700 font-semibold">
                          Role / Title
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
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-gray-700 font-semibold">
                        Website / Portfolio
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
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="twitter" className="text-gray-700 font-semibold">
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
                      <Label htmlFor="linkedin" className="text-gray-700 font-semibold">
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
                      <Label htmlFor="github" className="text-gray-700 font-semibold">
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

                <div className="bg-white rounded-xl border border-red-200 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-900 mb-1">Danger Zone</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Archiving your account will disable access and hide your profile. This action can be reversed by contacting support.
                      </p>
                      {!showArchiveConfirm ? (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => setShowArchiveConfirm(true)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Archive Account
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-red-900">
                            Are you absolutely sure? This action will immediately disable your account.
                          </p>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setShowArchiveConfirm(false)}
                              className="border-gray-300"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleArchiveAccount}
                              disabled={isLoading}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Yes, Archive My Account
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h2>
                  
                  <div className="flex flex-col items-center mb-6">
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
                          {getInitials(formData.firstName, formData.lastName)}
                        </div>
                      )}
                    </div>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                        isDragging
                          ? 'border-lavender-primary bg-lavender-lightest'
                          : 'border-gray-300 hover:border-lavender-light hover:bg-gray-50'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-6 h-6 text-lavender-primary mx-auto mb-2" />
                      <p className="text-xs text-gray-600 mb-1">
                        Click or drag to upload
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, WebP (max 5MB)
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

                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    {formData.role && (
                      <p className="text-sm text-gray-600">{formData.role}</p>
                    )}
                    {formData.location && (
                      <p className="text-sm text-gray-500">{formData.location}</p>
                    )}
                  </div>

                  {formData.bio && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700 line-clamp-4">{formData.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg mt-8 -mx-4 md:-mx-8 px-4 md:px-8 py-4 z-10">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {hasUnsavedChanges && (
                    <span className="text-amber-600 font-medium">• Unsaved changes</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !hasUnsavedChanges}
                    className="bg-lavender-primary hover:bg-lavender-dark text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
}