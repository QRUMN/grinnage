import React, { useState } from 'react';
import { Upload, Image, Video } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const MediaUploader = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // Handle file upload logic
    console.log('Files to upload:', files);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          isDragging ? "border-[#56e39f] bg-[#56e39f]/10" : "border-gray-300 dark:border-dark-700"
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Support for images and videos up to 50MB
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="btn-primary">
              <Image className="w-4 h-4 mr-2" />
              Upload Photos
            </button>
            <button className="btn-secondary">
              <Video className="w-4 h-4 mr-2" />
              Upload Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};