import { auth } from "@/auth"

import { pageTitleStyles } from "@/styles"
import { getAllItems } from "@/data-access/items"
import { ItemCard } from "@/components/item-card"

export default async function HomePage() {
  const session = await auth()
  const allItems = await getAllItems()

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Items for sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}
