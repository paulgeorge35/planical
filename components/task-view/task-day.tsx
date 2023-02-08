import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { compareDates } from "@/lib/utils"
import { format } from "date-fns"
import { useContext } from "react"
import NewTaskButton from "../new-task-button"

type TaskDayProps = {
  day: Date
}

const TaskDay = ({ day }: TaskDayProps) => {
  const { today } = useContext(ToolbarContext)
  return (
    <span className="p-2">
      <span className="flex w-[16vw] items-center pb-2">
        <h1 className="font-satoshi text-xl font-semibold">
          {format(day, "EEE")}
          <span className="text-neutral-500"> {format(day, "MMM dd")}</span>
        </h1>
        {compareDates(today, day) && (
          <p className="pl-2 text-xs text-primary">Today</p>
        )}
      </span>
      <NewTaskButton className="mb-2" tasks={[]} destination={day} />
    </span>
  )
}

export default TaskDay
