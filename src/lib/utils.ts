import { Token } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTokenValid(decodedToken: Token): boolean {
  if (decodedToken.exp < decodedToken.iat) {
    return false
  }

  return true
}