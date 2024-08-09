import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from "date-fns"
import { Item } from "@/db/schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp: Date) => {
  return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export const formatToDollar = (cents: number) => {
  return `${(cents / 100).toFixed(2)}`
}

export const isBidOver = (item: Item) => {
  return new Date() > new Date(item.endDate)
}
