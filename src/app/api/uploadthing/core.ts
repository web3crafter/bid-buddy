import { auth } from "@/auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth()
      if (!session) throw new UploadThingError("Unauthorized")

      const user = session.user

      if (!user) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
