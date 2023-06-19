"use client"

import { useCallback, useContext, useEffect, useState } from "react"

import CalendarView from "@/components/calendar-view"
import Dialog from "@/components/dialog"
import ProfileDialogContent from "@/components/dialog/profile-dialog-content"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import TasksView from "@/components/tasks-view"
import Toolbar from "@/components/appbar/toolbar"
import WelcomeDialogContent from "@/components/dialog/welcome-dialog-content"

import { SidebarContext } from "@/contexts/SidebarContextProvider"

import { useMounted } from "@/hooks/use-mounted"

import { cn, compareDates } from "@/lib/utils"
import MobileNav from "@/components/mobile-nav"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { TaskContext } from "@/contexts/TaskContextProvider"
import { TaskAllFields } from "types"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import TaskDialogContent from "@/components/dialog/task-dialog-content"

export default function Home() {
  const mounted = useMounted()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const session = useSession()

  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  const { taskDialog, setTaskDialog } = useContext(ToolbarContext)
  const { updateTask, tasks, setTasks } = useContext(TaskContext)
  const [profileDialogueOpen, setProfileDialogueOpen] = useState(false)
  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false)
  const [newAccount, _] = useState(false)

  const toggleProfileDialogue = useCallback(() => {
    setProfileDialogueOpen(!profileDialogueOpen)
  }, [profileDialogueOpen])

  const onTaskDragEnd = useCallback(
    (result: DropResult) => {
      // No destination
      if (!result.destination) return
      // Same destination
      if (
        result.destination.index === result.source.index &&
        result.destination.droppableId === result.source.droppableId
      )
        return
      // Find dragged task
      const draggedTask = tasks.find(
        (task) => task.id === parseInt(result.draggableId)
      ) as TaskAllFields
      // Update dragged task with new index and date/dump
      updateTask(
        {
          ...draggedTask,
          index: result.destination.index,
          dump: result.destination.droppableId === "dump",
          date:
            result.destination.droppableId === "dump"
              ? null
              : new Date(result.destination.droppableId),
        },
        true
      )
      // Update task indexes and dragged task (in local state)
      setTasks(
        [
          ...tasks.reverse().map((task) => {
            if (
              (task.dump &&
                result.destination &&
                result.destination.droppableId === "dump") ||
              (result.destination &&
                task.date &&
                compareDates(
                  new Date(
                    typeof task.date === "string"
                      ? task.date
                      : task.date.toString()
                  ),
                  new Date(result.destination.droppableId)
                ))
            )
              console.log(
                `[${task.index}]${
                  result.destination && task.index >= result.destination.index
                    ? `->[${task.index + 1}]`
                    : ""
                } ${task.title}`
              )
            // If it's the dragged task, update index and date/dump
            if (
              task.id === parseInt(result.draggableId) &&
              result.destination
            ) {
              console.log(
                `[${draggedTask.index}->${result.destination.index}] ${draggedTask.title}`
              )

              return {
                ...task,
                index: result.destination.index,
                dump: result.destination.droppableId === "dump",
                date:
                  result.destination.droppableId === "dump"
                    ? null
                    : new Date(result.destination.droppableId),
              }
            } else if (
              // If it's another task from the destination column
              (task.dump &&
                result.destination &&
                result.destination.droppableId === "dump") ||
              (result.destination &&
                task.date &&
                compareDates(
                  new Date(
                    typeof task.date === "string"
                      ? task.date
                      : task.date.toString()
                  ),
                  new Date(result.destination.droppableId)
                ))
            ) {
              // and its index is greater than the dragged task's index (it's below the dragged task) then increment its index by 1
              if (task.index >= result.destination.index) {
                return {
                  ...task,
                  index: task.index + 1,
                }
              }
            }
            // If it's a task from the destination column and its index is less than the dragged task's index (it's above the dragged task)
            return task
          }),
        ].reverse()
      )
    },
    [tasks]
  )

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" && !session) {
        router.push("/login")
      }
    })
  }, [])

  useEffect(() => {
    if (mounted && !session) {
      router.push("/login")
    }
  }, [session, mounted])

  useEffect(() => {
    setInterval(() => {
      if (mounted && newAccount) {
        setNewAccountDialogOpen(true)
      }
    }, 200)
  }, [mounted, newAccount])

  return (
    <DragDropContext onDragEnd={onTaskDragEnd}>
      <div className="flex h-screen flex-row">
        <MobileNav />
        <Dialog
          className="p-0"
          open={profileDialogueOpen}
          toggle={toggleProfileDialogue}
          dismissOnEscapeKey={true}
          dismissOnClickOutside={true}
        >
          <ProfileDialogContent />
        </Dialog>
        <Dialog
          className={cn("max-w-[600px] p-6 py-8")}
          open={newAccountDialogOpen}
          toggle={() => setNewAccountDialogOpen(false)}
          closeButton={false}
        >
          <WelcomeDialogContent
            onClose={() => setNewAccountDialogOpen(false)}
          />
        </Dialog>
        <Dialog
          className={cn("max-w-[600px] p-2")}
          open={taskDialog !== null}
          toggle={() => setTaskDialog(null)}
          closeButton={false}
          dismissOnEscapeKey={true}
          dismissOnClickOutside={true}
        >
          {taskDialog !== null && <TaskDialogContent task={taskDialog} />}
        </Dialog>
        <SidebarLeft
          left={left}
          sidebarWidth={sidebarLeftWidth}
          setSidebarWidth={setSidebarLeftWidth}
        />
        <span className="flex flex-col">
          <div
            className={cn(
              "flex h-12 border-b-[0.5px] border-neutral-200 bg-white",
              "dark:border-neutral-600 dark:bg-neutral-900",
              "phone:hidden"
            )}
          >
            <Toolbar openProfileDialogue={() => setProfileDialogueOpen(true)} />
            <TasksToolbar right={right} mainView={mainView} />
          </div>
          <span className="flex h-full flex-row">
            <main
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center p-0",
                "dark:bg-neutral-800",
                mainView === "CALENDAR"
                  ? "bg-white dark:bg-neutral-800"
                  : "bg-slate-50 dark:bg-neutral-900",
                "phone:hidden"
              )}
            >
              {mainView === "CALENDAR" ? (
                <CalendarView />
              ) : (
                <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
              )}
            </main>
            <SidebarRight right={right} mainView={mainView} />
          </span>
        </span>
      </div>
    </DragDropContext>
  )
}
