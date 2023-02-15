import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn, timeIntervalFromDateAndDuration } from "@/lib/utils"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useContext } from "react"
// import { Draggable } from "react-beautiful-dnd"
import { TaskAllFields } from "types"

type TaskCardProps = {
  task: TaskAllFields
  className?: string
}

const TaskCard = ({ task, className }: TaskCardProps) => {
  const minutes = Math.round(task.estimate / 100) * 60 + (task.estimate % 100)
  const { setTaskDialog } = useContext(ToolbarContext)
  return (
    // <Draggable
    //   draggableId={task.id.toString()}
    //   index={task.intersectIndex || 0}
    // >
    //   {(provided) => (
    <div
      //   {...provided.draggableProps}
      //   {...provided.dragHandleProps}
      //   ref={provided.innerRef}
      style={{
        height: `${(minutes / 5) * 8}px`,
        width:
          task.intersectIndex && task.intersects
            ? `${
                (100 / (task.intersects + 1)) *
                (task.intersects + 1 - task.intersectIndex)
              }%`
            : "100%",
        left:
          task.intersects && task.intersectIndex && task.intersectIndex > 0
            ? `${(100 / (task.intersects + 1)) * task.intersectIndex}%`
            : "0",
        // zIndex: task.intersectIndex ? task.intersectIndex + 1 : 1,
      }}
      className={cn(
        "absolute top-0 left-0 z-[1] w-full max-w-full cursor-pointer overflow-hidden rounded border border-neutral-600/40 bg-neutral-100/50 p-1 pl-2 hover:z-10 hover:bg-neutral-100/95",
        "dark:border-neutral-900/40 dark:bg-neutral-900/50 dark:hover:bg-neutral-900/95",
        className
      )}
      onClick={() => setTaskDialog(task)}
    >
      <div
        className={cn(
          "space-between absolute top-0 left-0  h-full w-1"
          //   task.label && `bg-[${task.label.color}]`
        )}
        style={{
          backgroundColor: task && task.label ? task.label.color : "inherit",
        }}
      />
      <span className="flex max-w-[50%] flex-col">
        <p className={cn("text-xs font-semibold", task.done && "line-through")}>
          {task.title}
        </p>
        <p className="text-xs">
          {timeIntervalFromDateAndDuration(task.date, minutes)}
        </p>
      </span>
      {task.done && <CheckCircledIcon className="absolute right-2 top-2" />}
    </div>
    //   )}
    // </Draggable>
  )
}

export default TaskCard
