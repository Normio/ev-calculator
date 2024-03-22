import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function abbreviate(str: string, fallback = '-') {
  if (str === null || str.trim().length === 0) return fallback

  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
