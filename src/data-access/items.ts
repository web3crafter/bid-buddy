import { eq } from "drizzle-orm"

import { database } from "@/db/database"
import { items } from "@/db/schema"

export const getAllItems = async () => {
  return await database.query.items.findMany()
}

export const getAllItemsForUser = async (userId: string) => {
  return await database.query.items.findMany({
    where: eq(items.userId, userId),
  })
}

export const getItem = async (itemId: number) => {
  return await database.query.items.findFirst({
    where: eq(items.id, itemId),
  })
}
