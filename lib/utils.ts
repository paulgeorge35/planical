import addDays from "date-fns/esm/fp/addDays/index.js"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  BookmarkIcon,
  EnvelopeClosedIcon,
  GearIcon,
  HeartIcon,
  KeyboardIcon,
  QuestionMarkCircledIcon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type LocaleType = "en-US" | "ro"

export function formatDate(
  input: string | number,
  locale: LocaleType = "en-US"
): string {
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

export function getWeekIntervalOfDate(
  date: Date,
  USER_PREF_FIRST_DAY_OF_WEEK: number = 1
) {
  let dateCopy = new Date(date.getTime())
  const day = dateCopy.getDay()
  const start = addDays(
    -day + (day === 0 ? -6 : USER_PREF_FIRST_DAY_OF_WEEK),
    dateCopy
  )
  const end = addDays(6, start)
  const dates = []
  for (let dateCopy = start; dateCopy <= end; dateCopy = addDays(1, dateCopy)) {
    dates.push(new Date(dateCopy))
  }
  return dates
}

export function getWeekIntervalFromDate(date: Date) {
  let dateCopy = new Date(date.getTime())
  const start = dateCopy
  const end = addDays(6, start)
  const dates = []
  for (let dateCopy = start; dateCopy <= end; dateCopy = addDays(1, dateCopy)) {
    dates.push(new Date(dateCopy))
  }
  return dates
}

export function getDayToViewFromWeek(week: Date[], day: Date) {
  return week.find((date) => date.getDay() === day.getDay()) as Date
}

export function hslToHex(color: string) {
  const [h, s, l] = color
    .replace(/hsl\(|\)/g, "")
    .split(", ")
    .map((n) => Number(n.split("%")[0]))
  const a = (s * Math.min(l / 100, 1 - l / 100)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function compareDates(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const removeUndefined = (obj: any) =>
  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  )

export function isWeekToView(date: Date, week: Date[]) {
  return week.some((day) => compareDates(date, day))
}

export const formatTime = (time: number) =>
  `${Math.floor(time / 100)}:${time % 100 === 0 ? "00" : time % 100}`

export const adjustDateToTimezone = (date: Date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  var offset = date.getTimezoneOffset() / 60
  var hours = date.getHours()

  newDate.setHours(hours - offset)

  return newDate
}

export const ProfileDialogTabSections = [
  {
    title: "User Settings",
    tabs: [
      {
        label: "Account Settings",
        icon: GearIcon,
        value: "account-settings",
      },
      {
        label: "Subscription",
        icon: RocketIcon,
        value: "subscription-settings",
      },
    ],
  },
  {
    title: "App Settings",
    tabs: [
      {
        label: "Personalization",
        icon: HeartIcon,
        value: "personalization-settings",
      },
      {
        label: "Labels",
        icon: BookmarkIcon,
        value: "labels-settings",
      },
    ],
  },
  {
    title: undefined,
    tabs: [
      {
        label: "Keyboard Shortcuts",
        icon: KeyboardIcon,
        value: "keyboard-shortcuts",
      },
      {
        label: "What's New",
        icon: StarIcon,
        value: "whats-new",
      },
      {
        label: "Help & Support",
        icon: QuestionMarkCircledIcon,
        value: "help",
      },
      {
        label: "Give Feedback",
        icon: EnvelopeClosedIcon,
        value: "feedback",
      },
    ],
  },
]
