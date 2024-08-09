"use client"

import { useState } from "react"

import { pageTitleStyles } from "@/styles"
import { createItemAction } from "@/actions"
import { UploadButton } from "@/lib/uploadthing"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/date-picker"

export default function CreateBidPage() {
  const [fileKey, setFileKey] = useState("")
  const [date, setDate] = useState<Date | undefined>()

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Post an Item</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          if (!date) return

          const form = e.currentTarget as HTMLFormElement
          const formData = new FormData(form)

          const name = formData.get("name") as string
          const startingPrice = parseInt(
            formData.get("startingPrice") as string
          )
          const startingPriceInCent = Math.floor(startingPrice * 100)

          await createItemAction({
            name,
            startingPrice: startingPriceInCent,
            fileName: fileKey,
            endDate: date,
          })
        }}
        className=" flex flex-col border p-8 rounded-xl gap-4 max-w-md"
      >
        <Input required className="" name="name" placeholder="Name your item" />
        <Input
          required
          type="number"
          step="0.01"
          name="startingPrice"
          placeholder="What to start your action at"
          className=""
        />

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setFileKey(res[0].url)
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
          }}
        />
        <DatePicker date={date} setDate={setDate} />
        <Button className="self-end" type="submit" disabled={!fileKey}>
          Post Item
        </Button>
      </form>
    </main>
  )
}
