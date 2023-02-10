import { TaskContext } from "@/contexts/TaskContextProvider"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn } from "@/lib/utils"
import { Task } from "@prisma/client"
import { useCallback, useContext, useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { TaskAllFields } from "types"
import Checkbox from "./checkbox"
import SubtaskSection from "./task/subtask-section"
import TaskShortActions from "./task/task-short-actions"
import TimePreview from "./task/task-time-preview"

type TaskProps = {
  data: TaskAllFields
  className?: string
  index: number
}

const TaskComponent = ({ data, className, index }: TaskProps) => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false)
  const [extended, setExtended] = useState<boolean>(false)
  const { updateTask, tasks, setTasks } = useContext(TaskContext)
  const { completeTaskOnSubtasksCompletion } = useContext(ToolbarContext)

  useEffect(() => {
    if (data.done === true) {
      setChecked(true)
      return
    } else if (!data.subtasks || data.subtasks.length === 0) {
      setChecked(false)
      return
    }
    setChecked(
      data.subtasks
        ? data.subtasks.every((subtask) => subtask.done === true)
          ? true
          : "indeterminate"
        : false
    )
    if (
      data.subtasks &&
      data.subtasks.every((subtask) => subtask.done === true) &&
      completeTaskOnSubtasksCompletion
    ) {
      updateTask({ ...data, done: true })
      setTasks([
        ...tasks.map((task) =>
          task.id === data.id ? { ...data, done: true } : task
        ),
      ])
    }
  }, [data, completeTaskOnSubtasksCompletion, tasks, setTasks, updateTask])

  const handleCheckChange = useCallback(() => {
    if (!data.done) {
      updateTask({ ...data, done: true }, true)
      setTasks([
        ...tasks.filter((task) => task.id !== data.id),
        { ...data, done: true },
      ])
    } else {
      updateTask({ ...data, done: false }, true)
      setTasks([
        ...tasks.map((task) =>
          task.id === data.id ? { ...data, done: false } : task
        ),
      ])
    }
  }, [data, tasks, setTasks, updateTask])

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <span
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group flex w-full cursor-pointer flex-col rounded-xl border p-3",
            "border-neutral-200 bg-white text-neutral-800",
            "hover:border-blue-200 hover:shadow-md",
            "dark:border-neutral-800 dark:bg-neutral-800 dark:text-white",
            "dark:hover:border-neutral-600",
            data.done && "opacity-50 hover:opacity-100",
            className
          )}
        >
          <span className="flex flex-row items-center">
            <Checkbox checked={checked} onChange={handleCheckChange} />
            <p className={cn("grow px-2 text-xs")}>{data.title}</p>
            <TimePreview actual={data.actual} estimate={data.estimate} />
          </span>
          <TaskShortActions
            data={data}
            extended={extended}
            toggleExtended={() => setExtended(!extended)}
          />
          <SubtaskSection extended={extended} subtasks={data.subtasks} />
        </span>
      )}
    </Draggable>
  )
}

export default TaskComponent
