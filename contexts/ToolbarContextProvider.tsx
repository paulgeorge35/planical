import { createContext, useEffect, useState } from "react"
import addDays from "date-fns/esm/fp/addDays/index.js"
import {
  DayOfWeekNumber,
  PickAndFlatten,
  TaskAllFields,
  ToolbarContextType,
} from "types"
import {
  getWeekIntervalFromDate,
  getWeekIntervalOfDate,
  isWeekToView,
} from "@/lib/utils"
import { format } from "date-fns"
import { UserSettings } from "@prisma/client"
import { useLocalStorageWithDB } from "@/hooks/use-local-storage-db"

export const ToolbarContext = createContext({
  today: new Date(new Date().toISOString().split("T")[0].replaceAll("-", "/")),
  USER_PREF_COMPLETE_TASKS_AUTO: true,
  setCompleteTaskOnSubtasksCompletion: (_: boolean) => null,
  USER_PREF_NEW_TASK_POSITION: "TOP",
  setNewTaskPosition: (_: "TOP" | "BOTTOM") => null,
  USER_PREF_FIRST_DAY_OF_WEEK: 1,
  setFirstDayOfWeek: (_: DayOfWeekNumber) => null,
  USER_PREF_SHOW_WEEKENDS: true,
  setShowWeekends: (_: boolean) => null,
  USER_PREF_ROLL_OVER_TASKS: true,
  setRollOverTasksToTheNextDay: (_: boolean) => null,
  USER_PREF_ROLL_OVER_TASKS_POSITION: "TOP",
  setRollOverTasksPosition: (_: "TOP" | "BOTTOM") => null,
  USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM: true,
  setMoveCompletedTasksSubtasksToTheBottom: (_: boolean) => null,
  dateToView: new Date(
    new Date().toISOString().split("T")[0].replaceAll("-", "/")
  ),
  nextDay: () => null,
  prevDay: () => null,
  resetToday: () => null,
  weekToView: getWeekIntervalOfDate(new Date(), 1, true),
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

  const [USER_PREF_NEW_TASK_POSITION, setNewTaskPosition] =
    useLocalStorageWithDB("USER_PREF_NEW_TASK_POSITION", "TOP")

  const [USER_PREF_ROLL_OVER_TASKS, setRollOverTasksToTheNextDay] =
    useLocalStorageWithDB("USER_PREF_ROLL_OVER_TASKS", true)

  const [USER_PREF_ROLL_OVER_TASKS_POSITION, setRollOverTasksPosition] =
    useLocalStorageWithDB("USER_PREF_ROLL_OVER_TASKS_POSITION", "TOP")

  const [
    USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM,
    setMoveCompletedTasksSubtasksToTheBottom,
  ] = useLocalStorageWithDB(
    "USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM",
    true
  )

  const [USER_PREF_COMPLETE_TASKS_AUTO, setCompleteTaskOnSubtasksCompletion] =
    useLocalStorageWithDB("USER_PREF_COMPLETE_TASKS_AUTO", true)

  const [USER_PREF_FIRST_DAY_OF_WEEK, setFirstDayOfWeek] =
    useLocalStorageWithDB<DayOfWeekNumber>("USER_PREF_FIRST_DAY_OF_WEEK", 1)

  const [USER_PREF_SHOW_WEEKENDS, setShowWeekends] = useLocalStorageWithDB(
    "USER_PREF_SHOW_WEEKENDS",
    true
  )

  const [dateToView, setDateToView] = useState<Date>(
    new Date(new Date().toISOString().split("T")[0].replaceAll("-", "/"))
  )
  const [weekToView, setWeekToView] = useState<Date[]>(
    getWeekIntervalOfDate(
      today,
      USER_PREF_FIRST_DAY_OF_WEEK,
      USER_PREF_SHOW_WEEKENDS
    )
  )
  const [weekFromNow, setWeekFromNow] = useState<Date[]>(
    getWeekIntervalFromDate(today)
  )
  const [taskDialog, setTaskDialog] = useState<TaskAllFields | null>(null)

  const patchSettings = async (
    settings: PickAndFlatten<Omit<Partial<UserSettings>, "id" | "userId">>
  ) => {
    const res = await (
      await fetch("/api/users/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        body: JSON.stringify({
          ...settings,
        }),
      })
    ).json()
    for (const [key, value] of Object.entries(res.settings)) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  useEffect(() => {
    setWeekToView(
      getWeekIntervalOfDate(
        dateToView,
        USER_PREF_FIRST_DAY_OF_WEEK,
        USER_PREF_SHOW_WEEKENDS
      )
    )
  }, [
    dateToView,
    USER_PREF_FIRST_DAY_OF_WEEK,
    USER_PREF_SHOW_WEEKENDS,
    getWeekIntervalOfDate,
    setWeekToView,
  ])

  const value = {
    today: new Date(
      new Date().toISOString().split("T")[0].replaceAll("-", "/")
    ),
    USER_PREF_COMPLETE_TASKS_AUTO,
    setCompleteTaskOnSubtasksCompletion: (value: boolean) => {
      setCompleteTaskOnSubtasksCompletion(value)
      patchSettings({
        USER_PREF_COMPLETE_TASKS_AUTO: value,
      })
    },
    USER_PREF_NEW_TASK_POSITION: USER_PREF_NEW_TASK_POSITION as
      | "TOP"
      | "BOTTOM",
    setNewTaskPosition: (value: "TOP" | "BOTTOM") => {
      setNewTaskPosition(value)
      patchSettings({
        USER_PREF_NEW_TASK_POSITION: value,
      })
    },
    USER_PREF_FIRST_DAY_OF_WEEK,
    setFirstDayOfWeek: (value: DayOfWeekNumber) => {
      setFirstDayOfWeek(value)
      patchSettings({
        USER_PREF_FIRST_DAY_OF_WEEK: value,
      })
    },
    USER_PREF_SHOW_WEEKENDS,
    setShowWeekends: (value: boolean) => {
      setShowWeekends(value)
      patchSettings({
        USER_PREF_SHOW_WEEKENDS: value,
      })
    },
    USER_PREF_ROLL_OVER_TASKS,
    setRollOverTasksToTheNextDay: (value: boolean) => {
      setRollOverTasksToTheNextDay(value)
      patchSettings({
        USER_PREF_ROLL_OVER_TASKS: value,
      })
    },
    USER_PREF_ROLL_OVER_TASKS_POSITION: USER_PREF_ROLL_OVER_TASKS_POSITION as
      | "TOP"
      | "BOTTOM",
    setRollOverTasksPosition: (value: "TOP" | "BOTTOM") => {
      setRollOverTasksPosition(value)
      patchSettings({
        USER_PREF_ROLL_OVER_TASKS_POSITION: value,
      })
    },
    USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM,
    setMoveCompletedTasksSubtasksToTheBottom: (value: boolean) => {
      setMoveCompletedTasksSubtasksToTheBottom(value)
      patchSettings({
        USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM: value,
      })
    },
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
    month: format(weekToView[weekToView.length - 1], "MMM yyyy"),
    isWeekToView: () => isWeekToView(today, weekToView),
    taskDialog,
    setTaskDialog: (value: TaskAllFields | null) => setTaskDialog(value),
  }
  return (
    <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>
  )
}
