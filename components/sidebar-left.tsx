import { cn } from "@/lib/utils"
import React, { useContext } from "react"
import { TaskType } from "types"
import NewTaskButton from "./new-task-button"
import Task from "./task"
import { SidebarContext } from "@/contexts/SidebarContext"
import useMediaQuery from "@/hooks/use-media-query"

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
    [isResizing]
  )

  React.useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  const MockTasks: TaskType[] = [
    {
      id: "1",
      title: "Task 1",
      notes: "This is a note",
      recurrent: false,
      dump: false,
      done: false,
      estimate: 0,
      actual: 15,
      userId: "1",
      label: {
        id: "1",
        name: "Label 1",
        color: "#FF0000",
      },
      subtasks: [
        {
          id: "1",
          title: "Subtask 1 which is longer",
          done: false,
          taskId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "Subtask 2",
          done: true,
          taskId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Task 2",
      notes: "This is a note",
      recurrent: false,
      dump: false,
      done: false,
      estimate: 145,
      actual: 250,
      userId: "1",
      subtasks: [
        {
          id: "1",
          title: "Subtask 1",
          done: false,
          taskId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "Subtask 2",
          done: true,
          taskId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  return (
    <div
      ref={sidebarRef}
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "relative border-r-[0.5px] min-h-full bg-slate-50 transition-all border-neutral-200 grow",
        "dark:bg-neutral-900 dark:border-neutral-600",
        !left && !isPhone && "w-0 p-0 overflow-hidden",
        isResizing && "border-red-500 dark:border-red-500 transition-none",
        mainView === "TASKS"
          ? "phone:block phone:h-screen phone:w-screen"
          : "phone:hidden"
      )}
      style={{ width: `${left ? sidebarWidth : 0}px` }}
    >
      <span
        className={cn(
          "h-12 flex items-center transition-all border-b-[0.5px] border-neutral-200",
          "dark:border-neutral-600",
          left ? "p-4" : "w-0",
          isResizing && "transition-none",
          isPhone && "hidden"
        )}
        style={{ width: `${left ? sidebarWidth : 0}px` }}
      >
        <h1
          className={cn(
            "w-full text-center text-2xl font-satoshi font-bold italic text-neutral-900 dark:text-white transition-all",
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
          "p-3 pb-0 text-xl font-satoshi font-semibold mb-3",
          "text-black",
          "dark:text-white"
        )}
      >
        🧠 Brain Dump
      </h1>
      <div className="p-3 pt-0 flex flex-col space-y-2">
        <NewTaskButton className="mb-2" tasks={MockTasks} />
        {MockTasks.map((task, index) => (
          <Task key={index} data={task} />
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft
