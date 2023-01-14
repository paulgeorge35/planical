"use client"

import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import supabase from "@/lib/supabase"
import { cn } from "@/lib/utils"
import ThemeSwitch from "@/components/theme-switcher"

export default function Home() {
  return (
    <div className="p-0 ">
      <div
        className={cn(
          "flex w-screen h-12 bg-white border-b-[0.5px]",
          "dark:bg-neutral-900 dark:border-neutral-600"
        )}
      >
        <div
          className={cn(
            "p-4 h-full border-r-[0.5px] w-[300px] flex items-center",
            "dark:border-neutral-600"
          )}
        >
          <h1 className={cn("text-2xl font-sans")}>
            <span className="text-[#0070f3]">Daily</span>
            <span className="text-red-500 font-bold">Planner</span>
          </h1>
        </div>
        <div className={cn("h-full grow ")} />
        <div
          className={cn(
            "h-full border-l-[0.5px] w-[300px]",
            "dark:border-neutral-600"
          )}
        >
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex flex-row">
        <div
          className={cn(
            "p-4 border-r-[0.5px] w-[300px] min-h-screen bg-slate-50",
            "dark:bg-neutral-900 dark:border-neutral-600"
          )}
        >
          <h1 className="text-3xl font-satoshi font-bold text-[#0070f3]">
            BRAINDUMP
          </h1>
        </div>
        <main
          className={cn(
            "min-h-screen p-0 py-16 flex flex-1 flex-col justify-center items-center",
            "dark:bg-neutral-800"
          )}
        >
          <h1 className="text-3xl font-satoshi font-bold text-[#0070f3]">
            Satoshi
          </h1>
          <h1 className="text-3xl font-sans font-bold text-[#0070f3] dark:text-red-500">
            Poppins
          </h1>
          <h1 className="text-3xl font-mono font-bold text-[#0070f3]">
            Roboto
          </h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            // providers={["google", "facebook", "twitter", "github", "discord"]}
          />
        </main>
        <div
          className={cn(
            "p-4 border-l-[0.5px] w-[300px] min-h-screen bg-slate-50",
            "dark:bg-neutral-900 dark:border-neutral-600"
          )}
        >
          <h1 className="text-3xl font-satoshi font-bold text-[#0070f3]">
            TODAY
          </h1>
        </div>
      </div>
    </div>
  )
}
