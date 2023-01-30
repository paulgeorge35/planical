"use client"

import { useContext } from "react"

import CalendarView from "@/components/calendar-view"
import TasksView from "@/components/tasks-view"
import { SidebarContext } from "@/contexts/SidebarContext"

export default function Home() {
  const { mainView, left, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  return mainView === "CALENDAR" ? (
    <CalendarView />
  ) : (
    <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
  )
}
