import React from 'react';
import { MoreHorizontal, User, Edit, CheckCircle, Ban, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const UserActionsMenu = ({ user, onVerify, onDeactivate, onReactivate, onViewProfile }) => {

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(user.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit User</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {!user.verified && (
          <DropdownMenuItem onClick={() => onVerify(user.id)} className="cursor-pointer text-success focus:text-success">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Verify User</span>
          </DropdownMenuItem>
        )}
        
        {user.status === 'active' && (
          <DropdownMenuItem onClick={() => onDeactivate(user.id)} className="cursor-pointer text-destructive focus:text-destructive">
            <Ban className="mr-2 h-4 w-4" />
            <span>Deactivate User</span>
          </DropdownMenuItem>
        )}
        
        {user.status === 'inactive' && (
          <DropdownMenuItem onClick={() => onReactivate(user.id)} className="cursor-pointer text-info focus:text-info">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Reactivate User</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsMenu;