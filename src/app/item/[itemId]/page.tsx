import Image from "next/image"
import Link from "next/link"
import { eq } from "drizzle-orm"

import { pageTitleStyles } from "@/styles"
import { items } from "@/db/schema"
import { database } from "@/db/database"
import { formatToDollar, formatTimestamp } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export default async function ItemPage({
  params,
}: {
  params: { itemId: string }
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(params.itemId)),
  })

  const bids = [
    {
      id: 1,
      amount: 100,
      userName: "Lise",
      timeStamp: new Date(),
    },
    {
      id: 2,
      amount: 200,
      userName: "Chris",
      timeStamp: new Date(),
    },
    {
      id: 3,
      amount: 300,
      userName: "Zoe",
      timeStamp: new Date(),
    },
    {
      id: 4,
      amount: 400,
      userName: "Svein",
      timeStamp: new Date(),
    },
  ]

  const hasBids = bids.length > 0

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

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for </span>
            {item.name}
          </h1>
          <Image
            className="rounded-xl"
            src={item.fileKey}
            alt={item.name}
            width={400}
            height={400}
          />
          <div className="text-xl space-y-4">
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
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {!hasBids ? (
            <ul className="space-y-2">
              {bids.map((bid) => (
                <li
                  key={bid.id}
                  className="flex gap-4 bg-gray-100 rounded-xl p-8"
                >
                  <div>
                    <span className="font-bold">
                      ${formatToDollar(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.userName}</span>{" "}
                  </div>
                  <div>{formatTimestamp(bid.timeStamp)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
              <Image
                src="/package.svg"
                alt="Packeage"
                width={200}
                height={200}
              />
              <h2 className="text-2xl font-bold">There are no bids yet</h2>
              <Button>Place a Bid</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
