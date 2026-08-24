import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import UserActionsMenu from './UserActionsMenu';
import { format } from 'date-fns';

const UserRow = ({ user, groups, onVerify, onDeactivate, onReactivate, onViewProfile }) => {
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
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="w-[60px]">
        <div 
          onClick={() => onViewProfile && onViewProfile(user.id)}
          className="w-10 h-10 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-primary-light transition-colors"
        >
          {user.avatarInitials}
        </div>
      </TableCell>
      <TableCell>
        <div 
          onClick={() => onViewProfile && onViewProfile(user.id)}
          className="font-medium text-gray-900 cursor-pointer hover:text-primary-dark transition-colors"
        >
          {user.firstName} {user.lastName}
        </div>
      </TableCell>
      <TableCell className="text-gray-500 max-w-[200px] truncate" title={user.email}>
        {user.email}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-white">
          {user.role}
        </Badge>
      </TableCell>
      <TableCell className="max-w-[150px] truncate text-gray-600 text-sm" title={userGroups.join(', ')}>
        {userGroups.join(', ') || '-'}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={`capitalize ${getStatusColor(user.status)}`}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        {user.verified ? (
          <CheckCircle2 className="w-5 h-5 text-success" />
        ) : (
          <span className="text-gray-300">-</span>
        )}
      </TableCell>
      <TableCell className="text-sm text-gray-500 whitespace-nowrap">
        {user.lastLoginAt ? format(new Date(user.lastLoginAt), 'MMM d, yyyy') : 'Never'}
      </TableCell>
      <TableCell className="text-right">
        <UserActionsMenu 
          user={user} 
          onVerify={onVerify}
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
          onViewProfile={onViewProfile}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;