import React, { useState } from 'react';
import { FileQuestion } from 'lucide-react';
import ActivityRow from './ActivityRow';
import ActivityCard from './ActivityCard';

const ActivityTable = ({ entries, users, onUserClick }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <FileQuestion className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No Activity Found</h3>
        <p className="text-gray-500 max-w-md text-sm">
          No activity logs match your current filters. Try adjusting your search criteria or clearing filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[150px]">Timestamp</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[200px]">User</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map(entry => {
                const user = users.find(u => u.id === entry.userId);
                return (
                  <ActivityRow 
                    key={entry.id} 
                    entry={entry} 
                    user={user}
                    isExpanded={expandedId === entry.id}
                    onToggle={() => toggleExpand(entry.id)}
                    onUserClick={onUserClick}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-3">
        {entries.map(entry => {
          const user = users.find(u => u.id === entry.userId);
          return (
            <ActivityCard
              key={entry.id}
              entry={entry}
              user={user}
              isExpanded={expandedId === entry.id}
              onToggle={() => toggleExpand(entry.id)}
              onUserClick={onUserClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ActivityTable;