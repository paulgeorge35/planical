"use client"

import { useCallback, useContext, useState } from "react"
import { Poppins, Roboto } from "@next/font/google"
import localFont from "@next/font/local"

import { AnalyticsWrapper } from "@/components/analytics"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import Toolbar from "@/components/appbar/toolbar"
import { SidebarContext } from "@/contexts/SidebarContext"
import { Providers } from "@/lib/providers"
import { cn } from "@/lib/utils"

import "../styles/globals.css"
import Dialog from "@/components/dialog"
import ProfileDialogContent from "@/components/dialog/profile-dialog-content"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  const [profileDialogueOpen, setProfileDialogueOpen] = useState(false)

  const toggleProfileDialogue = useCallback(() => {
    setProfileDialogueOpen(!profileDialogueOpen)
  }, [profileDialogueOpen])

  return (
    <html
      lang="en"
      className={cn(
        roboto.variable,
        poppins.variable,
        satoshi.variable,
        "font-sans antialiased max-h-screen light"
      )}
    >
      <head>
        <AnalyticsWrapper />
      </head>
      <body>
        <Providers>
          <Dialog
            className="p-0"
            open={profileDialogueOpen}
            toggle={toggleProfileDialogue}
            dismissOnClickOutside={true}
            dismissOnEscapeKey={true}
          >
            <ProfileDialogContent />
          </Dialog>
          <div className="flex flex-row h-screen">
            <SidebarLeft
              left={left}
              sidebarWidth={sidebarLeftWidth}
              setSidebarWidth={setSidebarLeftWidth}
            />
            <span className="flex flex-col">
              <div
                className={cn(
                  "flex h-12 bg-white border-b-[0.5px] border-neutral-200",
                  "dark:bg-neutral-900 dark:border-neutral-600"
                )}
              >
                <Toolbar
                  openProfileDialogue={() => setProfileDialogueOpen(true)}
                />
                <TasksToolbar right={right} mainView={mainView} />
              </div>
              <span className="flex flex-row h-full">
                <main
                  className={cn(
                    "p-0 flex flex-1 flex-col justify-center items-center h-full",
                    "dark:bg-neutral-800",
                    mainView === "CALENDAR"
                      ? "dark:bg-neutral-800 bg-white"
                      : "dark:bg-neutral-900 bg-slate-50"
                  )}
                >
                  {children}
                </main>
                <SidebarRight right={right} mainView={mainView} />
              </span>
            </span>
          </div>
        </Providers>
      </body>
    </html>
  )
}
