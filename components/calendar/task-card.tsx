import { cn } from "@/lib/utils"
import { TaskAllFields } from "types"

type TaskCardProps = {
  task: TaskAllFields
  className?: string
}

const TaskCard = ({ task, className }: TaskCardProps) => {
  const minutes = Math.round(task.estimate / 100) * 60 + (task.estimate % 100)
  return (
    <div
      className={cn(
        "absolute top-0 left-0 z-10 w-full rounded bg-red-400",
        className
      )}
      style={{
        height: `${(minutes / 5) * 8}px`,
        width: task.intersects ? `${100 / task.intersects}%` : "100%",
        left:
          task.intersects && task.intersectIndex
            ? `${(100 / task.intersects) * task.intersectIndex}%`
            : "0",
        backgroundColor: task && task.label ? task.label.color : "inherit",
      }}
    ></div>
  )
}

export default TaskCard
