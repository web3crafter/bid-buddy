import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"

import { SignIn } from "@/components/sign-in"
import { SignOut } from "@/components/sign-out"

export const Header = async () => {
  const session = await auth()
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
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  )
}
