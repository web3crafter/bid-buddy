"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react"

import { Button } from "@/components/ui/button"
import { formatToDollar } from "@/lib/utils"

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false)
  const notifButtonRef = useRef(null)
  const session = useSession()

  const userId = session?.data?.user.id

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1 hover:underline">
              All auctions
            </Link>
            {userId && (
              <>
                <Link
                  href="/item/create"
                  className="flex items-center gap-1 hover:underline"
                >
                  Create Auction
                </Link>
                <Link
                  href="/auctions"
                  className="flex items-center gap-1 hover:underline"
                >
                  My auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            renderItem={({ item, ...props }) => (
              <NotificationCell
                {...props}
                item={item}
                key={item.data?.bidValue}
              >
                <div className="bg-gray-100 rounded-xl p-4 mx-4 my-2">
                  <Link
                    href={`/item/${item.data?.itemId}`}
                    className="hover:underline hover:text-blue-500"
                    onClick={() => setIsVisible(false)}
                  >
                    Someone outbidded you on{" "}
                    <span className="font-bold">{item.data?.itemName}</span> for
                    ${formatToDollar(item.data?.bidValue)}
                  </Link>
                </div>
              </NotificationCell>
            )}
          />
          <div>{session?.data?.user?.name}</div>
          {session?.data?.user?.image && (
            <Image
              className="rounded-full"
              src={session.data?.user.image}
              alt="User Avatar"
              width={40}
              height={40}
            />
          )}

          <div>
            {userId ? (
              <Button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
