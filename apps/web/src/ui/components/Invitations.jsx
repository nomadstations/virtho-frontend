import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '@/hooks/usePeople';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import InviteUserForm from './InviteUserForm';
import InvitationFilters from './InvitationFilters';
import InvitationsTable from './InvitationsTable';
import EmailPreviewModal from './EmailPreviewModal';

const Invitations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const { 
    invitations, 
    roles, 
    groups, 
    users, 
    addInvitation, 
    updateInvitationStatus, 
    addUser,
    logActivity 
  } = usePeople();

  const [filter, setFilter] = useState('all');
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Derived counts for filters
  const counts = useMemo(() => {
    return {
      all: invitations.length,
      pending: invitations.filter(i => i.status === 'pending').length,
      accepted: invitations.filter(i => i.status === 'accepted').length,
      expired: invitations.filter(i => i.status === 'expired').length,
      revoked: invitations.filter(i => i.status === 'revoked').length,
    };
  }, [invitations]);

  // Filtered invitations
  const filteredInvitations = useMemo(() => {
    if (filter === 'all') return invitations;
    return invitations.filter(i => i.status === filter);
  }, [invitations, filter]);

  // Handlers
  const handleSendInvitation = (data) => {
    addInvitation(data, currentUser?.id || 'system');
    setPreviewData(data);
    setIsPreviewOpen(true);
  };

  const handleResend = (invitationId) => {
    // In a real app, this would re-trigger the email API. Here we just update the timestamp.
    // Technically usePeople updateInvitationStatus doesn't let us update arbitrary fields,
    // but we can log the activity and show a success message.
    logActivity(currentUser?.id || 'system', 'invitation_resent', 'invitation', invitationId);
    
    toast({
      title: "Invitation Resent",
      description: "A new email has been sent to the user.",
      variant: "success",
    });
  };

  const handleRevoke = (invitationId) => {
    if (window.confirm("Are you sure you want to revoke this invitation? The user will no longer be able to use the registration link.")) {
      updateInvitationStatus(invitationId, 'revoked', currentUser?.id || 'system');
      toast({
        title: "Invitation Revoked",
        description: "The invitation link has been disabled.",
        variant: "destructive"
      });
    }
  };

  const handleSimulateAccept = (invitation) => {
    // Demo functionality: Convert pending invite to accepted, create user account
    updateInvitationStatus(invitation.id, 'accepted', currentUser?.id || 'system');
    
    // Create new user based on invitation
    const emailParts = invitation.email.split('@');
    let firstName = emailParts[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).replace(/[^a-zA-Z0-9]/g, ' ');

    addUser({
      email: invitation.email,
      firstName: firstName,
      lastName: 'User',
      role: invitation.role,
      groups: invitation.groups || [],
      status: 'pending',
      verified: false,
      avatarInitials: firstName.substring(0, 2).toUpperCase()
    }, currentUser?.id || 'system');

    toast({
      title: "Simulated Accept Success",
      description: `${invitation.email} is now a registered user.`,
      variant: "success"
    });
  };

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-5rem)] pb-12 relative overflow-hidden">
      <Helmet>
        <title>Invitations - Virtho Foundation</title>
        <meta name="description" content="Send and manage user invitations." />
      </Helmet>

      <div className="bg-white border-b border-gray-200 pt-6 pb-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 -ml-2 text-gray-500 hover:text-gray-900"
            onClick={() => navigate('/users')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to People
          </Button>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Invitations</h1>
            <p className="text-gray-500 mt-1">Send and track email invitations for new team members</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <InviteUserForm 
          roles={roles} 
          groups={groups} 
          onSubmit={handleSendInvitation}
          currentUserId={currentUser?.id || 'system'}
        />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Invitation History</h2>
            <InvitationFilters 
              currentFilter={filter} 
              onFilterChange={setFilter} 
              counts={counts}
            />
          </div>

          <InvitationsTable 
            invitations={filteredInvitations}
            users={users}
            onResend={handleResend}
            onRevoke={handleRevoke}
            onAccept={handleSimulateAccept}
          />
        </div>
      </div>

      <EmailPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        invitationData={previewData}
      />
    </div>
  );
};

export default Invitations;