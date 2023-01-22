"use client"

import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import supabase from "@/lib/supabase"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="p-0">
      <main
        className={cn(
          "min-h-screen p-0 py-16 flex flex-1 flex-col justify-center items-center",
          "dark:bg-neutral-800"
        )}
      >
        <h1 className="text-3xl font-sans font-bold text-[#0070f3] dark:text-red-500">
          Poppins
        </h1>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </main>
    </div>
  )
}
