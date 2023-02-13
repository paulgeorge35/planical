import {
  Component1Icon,
  LoopIcon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { TaskAllFields, TaskNewTypeOpt } from "types"
import LabelButtonPopover from "./label-button-popover"
import { useContext, useState } from "react"
import { TaskContext } from "@/contexts/TaskContextProvider"
import { Label } from "@prisma/client"

type TaskShortActionsProps = {
  data: TaskAllFields | TaskNewTypeOpt
  toggleExtended: () => void
  extended: boolean
  updateTask?: (label: Label) => void
  className?: string
  persistent?: boolean
  isDragging?: boolean
}

const TaskShortActions = ({
  className,
  extended,
  toggleExtended,
  persistent,
  updateTask,
  isDragging,
  data: { label, recurrent, subtasks, notes },
}: TaskShortActionsProps) => {
  const [showLabelPopover, setShowLabelPopover] = useState(false)
  const { labels } = useContext(TaskContext)
  return (
    <span
      className={cn(
        "flex flex-row items-center",
        "text-neutral-600",
        "dark:text-neutral-400",
        persistent ? "pl-2" : "pl-6",
        className
      )}
    >
      {label ? (
        <span
          className={cn(
            "mr-2 flex cursor-pointer flex-row items-center text-[0.65rem]",
            "hover:text-black",
            "dark:hover:text-white",
            (extended || showLabelPopover) && "flex"
          )}
        >
          <LabelButtonPopover
            label={label}
            labels={labels}
            open={showLabelPopover}
            setOpen={(open: boolean) => setShowLabelPopover(open)}
            updateLabel={(label: Label) => updateTask && updateTask(label)}
          />
        </span>
      ) : (
        <span
          className={cn(
            "mr-2 cursor-pointer flex-row  items-center text-[0.65rem]",
            persistent || showLabelPopover ? "flex" : "hidden group-hover:flex",
            isDragging && "hidden group-hover:hidden",
            "hover:text-black",
            "dark:hover:text-white"
          )}
        >
          <LabelButtonPopover
            label={null}
            labels={labels}
            open={showLabelPopover}
            setOpen={(open: boolean) => setShowLabelPopover(open)}
            updateLabel={(label: Label) => updateTask && updateTask(label)}
          />
        </span>
      )}
      {!recurrent && (
        <LoopIcon
          className={cn(
            "mr-2 h-3 w-3",
            persistent ? "block" : "hidden cursor-pointer group-hover:block",
            isDragging && "hidden group-hover:hidden",
            "hover:text-blue-500"
          )}
        />
      )}
      <a
        onClick={(e) => toggleExtended()}
        className={cn(
          "mr-2 cursor-pointer flex-row items-center",
          "hover:text-blue-500",
          isDragging && "hidden group-hover:hidden",
          persistent ? "flex" : "hidden group-hover:flex",
          extended && subtasks && subtasks.length !== 0 && "flex text-blue-500"
        )}
      >
        <Component1Icon
          className={cn("flex h-3 w-3 items-center justify-center")}
        />
        {subtasks && subtasks.length !== 0 && (
          <span className="pl-1 font-satoshi text-[0.65rem]">{`${
            subtasks.filter((s) => s.done).length
          } / ${subtasks.length}`}</span>
        )}
      </a>
      {notes && (
        <TextAlignLeftIcon
          className={cn(
            "flex cursor-pointer flex-row items-center",
            "m-0 h-3",
            isDragging && "hidden group-hover:hidden",
            "hover:text-blue-500"
          )}
        />
      )}
    </span>
  )
}

export default TaskShortActions
