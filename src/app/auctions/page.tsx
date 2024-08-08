import { auth } from "@/auth"

import { database } from "@/db/database"
import { ItemCard } from "@/components/item-card"
import { items } from "@/db/schema"
import { eq } from "drizzle-orm"
import { EmptyState } from "@/components/empty-state"
import { pageTitleStyles } from "@/styles"

export default async function AuctionsPage() {
  const session = await auth()
  // if (!session?.user?.id) throw new Error("Unauthorized")
  if (!session?.user?.id) return null

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session?.user?.id),
  })
  const hasItems = allItems.length > 0

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Your current auctions</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  )
}
