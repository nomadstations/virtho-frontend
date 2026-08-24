import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formatActionLabel = (action) => {
  if (!action) return 'Unknown';
  return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const escapeCSV = (str) => {
  if (str === null || str === undefined) return '""';
  const stringified = String(str);
  if (stringified.includes('"') || stringified.includes(',') || stringified.includes('\n')) {
    return `"${stringified.replace(/"/g, '""')}"`;
  }
  return `"${stringified}"`;
};

const ActivityExportButton = ({ entries, users }) => {
  const handleExport = () => {
    const headers = ['Timestamp', 'User Name', 'User Email', 'Action', 'Target Type', 'Target ID', 'IP Address'];
    
    const rows = entries.map(entry => {
      const user = users.find(u => u.id === entry.userId);
      const timestamp = new Date(entry.timestamp).toISOString();
      const userName = user ? `${user.firstName} ${user.lastName}` : 'System';
      const userEmail = user ? user.email : 'system@local';
      const action = formatActionLabel(entry.action);
      
      return [
        escapeCSV(timestamp),
        escapeCSV(userName),
        escapeCSV(userEmail),
        escapeCSV(action),
        escapeCSV(entry.targetType),
        escapeCSV(entry.targetId),
        escapeCSV(entry.ip || '')
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `activity-log-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      variant="outline"
      onClick={handleExport}
      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      disabled={entries.length === 0}
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV
    </Button>
  );
};

export default ActivityExportButton;