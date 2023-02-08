import { cn, formatTime } from "@/lib/utils"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { TaskType } from "types"
import Button from "./button"

type NewTaskButton = {
  className?: string
  tasks: TaskType[]
  destination?: Date | "dump"
}

const NewTaskButton = ({
  className,
  tasks,
  destination = "dump",
}: NewTaskButton) => {
  const sumByKey = (items: TaskType[], key: "actual" | "estimate") =>
    items.length === 0
      ? 0
      : items.map((item) => item[key]).reduce((a, b) => a + b)

  return (
    <Button
      className={cn(
        "m-0 h-12 w-full rounded-xl p-2",
        "bg-white text-neutral-400",
        "hover:border-blue-200 hover:bg-white hover:text-neutral-400 hover:shadow-md",
        "dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500",
        "dark:hover:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-500",
        className
      )}
      icon={PlusCircledIcon}
    >
      <span className="flex w-full items-center justify-between">
        <p>Add a task</p>
        {sumByKey(tasks, "actual") > 0 && sumByKey(tasks, "estimate") > 0 && (
          <p
            unselectable="on"
            className={cn(
              "flex h-full rounded-md p-1 px-2 font-satoshi text-[0.65rem]",
              "bg-neutral-100 text-neutral-600",
              "hover:bg-neutral-500 hover:text-white",
              "dark:bg-neutral-600 dark:text-white",
              "dark:hover:bg-neutral-500"
            )}
          >
            {sumByKey(tasks, "actual") > 0
              ? formatTime(sumByKey(tasks, "actual"))
              : ""}
            {sumByKey(tasks, "actual") > 0 && sumByKey(tasks, "estimate") > 0
              ? " / "
              : ""}
            {sumByKey(tasks, "estimate") > 0
              ? formatTime(sumByKey(tasks, "estimate"))
              : ""}
          </p>
        )}
      </span>
    </Button>
  )
}
export default NewTaskButton
