import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, UploadCloud, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BulkImportPreviewTable from './BulkImportPreviewTable';
import BulkImportSummary from './BulkImportSummary';

export default function BulkImportModal({ isOpen, onClose, onConfirm, users, addUser, logActivity }) {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setParsedData([]);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleDownloadTemplate = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Role', 'Status', 'Verified', 'Groups'];
    const example = ['John', 'Doe', 'john.doe@example.com', 'Member', 'active', 'Yes', 'group-1;group-2'];
    const csvContent = [headers.join(','), example.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users-template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text) => {
    const rows = [];
    let row = [];
    let currentVal = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (inQuotes) {
        if (char === '"') {
          if (text[i + 1] === '"') {
            currentVal += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          currentVal += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          row.push(currentVal.trim());
          currentVal = '';
        } else if (char === '\n' || char === '\r') {
          if (char === '\r' && text[i + 1] === '\n') i++;
          row.push(currentVal.trim());
          if (row.some(r => r)) rows.push(row);
          row = [];
          currentVal = '';
        } else {
          currentVal += char;
        }
      }
    }
    if (row.length > 0 || currentVal) {
      row.push(currentVal.trim());
      if (row.some(r => r)) rows.push(row);
    }
    return rows;
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith('.csv') && selectedFile.type !== 'text/csv') {
      toast({ title: 'Invalid file type', description: 'Please upload a CSV file.', variant: 'destructive' });
      return;
    }
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = parseCSV(text);
      if (rows.length < 2) {
        toast({ title: 'Empty file', description: 'The CSV file contains no data rows.', variant: 'destructive' });
        return;
      }
      
      const headers = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
      const firstNameIdx = headers.findIndex(h => h.includes('first'));
      const lastNameIdx = headers.findIndex(h => h.includes('last'));
      const emailIdx = headers.findIndex(h => h.includes('email'));
      const roleIdx = headers.findIndex(h => h.includes('role'));
      const statusIdx = headers.findIndex(h => h.includes('status'));
      const verifiedIdx = headers.findIndex(h => h.includes('verif'));
      const groupsIdx = headers.findIndex(h => h.includes('group'));

      const validRoles = ['Admin', 'Moderator', 'Member', 'Guest'];
      const data = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || !row.length || !row.some(Boolean)) continue;
        
        const firstName = firstNameIdx >= 0 ? row[firstNameIdx] : '';
        const lastName = lastNameIdx >= 0 ? row[lastNameIdx] : '';
        const email = emailIdx >= 0 ? row[emailIdx] : '';
        let role = roleIdx >= 0 ? row[roleIdx] : 'Member';
        const status = statusIdx >= 0 ? row[statusIdx] : 'pending';
        const verified = verifiedIdx >= 0 ? row[verifiedIdx] : 'No';
        const groups = groupsIdx >= 0 ? row[groupsIdx] : '';

        let isValid = true;
        let errorMessage = '';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          isValid = false;
          errorMessage = 'Invalid or missing email';
        } else if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          isValid = false;
          errorMessage = 'Email already exists';
        }

        if (isValid && role && !validRoles.includes(role)) {
          role = 'Member';
        } else if (!role) {
          role = 'Member';
        }

        data.push({
          firstName, lastName, email, role, status, verified, groups, isValid, errorMessage
        });
      }
      setParsedData(data);
    };
    reader.readAsText(selectedFile);
  };

  const handleConfirm = () => {
    let imported = 0;
    parsedData.forEach(row => {
      if (row.isValid) {
        addUser({
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          role: row.role,
          status: row.status || 'pending',
          verified: row.verified.toLowerCase() === 'yes' || row.verified.toLowerCase() === 'true',
          groups: row.groups ? row.groups.split(';').map(g => g.trim()).filter(Boolean) : [],
          avatarInitials: ((row.firstName?.[0] || '') + (row.lastName?.[0] || '')).toUpperCase()
        }, 'system');
        imported++;
      }
    });

    if (logActivity) {
      logActivity('system', 'bulk_import_users', 'user', `Imported ${imported} users`);
    }
    
    toast({
      title: "Import Successful",
      description: `${imported} users imported successfully.`,
      variant: "success"
    });
    
    if (onConfirm) onConfirm();
    onClose();
  };

  const validCount = parsedData.filter(r => r.isValid).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-100">
          <DialogTitle>Bulk Import Users</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex items-start justify-between bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Import Instructions</p>
              <p className="text-gray-600 mb-2">Upload a CSV file containing the user data. Ensure it matches the template format.</p>
              <Button variant="link" onClick={handleDownloadTemplate} className="h-auto p-0 text-primary hover:text-primary-dark">
                <Download className="w-4 h-4 mr-1.5" />
                Download template CSV
              </Button>
            </div>
          </div>

          <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={(e) => processFile(e.target.files[0])} />

          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 bg-gray-50/50'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-900">Click or drag CSV file to this area</p>
              <p className="text-xs text-gray-500 mt-1">Only .csv files are supported</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10">
                  Remove
                </Button>
              </div>

              {parsedData.length > 0 && (
                <div>
                  <BulkImportSummary validCount={validCount} totalCount={parsedData.length} />
                  <BulkImportPreviewTable rows={parsedData} />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!file || validCount === 0}
            className="bg-primary text-primary-foreground hover:bg-primary-dark"
          >
            Import {validCount > 0 ? validCount : ''} Users
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}