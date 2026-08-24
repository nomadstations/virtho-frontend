import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

const ActivityRow = ({ entry, user, isExpanded, onToggle, onUserClick }) => {
  return (
    <>
      <tr 
        className={`hover:bg-gray-50 transition-colors border-b cursor-pointer ${isExpanded ? 'bg-gray-50 border-gray-200' : 'border-gray-100'}`}
        onClick={onToggle}
      >
        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
          {new Date(entry.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div 
                  className="w-8 h-8 rounded-full bg-primary-lighter/40 text-primary-dark font-semibold flex items-center justify-center shrink-0 border border-primary-light/30 hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUserClick) onUserClick(user.id);
                  }}
                >
                  {user.avatarInitials || (user.firstName?.[0] + user.lastName?.[0])}
                </div>
                <div 
                  className="hover:underline text-gray-900 font-medium text-sm truncate max-w-[150px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUserClick) onUserClick(user.id);
                  }}
                >
                  {user.firstName} {user.lastName}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 font-bold flex items-center justify-center shrink-0 border border-gray-300">
                  S
                </div>
                <span className="text-gray-500 italic text-sm">System</span>
              </div>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <Badge variant="outline" className={`${getActionColor(entry.action)} whitespace-nowrap text-xs`}>
            {formatActionLabel(entry.action)}
          </Badge>
        </td>
        <td className="px-4 py-3 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium capitalize text-xs">{entry.targetType}</span>
            <span className="text-gray-500 text-xs truncate max-w-[150px] font-mono" title={entry.targetId}>
              {entry.targetId}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 font-mono text-xs">
          {entry.ip ? (
            <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 truncate max-w-[100px] inline-block" title={entry.ip}>
              {entry.ip}
            </span>
          ) : '-'}
        </td>
        <td className="px-4 py-3 text-right">
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <ActivityRowExpanded entry={entry} user={user} />
      )}
    </>
  );
};

export default ActivityRow;