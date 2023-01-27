import { cn } from "@/lib/utils"
import { useState } from "react"
import { TaskType } from "types"
import Checkbox from "./checkbox"
import SubtaskSection from "./task/subtask-section"
import TaskShortActions from "./task/task-short-actions"
import TimePreview from "./task/task-time-preview"

type TaskProps = {
  data: TaskType
  className?: string
}

const Task = ({ data, className }: TaskProps) => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false)
  const [extended, setExtended] = useState<boolean>(false)
  return (
    <span
      className={cn(
        "group border w-full rounded-xl p-3 flex flex-col cursor-pointer",
        "bg-white text-neutral-800 border-neutral-200",
        "hover:border-blue-200 hover:shadow-md",
        "dark:bg-neutral-800 dark:text-white dark:border-neutral-800",
        "dark:hover:border-neutral-600",
        className
      )}
    >
      <span className="flex flex-row items-center">
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        <p className={cn("text-xs grow px-2")}>{data.title}</p>
        <TimePreview actual={data.actual} estimate={data.estimate} />
      </span>
      <TaskShortActions
        data={data}
        extended={extended}
        toggleExtended={() => setExtended(!extended)}
      />
      <SubtaskSection extended={extended} subtasks={data.subtasks} />
    </span>
  )
}

export default Task
