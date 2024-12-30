import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { FilePreview } from "./FilePreview";
import { Progress } from "@/components/ui/Progress";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUploadComplete: (urls: string[], names: string[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // in bytes
}

export function FileUpload({
  onUploadComplete,
  acceptedTypes = ["image", "pdf"],
  maxFiles = 10,
  maxSize = 1024 * 1024 * 10, // 10MB
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types
    const invalidFiles = acceptedFiles.filter(
      file => !acceptedTypes.some(type => file.type.startsWith(type))
    );

    if (invalidFiles.length > 0) {
      toast.error(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(", ")}`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = acceptedFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast.error(`File(s) too large: ${oversizedFiles.map(f => f.name).join(", ")}`);
      return;
    }

    setPreviewFiles(prev => [...prev, ...acceptedFiles].slice(0, maxFiles));
  }, [acceptedTypes, maxSize, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedTypes.includes('image') ? [] : undefined,
      'application/pdf': acceptedTypes.includes('pdf') ? [] : undefined,
    },
    maxFiles,
    maxSize,
  });

  const handleUpload = async () => {
    if (previewFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // TODO: Replace with actual upload logic
      const uploadPromises = previewFiles.map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        // const response = await api.post('/api/upload', formData);
        // return { url: response.data.url, name: file.name };
        return { url: URL.createObjectURL(file), name: file.name }; // Temporary mock
      });

      const results = await Promise.all(uploadPromises);

      clearInterval(progressInterval);
      setUploadProgress(100);

      const urls = results.map(r => r.url);
      const names = results.map(r => r.name);
      
      onUploadComplete(urls, names);
      setPreviewFiles([]);
      toast.success("Files uploaded successfully");
    } catch (error) {
      toast.error("Error uploading files");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="space-y-2">
            <p>Drag & drop files here, or click to select files</p>
            <p className="text-sm text-gray-500">
              Supported types: {acceptedTypes.join(", ")} (Max {maxFiles} files, {maxSize / 1024 / 1024}MB each)
            </p>
          </div>
        )}
      </div>

      {previewFiles.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {previewFiles.map((file, index) => (
              <FilePreview
                key={index}
                file={file}
                onRemove={() => setPreviewFiles(prev => prev.filter((_, i) => i !== index))}
              />
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </button>

          {isUploading && (
            <Progress value={uploadProgress} className="w-full" />
          )}
        </div>
      )}
    </div>
  );
}
