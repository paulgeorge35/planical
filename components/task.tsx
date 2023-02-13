import { TaskContext } from "@/contexts/TaskContextProvider"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn } from "@/lib/utils"
import { Label, Subtask, Task } from "@prisma/client"
import { useCallback, useContext, useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { TaskAllFields } from "types"
import Checkbox from "./checkbox"
import SubtaskSection from "./task/subtask-section"
import TaskShortActions from "./task/task-short-actions"
import TimePreview from "./task/task-time-preview"
import TimeSection from "./task/time-section"

type TaskProps = {
  data: TaskAllFields
  className?: string
  index: number
}

const TaskComponent = ({ data, className, index }: TaskProps) => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false)
  const [extended, setExtended] = useState<boolean>(false)
  const [timeExtended, setTimeExtended] = useState<boolean>(false)
  const { updateTask, createSubtask, updateSubtask, tasks, setTasks } =
    useContext(TaskContext)
  const { USER_PREF_COMPLETE_TASKS_AUTO, setTaskDialog } =
    useContext(ToolbarContext)

  useEffect(() => {
    setChecked(data.done)
  }, [data, setChecked])

  useEffect(() => {
    if (
      data.done === false &&
      data.subtasks &&
      data.subtasks.every((subtask) => subtask.done === true) === true &&
      checked === data.done &&
      USER_PREF_COMPLETE_TASKS_AUTO === true
    ) {
      updateTask({ ...data, done: true }, true)
      setTasks([
        ...tasks.map((task) =>
          task.id === data.id ? { ...data, done: true } : task
        ),
      ])
    }
  }, [
    data,
    USER_PREF_COMPLETE_TASKS_AUTO,
    updateTask,
    checked,
    setTasks,
    tasks,
  ])

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

  const handleChangeTime = useCallback(
    (field: "actual" | "estimate", value: string) => {
      const newValue = value
        .split(":")
        .map((value) => parseInt(value) as number)
        .reduce((acc, cur) => {
          return acc * 100 + cur
        })
      updateTask({ ...data, [field]: newValue }, true)
      setTasks([
        ...tasks.filter((task) => task.id !== data.id),
        { ...data, [field]: newValue },
      ])
    },
    [data, tasks, setTasks, updateTask]
  )

  const handleChangeLabel = useCallback(
    (label: Label) => {
      updateTask({ ...data, labelId: label.id }, true)
      setTasks([
        ...tasks.map((task) =>
          task.id !== data.id ? task : { ...data, labelId: label.id, label }
        ),
      ])
    },
    [data, tasks, setTasks, updateTask]
  )

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided, snapshot) => (
        <span
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTaskDialog(data)
          }}
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
            <Checkbox
              checked={checked}
              onChange={handleCheckChange}
              onClick={(e) => e.stopPropagation()}
            />
            <a
              onClick={(e) => {
                if (e.target === e.currentTarget) setTaskDialog(data)
              }}
              className={cn("grow px-2 text-xs")}
            >
              {data.title}
            </a>
            <TimePreview
              actual={data.actual}
              estimate={data.estimate}
              toggleExtended={() => setTimeExtended(!timeExtended)}
            />
          </span>
          <TaskShortActions
            data={data}
            extended={extended && snapshot.isDragging === false}
            toggleExtended={() => setExtended(!extended)}
            isDragging={snapshot.isDragging}
            updateTask={(label: Label) => handleChangeLabel(label)}
          />
          <TimeSection
            extended={timeExtended}
            actual={data.actual}
            estimate={data.estimate}
            updateTask={handleChangeTime}
          />
          <SubtaskSection
            extended={extended}
            subtasks={data.subtasks}
            type="EXISTING"
            createSubtask={(title: string) => {
              createSubtask({ title, taskId: data.id, done: false, index: 0 })
            }}
            updateSubtask={(subtask: Subtask) => updateSubtask(subtask)}
          />
        </span>
      )}
    </Draggable>
  )
}

export default TaskComponent
