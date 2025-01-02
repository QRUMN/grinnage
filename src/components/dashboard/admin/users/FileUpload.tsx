import React from 'react';
import { Button } from '@/components/ui/Button';

export interface FileUploadProps {
  onUpload: (files: FileList) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  maxFiles = 5,
  acceptedFileTypes = ['*'],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes.join(',')}
        multiple={maxFiles > 1}
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full"
      >
        Upload Files
      </Button>
    </div>
  );
};
