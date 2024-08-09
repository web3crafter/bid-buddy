"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { Knock } from "@knocklabs/node"

import { database } from "@/db/database"
import { bids, items } from "@/db/schema"
import { env } from "@/env"

const knock = new Knock(env.KNOCK_SECRET_KEY)

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
  const userId = session?.user?.id

  if (!userId) throw new Error("You must be logged in to place a bid")

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  })

  if (!item) throw new Error("Item not found")

  const latestBidValue = item.currentBid + item.bidInterval

  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: userId,
    timeStamp: new Date(),
  })

  await database
    .update(items)
    .set({ currentBid: latestBidValue })
    .where(eq(items.id, itemId))

  const currentBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  })

  const recipients: {
    id: string
    name: string
    email: string
  }[] = []

  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId + "",
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      })
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session?.user?.name ?? "Anonymous",
        email: session?.user?.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidValue: latestBidValue,
        itemName: item.name,
      },
    })
  }

  revalidatePath(`/item/${itemId}`)
}
