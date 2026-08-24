import React from 'react';
import { MoreHorizontal, RefreshCw, Ban, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const InvitationActionsMenu = ({ invitation, onResend, onRevoke, onAccept }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        
        {(invitation.status === 'pending' || invitation.status === 'expired') && (
          <DropdownMenuItem onClick={() => onResend(invitation.id)} className="cursor-pointer">
            <RefreshCw className="mr-2 h-4 w-4 text-primary" />
            <span>Resend Invitation</span>
          </DropdownMenuItem>
        )}
        
        {(invitation.status === 'pending' || invitation.status === 'accepted') && (
          <DropdownMenuItem onClick={() => onRevoke(invitation.id)} className="cursor-pointer text-destructive focus:text-destructive">
            <Ban className="mr-2 h-4 w-4" />
            <span>Revoke Access</span>
          </DropdownMenuItem>
        )}

        {invitation.status === 'pending' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAccept(invitation)} className="cursor-pointer text-success focus:text-success">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Simulate Accept (Demo)</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvitationActionsMenu;