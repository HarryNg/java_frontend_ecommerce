import { Token } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTokenValid(decodedToken: Token): boolean {
  if(!decodedToken || !decodedToken.exp) {
    return false
  }
  const currentTime = Math.floor(Date.now() / 1000)

  if (decodedToken.exp < currentTime) {
    return false
  }

  return true
}