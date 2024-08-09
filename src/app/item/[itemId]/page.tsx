import Image from "next/image"
import Link from "next/link"

import { pageTitleStyles } from "@/styles"
import { formatToDollar, formatTimestamp, isBidOver } from "@/lib/utils"
import { createBidAction } from "@/actions"
import { getBidsForItem } from "@/data-access/bids"
import { getItem } from "@/data-access/items"

import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { Badge } from "@/components/ui/badge"

export default async function ItemPage({
  params,
}: {
  params: { itemId: string }
}) {
  const session = await auth()
  const userId = session?.user?.id

  const item = await getItem(parseInt(params.itemId))

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center pt-12">
        <Image src="/package.svg" alt="Packeage" width={200} height={200} />
        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid. <br /> Please go back
          and try to search for a different auction item
        </p>
        <Button asChild>
          <Link href="/">View Auctions</Link>
        </Button>
      </div>
    )
  }

  const allBids = await getBidsForItem(parseInt(params.itemId))
  const hasBids = allBids.length > 0

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for </span>
            {item.name}
          </h1>
          {isBidOver(item) && (
            <Badge variant="destructive" className="w-fit">
              Ended
            </Badge>
          )}
          <Image
            className="rounded-xl"
            src={item.fileKey}
            alt={item.name}
            width={400}
            height={400}
          />
          <div className="text-xl space-y-4">
            <div>
              Current Bid{" "}
              <span className="font-bold">
                {" "}
                ${formatToDollar(item.currentBid)}
              </span>
            </div>
            <div>
              Starting Price of{" "}
              <span className="font-bold">
                {" "}
                ${formatToDollar(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid Interval{" "}
              <span className="font-bold">
                ${formatToDollar(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-8 flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Current Bids</h2>

            {userId && (
              <form action={createBidAction.bind(null, item.id)}>
                {!isBidOver(item) && <Button>Place a Bid</Button>}
              </form>
            )}
          </div>
          {hasBids ? (
            <ul className="space-y-2">
              {allBids.map((bid) => (
                <li
                  key={bid.id}
                  className="flex gap-4 bg-gray-100 rounded-xl p-8"
                >
                  <div>
                    <span className="font-bold">
                      ${formatToDollar(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.user.name}</span>{" "}
                  </div>
                  <div>{formatTimestamp(bid.timeStamp)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
              <Image
                src="/package.svg"
                alt="Package"
                width={200}
                height={200}
              />
              <h2 className="text-2xl font-bold">There are no bids yet</h2>
              {userId && (
                <form action={createBidAction.bind(null, item.id)}>
                  {!isBidOver(item) && (
                    <Button type="submit">Place a Bid</Button>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
