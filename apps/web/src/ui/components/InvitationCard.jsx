import React from 'react';
import { format } from 'date-fns';
import { Mail, Clock, Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InvitationActionsMenu from './InvitationActionsMenu';

const InvitationCard = ({ invitation, invitedByName, onResend, onRevoke, onAccept }) => {
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
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusBadgeClass(invitation.status)}`}>
          {invitation.status}
        </span>
        <InvitationActionsMenu 
          invitation={invitation}
          onResend={onResend}
          onRevoke={onRevoke}
          onAccept={onAccept}
        />
      </div>
      
      <div className="flex items-start gap-3 mb-4 pr-24">
        <div className="w-10 h-10 rounded-full bg-primary-lighter/50 text-primary-dark flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {invitation.email}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 text-sm">
        <div className="flex items-center text-gray-600 gap-2">
          <Shield className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-500 w-20">Role:</span>
          <span className="font-medium text-gray-900">{invitation.role}</span>
        </div>
        <div className="flex items-center text-gray-600 gap-2">
          <User className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-500 w-20">Invited by:</span>
          <span className="truncate">{invitedByName}</span>
        </div>
        <div className="flex items-center text-gray-600 gap-2">
          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-gray-500 w-20">Sent:</span>
          <span>{invitation.sentAt ? format(new Date(invitation.sentAt), 'MMM d, yyyy h:mm a') : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;