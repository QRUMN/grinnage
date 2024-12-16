import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadComplete: (url: string, name: string) => void;
  acceptedTypes?: string[];
}

export function FileUpload({ onUploadComplete, acceptedTypes = ["image", "pdf"] }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="w-full">
      <UploadButton<OurFileRouter>
        endpoint="userDocument"
        onUploadBegin={() => {
          setIsUploading(true);
        }}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          if (res?.[0]) {
            const { url, name } = res[0];
            onUploadComplete(url, name);
            toast.success("File uploaded successfully");
          }
        }}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          toast.error(`Error uploading file: ${error.message}`);
        }}
        appearance={{
          button: "bg-primary text-primary-foreground hover:bg-primary/90",
          container: "w-full",
        }}
      />
      {isUploading && (
        <div className="mt-2 text-sm text-muted-foreground">
          Uploading...
        </div>
      )}
    </div>
  );
}
