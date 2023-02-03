import internal from "stream"

export interface UserSession {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: Date
  phone: string
  confirmation_sent_at: Date
  confirmed_at: Date
  last_sign_in_at: Date
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: Date
  updated_at: Date
}

export interface AppMetadata {
  provider: string
  providers: string[]
}

export interface Identity {
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: Date
  created_at: Date
  updated_at: Date
}

export interface IdentityData {
  email: string
  sub: string
}

export interface UserMetadata {}

export type SessionContextType = {
  session: UserSession | null
  signOut: () => void
}

export type SidebarContextType = {
  left: boolean
  setLeft: (value: boolean) => void
  right: boolean
  setRight: (value: boolean) => void
  sidebarLeftWidth: number
  setSidebarLeftWidth: (value: number) => void
  mainView: "CALENDAR" | "TASKS"
  toggleMainView: (_?: "CALENDAR" | "TASKS") => void
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
  weekFromNow: Date[]
  addPrevWeek: () => void
  addNextWeek: () => void
  month: string
  isWeekToView: () => boolean
}

export type LabelType = {
  id: string
  name: string
  color: string
}

export type LabelNoIDType = Omit<LabelType, "id">

export type TaskType = {
  id: string
  title: string
  notes: string
  recurrent: boolean
  dump: boolean
  done: boolean
  estimate: number
  actual: number
  userId: string
  label?: LabelType
  subtasks: SubtaskType[]
  createdAt: Date
  updatedAt: Date
}

export type TaskNoIDType = Omit<TaskType, "id">

export type SubtaskType = {
  id: string
  title: string
  done: boolean
  taskId: string
  createdAt: Date
  updatedAt: Date
}

export type SubtaskNoIDType = Omit<SubtaskType, "id">
