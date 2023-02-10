import { Component1Icon, LoopIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { TaskAllFields, TaskNewTypeOpt } from "types"
import LabelColorBubble from "./label-color-bubble"

type TaskShortActionsProps = {
  data: TaskAllFields | TaskNewTypeOpt
  toggleExtended: () => void
  extended: boolean
  className?: string
  persistent?: boolean
}

const TaskShortActions = ({
  className,
  extended,
  toggleExtended,
  persistent,
  data: { label, recurrent, subtasks },
}: TaskShortActionsProps) => {
  return (
    <span
      className={cn(
        "flex flex-row items-center space-x-2 pt-2",
        "text-neutral-600",
        "dark:text-neutral-400",
        persistent ? "pl-2" : "pl-6",
        className
      )}
    >
      {label ? (
        <a
          className={cn(
            "flex flex-row items-center text-[0.65rem]",
            "hover:text-black",
            "dark:hover:text-white"
          )}
        >
          <LabelColorBubble color={label.color} />
          <p className="pl-1">{label.name}</p>
        </a>
      ) : (
        <a
          className={cn(
            "flex-row items-center text-[0.65rem]",
            persistent ? "flex" : "hidden group-hover:flex",
            "hover:text-black",
            "dark:hover:text-white"
          )}
        >
          Select label
        </a>
      )}
      {!recurrent && (
        <LoopIcon
          className={cn(
            "h-3 w-3",
            persistent ? "block" : "hidden group-hover:block",
            "hover:text-blue-500"
          )}
        />
      )}
      <a
        onClick={toggleExtended}
        className={cn(
          "flex-row items-center",
          "hover:text-blue-500",
          extended && "text-blue-500",
          persistent ? "flex" : "hidden group-hover:flex"
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
    </span>
  )
}

export default TaskShortActions
