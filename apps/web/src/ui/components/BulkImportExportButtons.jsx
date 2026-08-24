import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BulkExportButton from './BulkExportButton';
import BulkImportModal from './BulkImportModal';

export default function BulkImportExportButtons({ filteredUsers, users, addUser, logActivity, onImportSuccess }) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <BulkExportButton filteredUsers={filteredUsers} />
      <Button 
        variant="outline" 
        onClick={() => setIsImportModalOpen(true)} 
        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <Upload className="w-4 h-4 mr-2" />
        Import Users
      </Button>
      <BulkImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onConfirm={onImportSuccess}
        users={users}
        addUser={addUser}
        logActivity={logActivity}
      />
    </div>
  );
}