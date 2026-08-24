import React from 'react';
import { Clock, User, Target, Info, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formatActionLabel = (action) => {
  if (!action) return 'Unknown';
  return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const ActivityRowExpanded = ({ entry, user }) => {
  return (
    <td colSpan="5" className="p-0 border-b border-gray-100">
      <div className="bg-slate-50/80 p-6 shadow-inner text-sm space-y-4">
        <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">Activity Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-xs font-medium uppercase tracking-wider mb-0.5">Timestamp</span>
                <span className="text-gray-900 font-medium">
                  {new Date(entry.timestamp).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'medium'
                  })}
                </span>
                <div className="text-gray-500 text-xs mt-0.5 font-mono">{entry.timestamp}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-xs font-medium uppercase tracking-wider mb-0.5">Actor</span>
                {user ? (
                  <div>
                    <span className="text-gray-900 font-medium">{user.firstName} {user.lastName}</span>
                    <span className="text-gray-500 ml-2">{user.email}</span>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">{user.role}</Badge>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-900 font-medium italic">System</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-xs font-medium uppercase tracking-wider mb-0.5">Action</span>
                <span className="text-gray-900 font-medium">{formatActionLabel(entry.action)}</span>
                <div className="text-gray-500 text-xs mt-0.5 font-mono">{entry.action}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-xs font-medium uppercase tracking-wider mb-0.5">Target</span>
                <span className="text-gray-900 font-medium capitalize">{entry.targetType}</span>
                <div className="text-gray-500 text-xs mt-0.5 font-mono">{entry.targetId}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="text-gray-500 block text-xs font-medium uppercase tracking-wider mb-0.5">Network</span>
                <span className="text-gray-900 font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                  {entry.ip || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </td>
  );
};

export default ActivityRowExpanded;