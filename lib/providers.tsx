"use client"

import { SidebarProvider } from "@/contexts/SidebarContext"
import { ToolbarProvider } from "@/contexts/ToolbarContext"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  )
}
