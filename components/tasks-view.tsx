import { ToolbarContext } from "@/contexts/ToolbarContext"
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
      className="w-full h-full overflow-x-scroll flex justify-start flex-row space-x-2"
    >
      {weekFromNow.map((day, index) => (
        <TaskDay key={index} day={day} />
      ))}
    </div>
  )
}

export default TasksView
