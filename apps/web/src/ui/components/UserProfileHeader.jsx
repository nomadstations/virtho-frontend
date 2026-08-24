import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import VerifyUserDialog from './VerifyUserDialog';

const UserProfileHeader = ({ user, onVerify }) => {
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/15 text-success-foreground border-success/30';
      case 'inactive': return 'bg-muted text-muted-foreground border-border';
      case 'pending': return 'bg-warning/20 text-warning-foreground border-warning/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleVerifyConfirm = () => {
    onVerify(user.id);
    setIsVerifyDialogOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-100">
      <div className="w-20 h-20 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center text-2xl font-bold shadow-sm shrink-0 border border-primary-light/30">
        {user.avatarInitials}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </h2>
          {user.verified ? (
            <Badge variant="outline" className="bg-success/15 text-success-foreground border-success/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground border-border flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Unverified
            </Badge>
          )}
        </div>
        
        <p className="text-gray-500 mb-3">{user.email}</p>
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-white">
            {user.role}
          </Badge>
          <Badge variant="outline" className={`capitalize ${getStatusColor(user.status)}`}>
            {user.status}
          </Badge>
        </div>
      </div>

      {!user.verified && (
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <Button 
            variant="outline" 
            className="w-full md:w-auto text-success-foreground border-success/30 hover:bg-success/10"
            onClick={() => setIsVerifyDialogOpen(true)}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Verify User
          </Button>
        </div>
      )}

      <VerifyUserDialog 
        isOpen={isVerifyDialogOpen}
        onClose={() => setIsVerifyDialogOpen(false)}
        onConfirm={handleVerifyConfirm}
        userName={`${user.firstName} ${user.lastName}`}
      />
    </div>
  );
};

export default UserProfileHeader;