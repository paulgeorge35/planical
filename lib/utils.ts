import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type LocaleType = "en-US" | "ro";

export function formatDate(input: string | number, locale: LocaleType = "en-US"): string {
  const date = new Date(input)
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
