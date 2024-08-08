"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

const Error = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image src="/package.svg" alt="Packeage" width={400} height={400} />
      <h2 className="text-2xl font-bold">
        You need to be signed in to view this
      </h2>
    </div>
  )
}
export default Error
