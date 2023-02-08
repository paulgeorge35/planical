import { cn } from "@/lib/utils"
import React, { useContext } from "react"
import NewTaskButton from "./new-task-button"
import TaskComponent from "./task"
import { SidebarContext } from "@/contexts/SidebarContextProvider"
import useMediaQuery from "@/hooks/use-media-query"
import NewTaskForm from "./new-task-form"
import { Label, Subtask, Task } from "@prisma/client"
import { PickAndFlatten } from "types"

const SidebarLeft = ({
  left,
  sidebarWidth,
  setSidebarWidth,
}: {
  left: boolean
  sidebarWidth: number
  setSidebarWidth: (value: number) => void
}) => {
  const isPhone = useMediaQuery("(max-width: 639px)")
  const { mainView } = useContext(SidebarContext)
  const sidebarRef = React.useRef<HTMLInputElement>(null)
  const [isResizing, setIsResizing] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [newTask, setNewTask] =
    React.useState<
      PickAndFlatten<Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">>
    >()

  const startResizing = React.useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = React.useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        )
      }
    },
    [isResizing, setSidebarWidth]
  )

  React.useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  const MockTasks: PickAndFlatten<
    Task & { subtasks: Subtask[]; label: Label }
  >[] = []

  return (
    <div
      ref={sidebarRef}
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "relative min-h-full grow border-r-[0.5px] border-neutral-200 bg-slate-50 transition-all",
        "dark:border-neutral-600 dark:bg-neutral-900",
        !left && !isPhone && "w-0 overflow-hidden p-0",
        isResizing && "border-red-500 transition-none dark:border-red-500",
        mainView === "TASKS"
          ? "phone:block phone:h-screen phone:w-screen"
          : "phone:hidden"
      )}
      style={{ width: `${left ? sidebarWidth : 0}px` }}
    >
      <span
        className={cn(
          "flex h-12 items-center border-b-[0.5px] border-neutral-200 transition-all",
          "dark:border-neutral-600",
          left ? "p-4" : "w-0",
          isResizing && "transition-none",
          isPhone && "hidden"
        )}
        style={{ width: `${left ? sidebarWidth : 0}px` }}
      >
        <h1
          className={cn(
            "w-full text-center font-satoshi text-2xl font-bold italic text-neutral-900 transition-all dark:text-white",
            `${left ? "block" : "hidden"}`
          )}
        >
          planical
        </h1>
      </span>
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-1 cursor-col-resize transition-all",
          left ? "block" : "hidden",
          isResizing && "transition-none"
        )}
        onMouseDown={startResizing}
      />
      <h1
        className={cn(
          "mb-3 p-3 pb-0 font-satoshi text-xl font-semibold",
          "text-black",
          "dark:text-white"
        )}
      >
        🧠 Brain Dump
      </h1>
      <div className="flex flex-col space-y-2 p-3 pt-0">
        <NewTaskButton
          className="mb-2"
          tasks={MockTasks}
          toggle={() => {
            setIsAdding(true)
            setNewTask({
              title: "",
              notes: "",
              recurrent: false,
              estimate: 0,
              actual: 0,
              date: null,
              dump: true,
              done: false,
              archived: false,
              labelId: null,
            })
          }}
        />
        {/* {isAdding && typeof newTask !== undefined && (
            )} */}
        <NewTaskForm
          data={{
            title: "",
            notes: "",
            recurrent: false,
            estimate: 0,
            actual: 0,
            date: null,
            dump: true,
            done: false,
            archived: false,
            labelId: null,
          }}
        />
        {isAdding && "ADDING"}
        {MockTasks.map((task, index) => (
          <TaskComponent key={index} data={task} />
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft
