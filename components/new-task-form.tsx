import { TaskContext } from "@/contexts/TaskContextProvider"
import { cn } from "@/lib/utils"
import { useContext, useState } from "react"
import { TaskNewTypeOpt } from "types"
import SubtaskSection from "./task/subtask-section"
import TaskShortActions from "./task/task-short-actions"

type NewTaskFormProps = {
  data: TaskNewTypeOpt
  onBlur: () => void
  setTaskData: React.Dispatch<React.SetStateAction<TaskNewTypeOpt | undefined>>
  className?: string
}

const NewTaskForm = ({
  data,
  setTaskData,
  onBlur,
  className,
}: NewTaskFormProps) => {
  const [extended, setExtended] = useState<boolean>(false)
  const [inputRef, setInputRef] = useState<HTMLLabelElement | null>(null)
  const { createTask } = useContext(TaskContext)
  return (
    <span
      className={cn(
        "group flex w-full cursor-pointer flex-col rounded-xl border p-3 pt-0",
        "border-neutral-200 bg-white text-neutral-800",
        "dark:border-neutral-800 dark:bg-neutral-800 dark:text-white",
        className
      )}
      onClick={() => inputRef?.blur()}
    >
      <span className="flex w-full flex-row items-start py-2">
        <fieldset className="w-full pr-2">
          <label
            htmlFor="title"
            className="hidden"
            ref={(label) => setInputRef(label)}
          >
            Task name
          </label>
          <input
            className={cn(
              "w-full rounded-md border-[1.5px] border-transparent bg-transparent p-1  font-satoshi text-sm font-medium text-neutral-900 hover:border-dashed hover:border-purple-500  focus:border-dashed focus:border-purple-500",
              "dark:text-white"
            )}
            type={"text"}
            id="title"
            name="title"
            value={data.title}
            onChange={(e) => setTaskData({ ...data, title: e.target.value })}
            onClick={() => inputRef?.click()}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTask(data)
                setTaskData(undefined)
              }
            }}
            autoFocus
          />
        </fieldset>
        <span
          className={cn(
            "flex w-max rounded-md p-1 px-2 font-satoshi text-[0.65rem]",
            "bg-neutral-100 text-neutral-600",
            "hover:bg-neutral-500 hover:text-white",
            "dark:bg-neutral-600 dark:text-white",
            "dark:hover:bg-neutral-500",
            className
          )}
        >
          <p>0:00</p>
        </span>
      </span>
      <TaskShortActions
        data={data}
        extended={extended}
        toggleExtended={() => setExtended(!extended)}
        persistent={true}
      />
      <SubtaskSection extended={extended} subtasks={[]} />
    </span>
  )
}

export default NewTaskForm
