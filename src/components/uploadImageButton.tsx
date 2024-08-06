"use client"
import { UploadButton } from "@/lib/uploadthing"

const UploadImageButton = () => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res)
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
export default UploadImageButton
