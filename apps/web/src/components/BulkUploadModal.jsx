import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, UploadCloud, FileSpreadsheet, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function BulkUploadModal({ isOpen, onClose, onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Basic validation
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Sample CSV template has been downloaded to your device.",
    });
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsUploading(false);
      onUpload([
        // Mock extracted data
        { name: "Bulk Imported Service", languagePairs: [] }
      ]);
      setFile(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card w-full max-w-lg rounded-xl shadow-xl flex flex-col relative overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl font-bold text-foreground">Bulk Upload Price List</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-start p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-foreground">
            <AlertCircle className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Upload Instructions</p>
              <p className="text-muted-foreground mb-3">Upload your service pricing data in CSV format. Make sure your file matches our required template structure.</p>
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate} className="h-8 border-primary/30 text-primary hover:bg-primary/10">
                <Download className="w-3.5 h-3.5 mr-2" /> Download Template
              </Button>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv, .xls, .xlsx" 
            className="hidden" 
          />

          {!file ? (
            <div 
              className={`upload-dropzone ${isDragging ? 'active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="text-lg font-medium text-foreground mb-1">Click or drag file to this area</h3>
              <p className="text-sm text-muted-foreground">Supported formats: CSV, XLS, XLSX (Max 10MB)</p>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mr-4">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-destructive hover:bg-destructive/10">
                  Remove
                </Button>
              </div>
              
              {isUploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Processing data...</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%', transition: 'width 0.5s ease' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isUploading} className="text-foreground">
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Start Upload</span>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}