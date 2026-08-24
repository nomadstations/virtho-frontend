import React from 'react';
import { Mail, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const EmailPreviewModal = ({ isOpen, onClose, invitationData }) => {
  if (!invitationData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-gray-50 border-gray-200">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-white flex flex-row items-center justify-between sticky top-0 z-10">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Mail className="w-5 h-5 text-primary" />
            Invitation Email Preview
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 md:p-8 bg-gray-50">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-md mx-auto">
            {/* Fake Email Header */}
            <div className="bg-primary/5 px-6 py-5 border-b border-primary/10 flex justify-center">
              <div className="font-bold text-xl tracking-tight text-primary-darkest">
                Virtho Foundation
              </div>
            </div>
            
            {/* Email Body */}
            <div className="p-6 md:p-8 space-y-5 text-gray-700">
              <p className="font-medium text-lg text-gray-900">
                Hi {invitationData.email},
              </p>
              
              <p>
                You've been invited to join <strong>Virtho Foundation</strong>.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm space-y-2">
                <p>
                  <span className="text-gray-500 font-medium w-20 inline-block">Role:</span> 
                  <span className="font-semibold text-gray-900">{invitationData.role}</span>
                </p>
                {invitationData.groups && invitationData.groups.length > 0 && (
                  <p>
                    <span className="text-gray-500 font-medium w-20 inline-block">Groups:</span> 
                    <span className="font-medium">{invitationData.groups.join(', ')}</span>
                  </p>
                )}
              </div>
              
              {invitationData.message && (
                <div className="pl-4 border-l-4 border-primary/30 italic text-gray-600 my-4">
                  "{invitationData.message}"
                </div>
              )}
              
              <div className="pt-4 pb-2">
                <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground h-11" disabled>
                  Accept Invitation
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  (Link expires in 7 days)
                </p>
              </div>
            </div>
            
            {/* Fake Email Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
              <p>This is a preview of the invitation email.</p>
              <p className="mt-1">© {new Date().getFullYear()} Virtho Foundation</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end">
          <Button onClick={onClose} variant="outline" className="min-w-[100px]">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailPreviewModal;