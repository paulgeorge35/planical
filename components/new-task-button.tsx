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
        "m-0 w-full px-2 py-2 rounded-xl h-12",
        "bg-white text-neutral-400",
        "hover:bg-white hover:text-neutral-400 hover:border-blue-200 hover:shadow-md",
        "dark:bg-neutral-800 dark:text-neutral-500 dark:border-neutral-800",
        "dark:hover:bg-neutral-800 dark:hover:text-neutral-500 dark:hover:border-neutral-600",
        className
      )}
      icon={PlusCircledIcon}
    >
      <span className="w-full flex justify-between items-center">
        <p>Add a task</p>
        {sumByKey(tasks, "actual") > 0 && sumByKey(tasks, "estimate") > 0 && (
          <p
            unselectable="on"
            className={cn(
              "flex font-satoshi p-1 px-2 rounded-md text-[0.65rem] h-full",
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
