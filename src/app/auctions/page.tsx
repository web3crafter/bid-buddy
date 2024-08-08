import { auth } from "@/auth"

import { pageTitleStyles } from "@/styles"
import { getAllItemsForUser } from "@/data-access/items"

import { ItemCard } from "@/components/item-card"
import { EmptyState } from "@/components/empty-state"

export default async function AuctionsPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const allItems = await getAllItemsForUser(session.user.id)
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
