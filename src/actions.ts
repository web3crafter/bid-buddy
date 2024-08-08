"use server"

import { auth } from "@/auth"
import { database } from "@/db/database"
import { bids, items } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
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

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id,
  })

  redirect("/")
}

export const createBidAction = async (itemId: number) => {
  const session = await auth()
  if (!session || !session.user || !session.user.id)
    throw new Error("Unauthorized")

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  })

  if (!item) throw new Error("Item not found")

  const latestBidValue = item.currentBid + item.bidInterval

  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: session.user.id,
    timeStamp: new Date(),
  })

  await database
    .update(items)
    .set({ currentBid: latestBidValue })
    .where(eq(items.id, itemId))

  revalidatePath(`/item/${itemId}`)
}
