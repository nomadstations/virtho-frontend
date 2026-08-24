import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User as UserIcon, ListChecks } from 'lucide-react';
import { usePeople } from '@/hooks/usePeople';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import UserProfileHeader from './UserProfileHeader';
import UserProfileForm from './UserProfileForm';
import UserProfileInfo from './UserProfileInfo';
import UserProfileActivity from './UserProfileActivity';
import OnboardingChecklist from './OnboardingChecklist';

const UserProfile = ({ isOpen, onClose, userId }) => {
  const { users, roles, groups, activityLog, updateUser, verifyUser, logActivity } = usePeople();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const user = users.find(u => u.id === userId);

  // Initialize form data when user changes
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        groups: [...user.groups]
      });
      setIsDirty(false);
      setActiveTab('profile'); // Reset tab on open
    }
  }, [user, isOpen]);

  // Check for dirty state
  useEffect(() => {
    if (!user || !isOpen) return;
    
    const hasChanges = 
      formData.firstName !== user.firstName ||
      formData.lastName !== user.lastName ||
      formData.email !== user.email ||
      formData.role !== user.role ||
      formData.status !== user.status ||
      JSON.stringify(formData.groups?.sort()) !== JSON.stringify([...user.groups].sort());

    setIsDirty(hasChanges);
  }, [formData, user, isOpen]);

  const handleSave = async () => {
    if (!isDirty || !user) return;
    setIsSaving(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    updateUser(userId, formData);
    setIsDirty(false);
    setIsSaving(false);
    
    toast({
      title: "Profile Updated",
      description: "User profile has been successfully saved.",
    });
    
    onClose();
  };

  const handleCancel = () => {
    if (isDirty) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        return;
      }
    }
    onClose();
  };

  const handleVerify = (id) => {
    verifyUser(id);
    logActivity('system', 'user_verified', 'user', id);
    toast({
      title: "User Verified",
      description: "User has been successfully verified.",
      variant: "success",
    });
  };

  if (!isOpen) return null;

  const isAdmin = currentUser?.role === 'Admin' || true; // Mocking true for demo

  return (
    <AnimatePresence>
      {isOpen && user && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[600px] h-[100dvh] bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
              <Button variant="ghost" size="icon" onClick={handleCancel} className="text-gray-500 hover:text-gray-900">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6 gap-6 bg-white">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'profile' 
                    ? 'border-primary text-primary-darkest' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('onboarding')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'onboarding' 
                    ? 'border-primary text-primary-darkest' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ListChecks className="w-4 h-4" />
                Onboarding
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
              {activeTab === 'profile' ? (
                <div className="space-y-8">
                  <UserProfileHeader user={user} onVerify={handleVerify} />
                  
                  <UserProfileForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    roles={roles} 
                    groups={groups} 
                  />
                  
                  <div className="h-px bg-gray-200 w-full" />
                  
                  <UserProfileInfo user={user} />
                  
                  <div className="h-px bg-gray-200 w-full" />
                  
                  <UserProfileActivity activityLog={activityLog} userId={user.id} />
                </div>
              ) : (
                <OnboardingChecklist user={user} isAdmin={isAdmin} />
              )}
            </div>

            {/* Sticky Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                {isDirty && <span className="text-warning-foreground font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warning"></span>Unsaved changes</span>}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleCancel}>
                  Close
                </Button>
                {activeTab === 'profile' && (
                  <Button 
                    onClick={handleSave} 
                    disabled={!isDirty || isSaving}
                    className="bg-primary text-primary-foreground hover:bg-primary-dark"
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;