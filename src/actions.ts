"use server"

import { auth } from "@/auth"
import { database } from "@/db/database"
import { items } from "@/db/schema"
import { redirect } from "next/navigation"

export const createItemAction = async ({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string
  name: string
  startingPrice: number
}) => {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const user = session.user
  if (!user || !user.id) throw new Error("Unauthorized")

  // const priceAsCents = Math.floor(parseFloat(startingPrice) * 100)

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id,
  })

  redirect("/")
}
