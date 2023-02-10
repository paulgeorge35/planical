import { cn, formatTime } from "@/lib/utils"
import { Task } from "@prisma/client"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { TaskType } from "types"
import Button from "./button"

type NewTaskButton = {
  className?: string
  tasks: Task[]
  toggle?: () => void
}

const NewTaskButton = ({ className, tasks, toggle }: NewTaskButton) => {
  const sumByKey = (items: Task[], key: "actual" | "estimate") =>
    items?.length === 0 || !items
      ? 0
      : (items
          .map((item) => item && item[key])
          .reduce((a, b) => (a ? a : 0) + (b ? b : 0)) as number)

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
      onClick={toggle}
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
