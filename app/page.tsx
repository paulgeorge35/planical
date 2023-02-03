"use client"

import { useCallback, useContext, useEffect, useState } from "react"

import CalendarView from "@/components/calendar-view"
import Dialog from "@/components/dialog"
import ProfileDialogContent from "@/components/dialog/profile-dialog-content"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import TasksView from "@/components/tasks-view"
import Toolbar from "@/components/appbar/toolbar"
import WelcomeDialogContent from "@/components/dialog/welcome-dialog-content"

import { SidebarContext } from "@/contexts/SidebarContext"

import { useMounted } from "@/hooks/use-mounted"

import { cn } from "@/lib/utils"
import MobileNav from "@/components/mobile-nav"
import useMediaQuery from "@/hooks/use-media-query"

export default function Home() {
  const mounted = useMounted()
  const isPhone = useMediaQuery("(max-width: 639px)")
  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  const [profileDialogueOpen, setProfileDialogueOpen] = useState(false)
  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false)
  const [newAccount, _] = useState(false)

  const toggleProfileDialogue = useCallback(() => {
    setProfileDialogueOpen(!profileDialogueOpen)
  }, [profileDialogueOpen])

  useEffect(() => {
    setInterval(() => {
      if (mounted && newAccount) {
        setNewAccountDialogOpen(true)
      }
    }, 200)
  }, [mounted, newAccount])

  return (
    <div className="flex flex-row h-screen">
      <MobileNav />
      <Dialog
        className="p-0"
        open={profileDialogueOpen}
        toggle={toggleProfileDialogue}
        dismissOnEscapeKey={true}
      >
        <ProfileDialogContent />
      </Dialog>
      <Dialog
        className={cn("p-6 py-8 max-w-[600px]")}
        open={newAccountDialogOpen}
        toggle={() => setNewAccountDialogOpen(false)}
        closeButton={false}
      >
        <WelcomeDialogContent onClose={() => setNewAccountDialogOpen(false)} />
      </Dialog>
      <SidebarLeft
        left={left}
        sidebarWidth={sidebarLeftWidth}
        setSidebarWidth={setSidebarLeftWidth}
      />
      <span className="flex flex-col">
        <div
          className={cn(
            "flex h-12 bg-white border-b-[0.5px] border-neutral-200",
            "dark:bg-neutral-900 dark:border-neutral-600",
            "phone:hidden"
          )}
        >
          <Toolbar openProfileDialogue={() => setProfileDialogueOpen(true)} />
          <TasksToolbar right={right} mainView={mainView} />
        </div>
        <span className="flex flex-row h-full">
          <main
            className={cn(
              "p-0 flex flex-1 flex-col justify-center items-center h-full",
              "dark:bg-neutral-800",
              mainView === "CALENDAR"
                ? "dark:bg-neutral-800 bg-white"
                : "dark:bg-neutral-900 bg-slate-50",
              "phone:hidden"
            )}
          >
            {mainView === "CALENDAR" ? (
              <CalendarView />
            ) : (
              <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
            )}
          </main>
          {/* {(!isPhone || mainView === "CALENDAR") && ( */}
          <SidebarRight right={right} mainView={mainView} />
          {/* )} */}
        </span>
      </span>
    </div>
  )
}
