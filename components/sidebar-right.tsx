import { ToolbarContext } from "@/contexts/ToolbarContext"
import { cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"
import { useContext } from "react"
import Separator from "./separator"

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
        "p-3 border-l-[0.5px] w-[300px] min-h-screen bg-slate-50 transition-all border-neutral-200 overflow-hidden",
        "dark:bg-neutral-900 dark:border-neutral-600",
        right ? "p-3 w-[300px]" : "p-0 w-0",
        mainView === "CALENDAR"
          ? "dark:bg-neutral-900 bg-slate-50"
          : "dark:bg-neutral-800 bg-white absolute right-0"
      )}
    >
      {mainView === "CALENDAR" ? (
        <span className="flex items-center">
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
      ) : (
        <span className="flex items-center justify-center">
          <h1 className="text-sm font-satoshi font-medium text-neutral-500">
            {format(dateToView, "EEE, MMM dd")}
          </h1>
          {compareDates(today, dateToView) && (
            <p className="pl-2 text-xs text-primary">Today</p>
          )}
        </span>
      )}
      {mainView === "CALENDAR" ? (
        <span className="flex items-center"></span>
      ) : (
        <span className="">
          <Separator />
        </span>
      )}
    </div>
  )
}

export default SidebarRight
