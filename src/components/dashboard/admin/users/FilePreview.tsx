import React from 'react';
import { X } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');

  return (
    <div className="relative group">
      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-sm text-gray-500">{file.name}</span>
          </div>
        )}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="mt-1 text-xs text-gray-500 truncate">
        {file.name}
      </div>
    </div>
  );
}
