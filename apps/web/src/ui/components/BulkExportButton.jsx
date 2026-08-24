import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BulkExportButton({ filteredUsers }) {
  const handleExport = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Role', 'Status', 'Verified', 'Groups', 'Created At'];
    
    const escapeCSV = (str) => {
      if (str === null || str === undefined) return '""';
      const s = String(str);
      if (s.includes('"') || s.includes(',') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return `"${s}"`;
    };

    const rows = filteredUsers.map(user => [
      escapeCSV(user.firstName),
      escapeCSV(user.lastName),
      escapeCSV(user.email),
      escapeCSV(user.role),
      escapeCSV(user.status),
      escapeCSV(user.verified ? 'Yes' : 'No'),
      escapeCSV(user.groups ? user.groups.join(';') : ''),
      escapeCSV(user.createdAt ? new Date(user.createdAt).toISOString() : '')
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `users-${dateStr}.csv`);
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
      disabled={!filteredUsers || filteredUsers.length === 0}
    >
      <Download className="w-4 h-4 mr-2" />
      Export Users
    </Button>
  );
}