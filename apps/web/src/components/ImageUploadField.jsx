import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGE_UPLOAD_CONFIG } from '@/constants/projectConstants';
import {
  validateImageFile,
  generateImagePreview,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  formatFileSize,
} from '@/utils/imageUploadHandler';

export default function ImageUploadField({ value, onChange, error, disabled = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(false);
    setIsProcessing(true);

    const validation = validateImageFile(file);

    if (!validation.isValid) {
      setUploadError(validation.error);
      setIsProcessing(false);
      return;
    }

    try {
      const previewUrl = await generateImagePreview(file);
      setPreview(previewUrl);
      setUploadSuccess(true);
      
      if (onChange) {
        onChange(file, previewUrl);
      }

      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } catch (err) {
      setUploadError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onChange) {
      onChange(null, null);
    }
  };

  const handleDropEvent = (e) => {
    handleDrop(e, setIsDragging, handleFileSelect, (error) => {
      setUploadError(error);
    });
  };

  const displayError = error || uploadError;

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="image-preview-container">
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
            <img
              src={preview}
              alt="Project preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
                className="shadow-lg"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
          {uploadSuccess && (
            <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Image uploaded successfully</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`image-upload-dropzone ${isDragging ? 'dragging' : ''} ${
            displayError ? 'error' : ''
          } ${disabled ? 'disabled' : ''}`}
          onDragOver={(e) => handleDragOver(e, setIsDragging)}
          onDragLeave={(e) => handleDragLeave(e, setIsDragging)}
          onDrop={handleDropEvent}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={IMAGE_UPLOAD_CONFIG.acceptAttribute}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center justify-center gap-3 py-8">
            {isProcessing ? (
              <>
                <div className="w-12 h-12 border-4 border-lavender-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-600">Processing image...</p>
              </>
            ) : (
              <>
                <div className="p-4 rounded-full bg-lavender-lightest">
                  {displayError ? (
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  ) : (
                    <Upload className="w-8 h-8 text-lavender-primary" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-gray-900 mb-1">
                    {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {IMAGE_UPLOAD_CONFIG.supportedExtensions.join(', ').toUpperCase()} (max{' '}
                    {IMAGE_UPLOAD_CONFIG.maxFileSizeMB}MB)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Recommended: {IMAGE_UPLOAD_CONFIG.recommendedDimensions.width}x
                    {IMAGE_UPLOAD_CONFIG.recommendedDimensions.height}px
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {displayError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{displayError}</p>
        </div>
      )}
    </div>
  );
}