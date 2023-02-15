import { createSubtask } from "./../lib/prisma/task"
import { Label, Subtask, Task } from "@prisma/client"
import internal from "stream"

export type TaskAllFields = PickAndFlatten<
  Task & {
    subtasks: Subtask[]
    label: Label
    intersects?: number
    intersectIndex?: number
  }
>

export type SubtaskNewType = PickAndFlatten<
  Omit<Subtask, "id" | "createdAt" | "updatedAt">
>

export type TaskNewTypeOpt = PickAndFlatten<
  Omit<Task, "id" | "createdAt" | "updatedAt" | "userId"> & {
    subtasks?: SubtaskNewType[]
    label?: Label
  }
>

export type SubtaskNewType = PickAndFlatten<
  Omit<Subtask, "id" | "createdAt" | "updatedAt">
>

export type LabelNewType = PickAndFlatten<
  Omit<Label, "id" | "createdAt" | "updatedAt" | "userId">
>

export type PickAndFlatten<T> = {
  [K in keyof T]: T[K]
} & {}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Partial<T> = {
  [P in keyof T]?: T[P]
}

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

export type TaskContextType = {
  tasks: TaskAllFields[]
  setTasks: (value: TaskAllFields[]) => void
  createTask: (data: TaskNewTypeOpt) => Promise<TaskAllFields>
  updateTask: (
    data: TaskAllFields,
    dontSetAfter?: boolean
  ) => Promise<TaskAllFields>
  deleteTask: (id: number) => Promise<{ id: number }>
  createSubtask: (data: SubtaskNewType) => Promise<Subtask>
  updateSubtask: (data: Subtask) => Promise<Subtask>
  deleteSubtask: (id: number) => Promise<{ id: number }>
  labels: Label[]
  setLabels: (value: Label[]) => void
  createLabel: (data: LabelNewType) => Promise<Label>
  updateLabel: (data?: Label) => Promise<Label>
  deleteLabel: (id: number) => Promise<{ id: number }>
  isFetching: boolean
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
  USER_PREF_COMPLETE_TASKS_AUTO: boolean
  setCompleteTaskOnSubtasksCompletion: (_: boolean) => void
  USER_PREF_NEW_TASK_POSITION: "TOP" | "BOTTOM"
  setNewTaskPosition: (_: "TOP" | "BOTTOM") => void
  USER_PREF_FIRST_DAY_OF_WEEK: DayOfWeekNumber
  setFirstDayOfWeek: (value: DayOfWeekNumber) => void
  USER_PREF_SHOW_WEEKENDS: boolean
  setShowWeekends: (value: boolean) => void
  USER_PREF_ROLL_OVER_TASKS: boolean
  setRollOverTasksToTheNextDay: (value: boolean) => void
  USER_PREF_ROLL_OVER_TASKS_POSITION: "TOP" | "BOTTOM"
  setRollOverTasksPosition: (value: "TOP" | "BOTTOM") => void
  USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM: boolean
  setMoveCompletedTasksSubtasksToTheBottom: (value: boolean) => void
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
  taskDialog: TaskAllFields | null
  setTaskDialog: (value: TaskAllFields | null) => void
}

export type LabelType = {
  id: string
  name: string
  color: string
}

export type LabelNoIDType = Omit<LabelType, "id">

export type TaskType = {
  id: number
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
  id: number
  title: string
  done: boolean
  taskId: string
  createdAt: Date
  updatedAt: Date
}

export type SubtaskNoIDType = Omit<SubtaskType, "id">

export type TaskNewType = PickAndFlatten<
  Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
>

type Responders = {
  // optional
  onBeforeCapture?: OnBeforeCaptureResponder
  onBeforeDragStart?: OnBeforeDragStartResponder
  onDragStart?: OnDragStartResponder
  onDragUpdate?: OnDragUpdateResponder
  // required
  onDragEnd: OnDragEndResponder
}

type OnBeforeCaptureResponder = (before: BeforeCapture) => mixed
type OnBeforeDragStartResponder = (start: DragStart) => mixed
type OnDragStartResponder = (
  start: DragStart,
  provided: ResponderProvided
) => mixed
type OnDragUpdateResponder = (
  update: DragUpdate,
  provided: ResponderProvided
) => mixed
type OnDragEndResponder = (
  result: DropResult,
  provided: ResponderProvided
) => mixed

type BeforeCapture = {
  draggableId: DraggableId
  mode: MovementMode
}

type DraggableRubric = {
  draggableId: DraggableId
  type: TypeId
  source: DraggableLocation
}

type DragStart = PickAndFlatten<
  DraggableRubric & {
    mode: MovementMode
  }
>

type DragUpdate = PickAndFlatten<
  DragStart & {
    // populated if in a reorder position
    destination?: DraggableLocation
    // populated if combining with another draggable
    combine?: Combine
  }
>

// details about the draggable that is being combined with
type Combine = {
  draggableId: DraggableId
  droppableId: DroppableId
}

export type DropResult = PickAndFlatten<
  DragUpdate & {
    reason: DropReason
  }
>

type DropReason = "DROP" | "CANCEL"

type DraggableLocation = {
  droppableId: DroppableId
  // the position of the droppable within a droppable
  index: number
}

// There are two modes that a drag can be in
// FLUID: everything is done in response to highly granular input (eg mouse)
// SNAP: items snap between positions (eg keyboard);
type MovementMode = "FLUID" | "SNAP"
