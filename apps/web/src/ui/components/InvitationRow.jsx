import React from 'react';
import { format } from 'date-fns';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InvitationActionsMenu from './InvitationActionsMenu';

const InvitationRow = ({ invitation, invitedByName, onResend, onRevoke, onAccept }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending border';
      case 'accepted': return 'badge-accepted border';
      case 'expired': return 'badge-expired border';
      case 'revoked': return 'badge-revoked border';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group">
      
      <div className="col-span-12 md:col-span-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-lighter/50 text-primary-dark flex items-center justify-center shrink-0">
          <Mail className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {invitation.email}
          </p>
        </div>
      </div>

      <div className="hidden md:block md:col-span-2">
        <Badge variant="outline" className="bg-white shadow-sm font-normal">
          {invitation.role}
        </Badge>
      </div>

      <div className="hidden md:block md:col-span-2">
        <p className="text-sm text-gray-600 truncate" title={invitedByName}>
          {invitedByName}
        </p>
      </div>

      <div className="hidden md:block md:col-span-2">
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {invitation.sentAt ? format(new Date(invitation.sentAt), 'MMM d, yyyy') : '-'}
        </p>
      </div>

      <div className="col-span-10 md:col-span-1 flex items-center justify-between md:justify-start">
        <div className="md:hidden text-xs text-gray-500 flex items-center gap-2">
          <span>{invitation.role}</span> • 
          <span>{invitation.sentAt ? format(new Date(invitation.sentAt), 'MMM d') : '-'}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusBadgeClass(invitation.status)}`}>
          {invitation.status}
        </span>
      </div>

      <div className="col-span-2 md:col-span-1 flex justify-end">
        <InvitationActionsMenu 
          invitation={invitation}
          onResend={onResend}
          onRevoke={onRevoke}
          onAccept={onAccept}
        />
      </div>

    </div>
  );
};

export default InvitationRow;