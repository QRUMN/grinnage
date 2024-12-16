import { createUploadthing, type FileRouter } from "uploadthing/server";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  userDocument: f({ image: { maxFileSize: "4MB" }, pdf: { maxFileSize: "8MB" } })
    .middleware(async () => {
      // Verify user is authenticated
      return { userId: "user_123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
