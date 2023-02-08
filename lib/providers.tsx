import { SidebarProvider } from "@/contexts/SidebarContext"
import { ToolbarProvider } from "@/contexts/ToolbarContext"
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
  initialSession: Session
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient({}))
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      <ToolbarProvider>
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            storageKey="theme"
            themes={["system", "dark", "light"]}
          >
            {children}
          </ThemeProvider>
        </SidebarProvider>
      </ToolbarProvider>
    </SessionContextProvider>
  )
}
