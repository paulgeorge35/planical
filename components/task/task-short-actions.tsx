import { cn } from "@/lib/utils"
import { Component1Icon, LoopIcon } from "@radix-ui/react-icons"
import { TaskType } from "types"
import LabelColorBubble from "./label-color-bubble"

type TaskShortActionsProps = {
  data: TaskType
  toggleExtended: () => void
  extended: boolean
  className?: string
}

const TaskShortActions = ({
  className,
  extended,
  toggleExtended,
  data: { label, recurrent, subtasks },
}: TaskShortActionsProps) => {
  return (
    <span
      className={cn(
        "pl-6 flex flex-row items-center space-x-2",
        "text-neutral-600",
        "dark:text-neutral-400",
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
            "hidden flex-row items-center text-[0.65rem]",
            "group-hover:flex",
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
            "hidden w-3 h-3 group-hover:block",
            "hover:text-blue-500"
          )}
        />
      )}
      <a
        onClick={toggleExtended}
        className={cn(
          "flex flex-row items-center",
          "hover:text-blue-500",
          extended && "text-blue-500"
        )}
      >
        <Component1Icon
          className={cn("flex justify-center items-center w-3 h-3")}
        />
        {subtasks.length !== 0 && (
          <span className="pl-1 font-satoshi text-[0.65rem]">{`${
            subtasks.filter((s) => s.done).length
          } / ${subtasks.length}`}</span>
        )}
      </a>
    </span>
  )
}

export default TaskShortActions
