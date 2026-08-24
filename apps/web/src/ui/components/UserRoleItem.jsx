import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserRoleItem = ({ user, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-primary-light transition-all cursor-pointer shadow-sm group"
    >
      <div className="w-10 h-10 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary-light transition-colors">
        {user.avatarInitials}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </span>
          {user.verified && <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />}
        </div>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>

      <Badge variant="outline" className={`capitalize shrink-0 ${getStatusColor(user.status)}`}>
        {user.status}
      </Badge>
    </div>
  );
};

export default UserRoleItem;