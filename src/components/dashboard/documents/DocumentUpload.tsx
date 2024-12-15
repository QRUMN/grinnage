import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export const DocumentUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file.name);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn-primary"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Document
      </button>
    </div>
  );
};