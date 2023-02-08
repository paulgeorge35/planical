import { SidebarContextProvider } from "@/contexts/SidebarContextProvider"
import { ToolbarContextProvider } from "@/contexts/ToolbarContextProvider"
import { ThemeProvider } from "next-themes"
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"

export function Providers({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession?: Session
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient({}))
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      <ToolbarContextProvider>
        <SidebarContextProvider>
          <ThemeProvider
            attribute="class"
            storageKey="theme"
            themes={["system", "dark", "light"]}
          >
            {children}
          </ThemeProvider>
        </SidebarContextProvider>
      </ToolbarContextProvider>
    </SessionContextProvider>
  )
}
