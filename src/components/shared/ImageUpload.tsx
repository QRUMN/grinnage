import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  description?: string;
  className?: string;
  accept?: string[];
  maxSize?: number;
}

export function ImageUpload({
  onUpload,
  description = 'Drag and drop your image here, or click to select',
  className = '',
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 5242880, // 5MB
}: ImageUploadProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        await onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
        isDragActive ? 'border-primary' : 'border-gray-300'
      } ${className}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-10 h-10 mb-3 text-gray-400" />
      <p className="mb-2 text-sm text-gray-500">{description}</p>
      <p className="text-xs text-gray-500">
        Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
      </p>
    </div>
  );
}
