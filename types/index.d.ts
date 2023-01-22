export type SidebarContextType = {
  left: boolean
  setLeft: (value: boolean) => void
  right: boolean
  setRight: (value: boolean) => void
}

export type DayOfWeekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type ToolbarContextType = {
  today: Date
  firstDayOfWeek: DayOfWeekNumber
  setFirstDayOfWeek: (value: DayOfWeekNumber) => void
  dateToView: Date
  nextDay: () => void
  prevDay: () => void
  resetToday: () => void
  weekToView: Date[]
  nextWeek: () => void
  prevWeek: () => void
  month: string
  mainView: "CALENDAR" | "TASKS"
  toggleMainView: (_: "CALENDAR" | "TASKS") => void
  sidebarLeftWidth: number
  setSidebarLeftWidth: (value: number) => void
  isWeekToView: () => boolean
}
