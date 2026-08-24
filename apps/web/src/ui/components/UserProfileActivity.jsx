import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Activity } from 'lucide-react';

const UserProfileActivity = ({ activityLog, userId }) => {
  const userActivities = activityLog
    .filter(log => log.userId === userId || log.targetId === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  const formatAction = (action) => {
    return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
      
      {userActivities.length === 0 ? (
        <div className="text-center py-6 text-gray-500 text-sm bg-gray-50 rounded-lg border border-gray-100">
          No activity yet
        </div>
      ) : (
        <div className="space-y-4">
          {userActivities.map((log) => (
            <div key={log.id} className="flex gap-3 items-start">
              <div className="mt-0.5 bg-primary-lighter text-primary-dark p-1.5 rounded-full shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium truncate">
                  {formatAction(log.action)}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                  <span className="capitalize">{log.targetType}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfileActivity;