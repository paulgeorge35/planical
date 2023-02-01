"use client"

import { useCallback, useContext, useState } from "react"

import CalendarView from "@/components/calendar-view"
import TasksView from "@/components/tasks-view"
import { SidebarContext } from "@/contexts/SidebarContext"
import SidebarLeft from "@/components/sidebar-left"
import Toolbar from "@/components/appbar/toolbar"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import { cn } from "@/lib/utils"
import SidebarRight from "@/components/sidebar-right"
import Dialog from "@/components/dialog"
import ProfileDialogContent from "@/components/dialog/profile-dialog-content"

export default function Home() {
  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  const [profileDialogueOpen, setProfileDialogueOpen] = useState(false)

  const toggleProfileDialogue = useCallback(() => {
    setProfileDialogueOpen(!profileDialogueOpen)
  }, [profileDialogueOpen])

  return (
    <div className="flex flex-row h-screen">
      <Dialog
        className="p-0"
        open={profileDialogueOpen}
        toggle={toggleProfileDialogue}
        dismissOnEscapeKey={true}
      >
        <ProfileDialogContent />
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
            "dark:bg-neutral-900 dark:border-neutral-600"
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
                : "dark:bg-neutral-900 bg-slate-50"
            )}
          >
            {mainView === "CALENDAR" ? (
              <CalendarView />
            ) : (
              <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
            )}
          </main>
          <SidebarRight right={right} mainView={mainView} />
        </span>
      </span>
    </div>
  )
}
