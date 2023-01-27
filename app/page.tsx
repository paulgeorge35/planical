"use client"

import { cn } from "@/lib/utils"
import { useContext } from "react"
import { SidebarContext } from "@/contexts/SidebarContext"
import Toolbar from "@/components/appbar/toolbar"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import { ToolbarContext } from "@/contexts/ToolbarContext"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import CalendarView from "@/components/calendar-view"
import TasksView from "@/components/tasks-view"

export default function Home() {
  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  return (
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
          <Toolbar />
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
            {mainView === "CALENDAR" && <CalendarView />}
            {mainView === "TASKS" && (
              <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
            )}
          </main>
          <SidebarRight right={right} mainView={mainView} />
        </span>
      </span>
    </div>
  )
}
