import { cn } from "@/lib/utils"
import { Label, Subtask, Task } from "@prisma/client"
import { useState } from "react"
import { PickAndFlatten } from "types"
import SubtaskSection from "./task/subtask-section"
import TaskShortActions from "./task/task-short-actions"
import TimePreview from "./task/task-time-preview"

type NewTaskFormProps = {
  data: PickAndFlatten<
    Omit<Task, "id" | "createdAt" | "updatedAt" | "userId"> & {
      subtasks?: Subtask[]
      label?: Label
    }
  >
  className?: string
}

const NewTaskForm = ({ data, className }: NewTaskFormProps) => {
  const [extended, setExtended] = useState<boolean>(false)
  return (
    <span
      className={cn(
        "group flex w-full cursor-pointer flex-col rounded-xl border p-3",
        "border-neutral-200 bg-white text-neutral-800",
        "hover:border-blue-200 hover:shadow-md",
        "dark:border-neutral-800 dark:bg-neutral-800 dark:text-white",
        "dark:hover:border-neutral-600",
        className
      )}
    >
      <span className="flex flex-row items-center py-2">
        <input type={"text"} className="w-full" />
        <TimePreview actual={0} estimate={0} />
      </span>
      <TaskShortActions
        data={data}
        extended={extended}
        toggleExtended={() => setExtended(!extended)}
      />
      <SubtaskSection extended={extended} subtasks={[]} />
    </span>
  )
}

export default NewTaskForm
