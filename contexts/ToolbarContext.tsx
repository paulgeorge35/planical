import { createContext, useEffect, useState } from "react"
import addDays from "date-fns/esm/fp/addDays/index.js"
import { DayOfWeekNumber, ToolbarContextType } from "types"
import {
  getWeekIntervalFromDate,
  getWeekIntervalOfDate,
  isWeekToView,
} from "@/lib/utils"
import { format } from "date-fns"
import { useLocalStorage } from "@/hooks/use-local-storage"

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
  weekFromNow: getWeekIntervalFromDate(new Date()),
  addPrevWeek: () => null,
  addNextWeek: () => null,
  month: format(new Date(), "MMM yyyy"),
  isWeekToView: () => false,
} as ToolbarContextType)

export const ToolbarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  let today = new Date()
  const [firstDayOfWeek, setFirstDayOfWeek] = useLocalStorage<DayOfWeekNumber>(
    "firstDayOfWeek",
    1
  )
  const [dateToView, setDateToView] = useState<Date>(new Date())
  const [weekToView, setWeekToView] = useState<Date[]>(
    getWeekIntervalOfDate(today, firstDayOfWeek)
  )
  const [weekFromNow, setWeekFromNow] = useState<Date[]>(
    getWeekIntervalFromDate(today)
  )

  useEffect(() => {
    setWeekToView(getWeekIntervalOfDate(dateToView, firstDayOfWeek))
  }, [dateToView, firstDayOfWeek, getWeekIntervalOfDate, setWeekToView])

  const value = {
    today: new Date(),
    firstDayOfWeek,
    setFirstDayOfWeek: (value: DayOfWeekNumber) => setFirstDayOfWeek(value),
    dateToView,
    nextDay: () => setDateToView(addDays(1, dateToView)),
    prevDay: () => setDateToView(addDays(-1, dateToView)),
    resetToday: () => setDateToView(new Date()),
    weekToView,
    nextWeek: () => setDateToView(addDays(7, dateToView)),
    prevWeek: () => setDateToView(addDays(-7, dateToView)),
    weekFromNow,
    addPrevWeek: () =>
      setWeekFromNow([
        ...getWeekIntervalFromDate(addDays(-7, weekFromNow[0])),
        ...weekFromNow,
      ]),
    addNextWeek: () =>
      setWeekFromNow([
        ...weekFromNow,
        ...getWeekIntervalFromDate(addDays(1, weekFromNow[6])),
      ]),
    month: format(weekToView[6], "MMM yyyy"),
    isWeekToView: () => isWeekToView(today, weekToView),
  }
  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  )
}
