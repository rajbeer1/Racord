import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 import { auth } from "@clerk/nextjs";
const handleauth = () => {
  const {userId
} = auth()
  if (!userId) {
    throw new Error("Unauthorized");
    
  }
  return {userId :userId}
} 
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).middleware(() => handleauth())
    .onUploadComplete(() => { }),
  messageFile:f(["image","pdf"]).middleware(()=>handleauth()).onUploadComplete(()=>{})
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;