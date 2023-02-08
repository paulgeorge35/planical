"use client"

import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Home() {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) router.push("/")
    })
  }, [])

  useEffect(() => {
    if (session) router.push("/")
  }, [session])

  return (
    <div className="p-0">
      <main
        className={cn(
          "flex min-h-screen flex-1 flex-col items-center justify-center p-0 py-16",
          "dark:bg-neutral-800"
        )}
      >
        <h1 className="font-sans text-3xl font-bold text-[#0070f3] dark:text-red-500">
          Poppins
        </h1>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </main>
    </div>
  )
}
