import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Fingerprint } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="text-gray-400 shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0 flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 truncate pl-4">{value}</span>
    </div>
  </div>
);

const UserProfileInfo = ({ user }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Account Information</h3>
      
      <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
        <InfoRow 
          icon={Calendar} 
          label="Created Date" 
          value={user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'Unknown'} 
        />
        <InfoRow 
          icon={Clock} 
          label="Last Login" 
          value={user.lastLoginAt ? format(new Date(user.lastLoginAt), 'MMM d, yyyy h:mm a') : 'Never logged in'} 
        />
        <InfoRow 
          icon={Fingerprint} 
          label="User ID" 
          value={user.id} 
        />
      </div>
    </div>
  );
};

export default UserProfileInfo;