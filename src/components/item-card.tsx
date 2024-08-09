import Image from "next/image"
import Link from "next/link"

import { Item } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatToDollar, isBidOver } from "@/lib/utils"
import { format } from "date-fns"

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card className="p-8 flex flex-col justify-between space-y-2">
      <div className="w-full flex items-center justify-center">
        <Image
          src={item.fileKey}
          alt={item.name}
          width={200}
          height={200}
          className="rounded-xl"
        />
      </div>
      <div className="w-full flex flex-col space-y-2">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-lg">
          starting price: ${formatToDollar(item.startingPrice)}
        </p>

        <p className="text-lg">
          {isBidOver(item)
            ? "Bids closed"
            : `Ends on: ${format(item.endDate, "eeee dd/MM/yyyy")}`}
        </p>

        <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
          <Link href={`/item/${item.id}`}>
            {isBidOver(item) ? "View" : "Place Bid"}
          </Link>
        </Button>
      </div>
    </Card>
  )
}
