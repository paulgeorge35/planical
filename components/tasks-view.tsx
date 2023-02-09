import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { useContext } from "react"
import TaskDay from "./task-view/task-day"

type TaskViewProps = {
  sidebarLeftWidth: number
}
const TasksView = ({ sidebarLeftWidth }: TaskViewProps) => {
  const { weekFromNow } = useContext(ToolbarContext)
  return (
    <div
      style={{
        width: `calc(100vw - ${sidebarLeftWidth}px)`,
        maxWidth: `calc(100vw - ${Math.max(250, sidebarLeftWidth)}px)`,
        minWidth: `calc(100vw - ${Math.min(500, sidebarLeftWidth)}px)`,
      }}
      className="flex h-full w-full flex-row justify-start space-x-2 overflow-x-scroll"
    >
      {weekFromNow.map((day, index) => (
        <TaskDay
          key={index}
          day={new Date(day.toISOString().split("T")[0].replaceAll("-", "/"))}
        />
      ))}
    </div>
  )
}

export default TasksView
