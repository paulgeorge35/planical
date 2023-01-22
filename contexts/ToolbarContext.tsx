import { createContext, useEffect, useState } from "react"
import addDays from "date-fns/esm/fp/addDays/index.js"
import { DayOfWeekNumber, ToolbarContextType } from "types"
import { getWeekIntervalOfDate } from "@/lib/utils"
import { format } from "date-fns"

export const ToolbarContext = createContext({
  today: new Date(),
  firstDayOfWeek: 1,
  setFirstDayOfWeek: (_: DayOfWeekNumber) => null,
  dateToView: new Date(),
  nextDay: () => null,
  prevDay: () => null,
  resetToday: () => null,
  weekToView: getWeekIntervalOfDate(new Date(), 1),
  nextWeek: () => null,
  prevWeek: () => null,
  month: format(new Date(), "MMM yyyy"),
  mainView: "CALENDAR",
  toggleMainView: (_: "CALENDAR" | "TASKS") => null,
  sidebarLeftWidth: 300,
  setSidebarLeftWidth: (_: number) => null,
} as ToolbarContextType)

export const ToolbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  let today = new Date()
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<DayOfWeekNumber>(1)
  const [dateToView, setDateToView] = useState<Date>(new Date())
  const [weekToView, setWeekToView] = useState<Date[]>(
    getWeekIntervalOfDate(today, firstDayOfWeek)
  )
  const [mainView, setMainView] = useState<"CALENDAR" | "TASKS">("CALENDAR")
  const [sidebarLeftWidth, setSidebarLeftWidth] = useState(300)

  useEffect(() => {
    setWeekToView(getWeekIntervalOfDate(dateToView, firstDayOfWeek))
  }, [dateToView, firstDayOfWeek, getWeekIntervalOfDate, setWeekToView])

  const value = {
    today,
    firstDayOfWeek,
    setFirstDayOfWeek: (value: DayOfWeekNumber) => setFirstDayOfWeek(value),
    dateToView,
    nextDay: () => setDateToView(addDays(1, dateToView)),
    prevDay: () => setDateToView(addDays(-1, dateToView)),
    resetToday: () => setDateToView(new Date()),
    weekToView,
    nextWeek: () => setDateToView(addDays(7, dateToView)),
    prevWeek: () => setDateToView(addDays(-7, dateToView)),
    month: format(weekToView[6], "MMM yyyy"),
    mainView,
    toggleMainView: (_: "CALENDAR" | "TASKS") =>
      setMainView(mainView === "CALENDAR" ? "TASKS" : "CALENDAR"),
    sidebarLeftWidth,
    setSidebarLeftWidth: (value: number) => setSidebarLeftWidth(value),
  }
  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  )
}
