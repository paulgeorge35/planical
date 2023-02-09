import { DragDropContext } from "react-beautiful-dnd"
import { SidebarContextProvider } from "@/contexts/SidebarContextProvider"
import { ToolbarContextProvider } from "@/contexts/ToolbarContextProvider"
import { ThemeProvider } from "next-themes"
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { TaskContextProvider } from "@/contexts/TaskContextProvider"

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
      <TaskContextProvider>
        <ToolbarContextProvider>
          <SidebarContextProvider>
            <ThemeProvider
              attribute="class"
              storageKey="theme"
              themes={["system", "dark", "light"]}
            >
              <DroppableRoot>{children}</DroppableRoot>
            </ThemeProvider>
          </SidebarContextProvider>
        </ToolbarContextProvider>
      </TaskContextProvider>
    </SessionContextProvider>
  )
}

function DroppableRoot({ children }: { children: React.ReactNode }) {
  return <DragDropContext onDragEnd={() => null}>{children}</DragDropContext>
}
