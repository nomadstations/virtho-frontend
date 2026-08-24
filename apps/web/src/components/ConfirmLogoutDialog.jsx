import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DialogWrapper from '@/components/DialogWrapper';

export function ConfirmLogoutDialog({ isOpen, onClose }) {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Clear localStorage and sessionStorage
    const virthoKeys = Object.keys(localStorage).filter(key => key.startsWith('virtho_'));
    virthoKeys.forEach(key => localStorage.removeItem(key));
    sessionStorage.clear();

    // Call logout from context
    logout();

    // Show success message
    toast({
      title: 'Logged Out Successfully',
      description: 'You have been safely logged out of your account.',
    });

    // Close dialog and navigate to login
    onClose();
    navigate('/login');
  };

  return (
    <DialogWrapper isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-amber-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Confirm Logout
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to logout? You will need to sign in again to access your account.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmLogout}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Confirm Logout
        </Button>
      </div>
    </DialogWrapper>
  );
}