import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useContext } from "react"
import Button from "../button"

type TasksToolbarProps = {
  right: boolean
  mainView: "CALENDAR" | "TASKS"
}

const TasksToolbar = ({ right, mainView }: TasksToolbarProps) => {
  const { nextDay, prevDay, resetToday } = useContext(ToolbarContext)
  return (
    <div
      className={cn(
        "flex h-full w-[300px] items-center justify-between overflow-hidden border-l-[0.5px] border-neutral-200 transition-all",
        "dark:border-neutral-600",
        right ? "w-[300px] px-4" : "w-0 p-0",
        mainView === "CALENDAR" ? "dark:bg-neutral-900" : "dark:bg-neutral-800"
      )}
    >
      {mainView === "CALENDAR" ? (
        <span className="flex items-center ">
          <h1>🌤️ Tasks</h1>
        </span>
      ) : (
        <span className="flex items-center ">
          <h1>🕓 Timebox</h1>
        </span>
      )}
      <span className="flex h-full items-center py-2">
        <ChevronLeftIcon
          onClick={prevDay}
          className={cn(
            "h-4 w-4 origin-center transition-transform",
            "text-neutral-400",
            "hover:cursor-pointer hover:text-neutral-900",
            "dark:text-neutral-600",
            "dark:hover:text-neutral-300"
          )}
        />
        <Button onClick={resetToday} rootClassName="h-full" className="mx-1">
          Today
        </Button>
        <ChevronLeftIcon
          onClick={nextDay}
          className={cn(
            "h-4 w-4 origin-center rotate-180 transition-transform",
            "text-neutral-400",
            "hover:cursor-pointer hover:text-neutral-900",
            "dark:text-neutral-600",
            "dark:hover:text-neutral-300"
          )}
        />
      </span>
    </div>
  )
}

export default TasksToolbar
