import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp: Date) => {
  return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export const formatToDollar = (cents: number) => {
  return `${(cents / 100).toFixed(2)}`
}
