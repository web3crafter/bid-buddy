import Image from "next/image"
import Link from "next/link"

import { Item } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatToDollar } from "@/lib/utils"

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card className="p-8 flex flex-col justify-between space-y-2">
      <Image src={item.fileKey} alt={item.name} width={200} height={200} />
      <div className="w-full flex flex-col space-y-2">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-lg">
          starting price: ${formatToDollar(item.startingPrice)}
        </p>
        <Button asChild>
          <Link href={`/item/${item.id}`}>Place Bid</Link>
        </Button>
      </div>
    </Card>
  )
}
