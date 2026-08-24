import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Archive, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DialogWrapper from '@/components/DialogWrapper';

export function ArchiveUserDialog({ isOpen, onClose, onCloseParent }) {
  const [isArchiving, setIsArchiving] = useState(false);
  const { archiveUserAccount } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleArchiveAccount = async () => {
    setIsArchiving(true);

    try {
      await archiveUserAccount();

      toast({
        title: 'Account Archived',
        description: 'Your account has been successfully archived. Contact support to restore it.',
      });

      // Close dialogs and navigate to login
      onClose();
      if (onCloseParent) onCloseParent();
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Archive Failed',
        description: error.message || 'Failed to archive account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <DialogWrapper isOpen={isOpen} onClose={onClose} size="sm" nested={true}>
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Archive Account
      </h2>
      <p className="text-gray-600 text-center mb-4">
        This action will disable your account and hide your profile from other users.
      </p>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
          <Archive className="w-4 h-4" />
          Important Information
        </h3>
        <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
          <li>Your account will be immediately disabled</li>
          <li>Your profile will be hidden from public view</li>
          <li>You will be logged out automatically</li>
          <li>Contact support to restore your account</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isArchiving}
          className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleArchiveAccount}
          disabled={isArchiving}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isArchiving ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Archiving...
            </>
          ) : (
            <>
              <Archive className="w-4 h-4 mr-2" />
              Archive Account
            </>
          )}
        </Button>
      </div>
    </DialogWrapper>
  );
}