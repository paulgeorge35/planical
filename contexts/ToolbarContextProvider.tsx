import { createContext, useEffect, useState } from "react"
import addDays from "date-fns/esm/fp/addDays/index.js"
import { DayOfWeekNumber, TaskAllFields, ToolbarContextType } from "types"
import {
  getWeekIntervalFromDate,
  getWeekIntervalOfDate,
  isWeekToView,
} from "@/lib/utils"
import { format } from "date-fns"
import { useLocalStorage } from "@/hooks/use-local-storage"

export const ToolbarContext = createContext({
  today: new Date(new Date().toISOString().split("T")[0].replaceAll("-", "/")),
  USER_PREF_COMPLETE_TASKS_AUTO: true,
  USER_PREF_NEW_TASK_POSITION: "TOP",
  setCompleteTaskOnSubtasksCompletion: (_: boolean) => null,
  USER_PREF_FIRST_DAY_OF_WEEK: 1,
  setFirstDayOfWeek: (_: DayOfWeekNumber) => null,
  dateToView: new Date(
    new Date().toISOString().split("T")[0].replaceAll("-", "/")
  ),
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
  taskDialog: null,
  setTaskDialog: (_: TaskAllFields | null) => null,
} as ToolbarContextType)

export const ToolbarContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  let today = new Date(
    new Date().toISOString().split("T")[0].replaceAll("-", "/")
  )

  const [USER_PREF_NEW_TASK_POSITION, setNewTaskPosition] = useLocalStorage(
    "USER_PREF_NEW_TASK_POSITION",
    "TOP"
  )

  const [USER_PREF_ROLL_OVER_TASKS, setRollOverTasksToTheNextDay] =
    useLocalStorage("USER_PREF_ROLL_OVER_TASKS", true)

  const [USER_PREF_ROLL_OVER_TASKS_POSITION, setRollOverTasksPosition] =
    useLocalStorage("USER_PREF_ROLL_OVER_TASKS_POSITION", "TOP")

  const [
    USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM,
    setMoveCompletedTasksSubtasksToTheBottom,
  ] = useLocalStorage("USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM", true)

  const [USER_PREF_COMPLETE_TASKS_AUTO, setCompleteTaskOnSubtasksCompletion] =
    useLocalStorage("USER_PREF_COMPLETE_TASKS_AUTO", true)

  const [USER_PREF_FIRST_DAY_OF_WEEK, setFirstDayOfWeek] =
    useLocalStorage<DayOfWeekNumber>("USER_PREF_FIRST_DAY_OF_WEEK", 1)

  const [USER_PREF_SHOW_WEEKENDS, setShowWeekends] = useLocalStorage(
    "USER_PREF_SHOW_WEEKENDS",
    true
  )

  const [dateToView, setDateToView] = useState<Date>(
    new Date(new Date().toISOString().split("T")[0].replaceAll("-", "/"))
  )
  const [weekToView, setWeekToView] = useState<Date[]>(
    getWeekIntervalOfDate(today, USER_PREF_FIRST_DAY_OF_WEEK)
  )
  const [weekFromNow, setWeekFromNow] = useState<Date[]>(
    getWeekIntervalFromDate(today)
  )
  const [taskDialog, setTaskDialog] = useState<TaskAllFields | null>(null)

  useEffect(() => {
    setWeekToView(
      getWeekIntervalOfDate(dateToView, USER_PREF_FIRST_DAY_OF_WEEK)
    )
  }, [
    dateToView,
    USER_PREF_FIRST_DAY_OF_WEEK,
    getWeekIntervalOfDate,
    setWeekToView,
  ])

  const value = {
    today: new Date(
      new Date().toISOString().split("T")[0].replaceAll("-", "/")
    ),
    USER_PREF_COMPLETE_TASKS_AUTO,
    setCompleteTaskOnSubtasksCompletion: (value: boolean) =>
      setCompleteTaskOnSubtasksCompletion(value),
    USER_PREF_NEW_TASK_POSITION: USER_PREF_NEW_TASK_POSITION as
      | "TOP"
      | "BOTTOM",
    setNewTaskPosition: (value: "TOP" | "BOTTOM") => setNewTaskPosition(value),
    USER_PREF_FIRST_DAY_OF_WEEK,
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
    taskDialog,
    setTaskDialog: (value: TaskAllFields | null) => setTaskDialog(value),
  }
  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  )
}
