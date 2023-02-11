import { UserSettings } from "@prisma/client"
import { useEffect, useState } from "react"

export function useLocalStorageWithDB<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue)
  const [settings, setSettings] = useState<UserSettings>()

  const fetchUser = async () => {
    let res = await (
      await fetch("/api/users/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      })
    ).json()
    delete res.user.settings.id
    delete res.user.settings.userId
    delete res.user.settings.updatedAt
    if (res) setSettings(res.user.settings)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(key)
    setValue(stored ? JSON.parse(stored) : fallbackValue)
  }, [fallbackValue, key])

  // Initialize localStorage with values from database
  useEffect(() => {
    if (settings)
      for (const [key, value] of Object.entries(settings)) {
        const stored = localStorage.getItem(key)
        if (!stored)
          localStorage.setItem(
            key,
            key === "theme" ? (value as string) : JSON.stringify(value)
          )
      }
  }, [settings])

  return [value, setValue] as const
}
