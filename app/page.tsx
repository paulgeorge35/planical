"use client"

import { cn } from "@/lib/utils"
import { useContext } from "react"
import { SidebarContext } from "@/contexts/SidebarContext"
import Logo from "@/components/appbar/logo"
import Toolbar from "@/components/appbar/toolbar"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import { ToolbarContext } from "@/contexts/ToolbarContext"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import CalendarView from "@/components/calendar-view"

export default function Home() {
  const { left, right } = useContext(SidebarContext)
  const { mainView, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(ToolbarContext)
  return (
    <div className="p-0 flex flex-col h-screen overflow-hidden">
      <div
        className={cn(
          "flex h-12 bg-white border-b-[0.5px] border-neutral-200",
          "dark:bg-neutral-900 dark:border-neutral-600"
        )}
      >
        <Logo left={left} sidebarWidth={sidebarLeftWidth} />
        <Toolbar />
        <TasksToolbar right={right} />
      </div>
      <div className="flex flex-row">
        <SidebarLeft
          left={left}
          sidebarWidth={sidebarLeftWidth}
          setSidebarWidth={setSidebarLeftWidth}
        />
        <main
          className={cn(
            "p-0 flex flex-1 flex-col justify-center items-center",
            "dark:bg-neutral-800",
            mainView === "CALENDAR"
              ? "dark:bg-neutral-800 bg-white"
              : "dark:bg-neutral-900 bg-slate-50"
          )}
        >
          {mainView === "CALENDAR" && <CalendarView />}
        </main>
        <SidebarRight right={right} mainView={mainView} />
      </div>
    </div>
  )
}
