import { ToolbarContext } from "@/contexts/ToolbarContext"
import { cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"
import { useContext } from "react"
import CalendarBody from "./calendar/calendar-body"
import CalendarHeader from "./calendar/calendar-header"
import NewTaskButton from "./new-task-button"

const SidebarRight = ({
  right,
  mainView,
}: {
  right: boolean
  mainView: "CALENDAR" | "TASKS"
}) => {
  const { today, dateToView } = useContext(ToolbarContext)
  return (
    <div
      className={cn(
        "p-3 border-l-[0.5px] w-[300px] min-h-full bg-slate-50 border-neutral-200 overflow-hidden",
        "dark:bg-neutral-900 dark:border-neutral-600",
        right ? "block" : "hidden",
        mainView === "CALENDAR"
          ? "dark:bg-neutral-900 bg-slate-50"
          : "dark:bg-neutral-800 bg-white absolute right-0 min-h-[calc(100vh-48px)] p-0"
      )}
    >
      {mainView === "CALENDAR" && (
        <span className="flex items-center pb-3">
          <h1 className="text-xl font-satoshi font-semibold">
            {format(dateToView, "EEE")}
            <span className="text-neutral-500">
              {" "}
              {format(dateToView, "MMM dd")}
            </span>
          </h1>
          {compareDates(today, dateToView) && (
            <p className="pl-2 text-xs text-primary">Today</p>
          )}
        </span>
      )}
      {mainView === "CALENDAR" ? (
        <span className="w-full">
          <NewTaskButton className="mb-2" tasks={[]} />
        </span>
      ) : (
        <span className="w-full">
          {dateToView && (
            <table className="w-full flex flex-col justify-start">
              <CalendarHeader weekToView={[dateToView]} />
              <CalendarBody weekToView={[dateToView]} />
            </table>
          )}
        </span>
      )}
    </div>
  )
}

export default SidebarRight
