import React from 'react';
import { Mail } from 'lucide-react';
import InvitationRow from './InvitationRow';
import InvitationCard from './InvitationCard';

const InvitationsTable = ({ invitations, users, onResend, onRevoke, onAccept }) => {
  if (invitations.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No invitations found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
          Send your first invitation using the form above to add members to the platform.
        </p>
      </div>
    );
  }

  const getInviterName = (invitedById) => {
    if (!invitedById || invitedById === 'system') return 'System';
    const user = users.find(u => u.id === invitedById);
    return user ? `${user.firstName} ${user.lastName}` : invitedById;
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50/80 border-b border-gray-200 text-sm font-semibold text-gray-600">
          <div className="col-span-4">Email Address</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Invited By</div>
          <div className="col-span-2">Sent Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {invitations.map(invitation => (
            <InvitationRow 
              key={invitation.id}
              invitation={invitation}
              invitedByName={getInviterName(invitation.invitedBy)}
              onResend={onResend}
              onRevoke={onRevoke}
              onAccept={onAccept}
            />
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {invitations.map(invitation => (
          <InvitationCard 
            key={invitation.id}
            invitation={invitation}
            invitedByName={getInviterName(invitation.invitedBy)}
            onResend={onResend}
            onRevoke={onRevoke}
            onAccept={onAccept}
          />
        ))}
      </div>
    </>
  );
};

export default InvitationsTable;