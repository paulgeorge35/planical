import { ToolbarContext } from "@/contexts/ToolbarContext"
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
        "flex overflow-hidden justify-between items-center h-full border-l-[0.5px] w-[300px] transition-all border-neutral-200",
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
      <span className="flex items-center h-full py-2">
        <ChevronLeftIcon
          onClick={prevDay}
          className={cn(
            "origin-center h-4 w-4 transition-transform",
            "text-neutral-400",
            "hover:text-neutral-900 hover:cursor-pointer",
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
            "origin-center h-4 w-4 transition-transform rotate-180",
            "text-neutral-400",
            "hover:text-neutral-900 hover:cursor-pointer",
            "dark:text-neutral-600",
            "dark:hover:text-neutral-300"
          )}
        />
      </span>
    </div>
  )
}

export default TasksToolbar
