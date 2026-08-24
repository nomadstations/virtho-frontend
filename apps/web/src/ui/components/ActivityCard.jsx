import React from 'react';
import { ChevronDown, ChevronUp, User, Clock, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ActivityRowExpanded from './ActivityRowExpanded';

const formatActionLabel = (action) => {
  if (!action) return 'Unknown';
  return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getActionColor = (action) => {
  if (action.includes('delete') || action.includes('revoke') || action.includes('deactivate')) return 'bg-destructive/10 text-destructive-foreground border-destructive/20';
  if (action.includes('create') || action.includes('verify') || action.includes('accept')) return 'bg-success/10 text-success-foreground border-success/20';
  if (action.includes('update') || action.includes('edit')) return 'bg-info/10 text-info-foreground border-info/20';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const ActivityCard = ({ entry, user, isExpanded, onToggle, onUserClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-3">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className={`${getActionColor(entry.action)} whitespace-nowrap text-xs`}>
            {formatActionLabel(entry.action)}
          </Badge>
          <div className="flex items-center gap-1 text-gray-400 text-xs font-medium bg-gray-50 px-2 py-1 rounded">
            <Clock className="w-3 h-3" />
            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          {user ? (
            <>
              <div 
                className="w-10 h-10 rounded-full bg-primary-lighter/40 text-primary-dark font-semibold flex items-center justify-center shrink-0 border border-primary-light/30"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUserClick) onUserClick(user.id);
                }}
              >
                {user.avatarInitials || (user.firstName?.[0] + user.lastName?.[0])}
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="font-medium text-sm text-gray-900 truncate hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUserClick) onUserClick(user.id);
                  }}
                >
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 font-bold flex items-center justify-center shrink-0 border border-gray-300">
                S
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-500 italic">System Actor</div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-medium capitalize text-gray-700">{entry.targetType}</span>
            <span className="text-gray-300">•</span>
            <span className="font-mono truncate max-w-[120px]" title={entry.targetId}>{entry.targetId}</span>
          </div>
          
          <button className="text-gray-400 p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="w-full">
           <ActivityRowExpanded entry={entry} user={user} />
        </div>
      )}
    </div>
  );
};

export default ActivityCard;