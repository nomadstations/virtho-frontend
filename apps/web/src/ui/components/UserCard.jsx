import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import UserActionsMenu from './UserActionsMenu';
import { format } from 'date-fns';

const UserCard = ({ user, groups, onVerify, onDeactivate, onReactivate, onViewProfile }) => {
  const userGroups = user.groups.map(gId => {
    const group = groups.find(g => g.id === gId);
    return group ? group.name : gId;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/15 text-success-foreground border-success/30';
      case 'inactive': return 'bg-muted text-muted-foreground border-border';
      case 'pending': return 'bg-warning/20 text-warning-foreground border-warning/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm relative">
      <div className="absolute top-4 right-4">
        <UserActionsMenu 
          user={user} 
          onVerify={onVerify}
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
          onViewProfile={onViewProfile}
        />
      </div>
      
      <div className="flex items-start gap-4 mb-4 pr-8">
        <div 
          onClick={() => onViewProfile && onViewProfile(user.id)}
          className="w-12 h-12 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center font-bold text-lg shrink-0 cursor-pointer hover:bg-primary-light transition-colors"
        >
          {user.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            onClick={() => onViewProfile && onViewProfile(user.id)}
            className="font-semibold text-gray-900 truncate cursor-pointer hover:text-primary-dark transition-colors"
          >
            {user.firstName} {user.lastName}
            {user.verified && <CheckCircle2 className="w-4 h-4 text-success inline-block ml-1 mb-0.5" />}
          </h3>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-gray-50 text-gray-700">
          {user.role}
        </Badge>
        <Badge variant="outline" className={`capitalize ${getStatusColor(user.status)}`}>
          {user.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2 pt-3 border-t border-gray-100">
        <div>
          <span className="block text-xs text-gray-400 mb-0.5">Groups</span>
          <span className="truncate block" title={userGroups.join(', ')}>{userGroups.join(', ') || '-'}</span>
        </div>
        <div>
          <span className="block text-xs text-gray-400 mb-0.5">Last Login</span>
          <span>{user.lastLoginAt ? format(new Date(user.lastLoginAt), 'MMM d, yy') : 'Never'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;