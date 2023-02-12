import { TaskContext } from "@/contexts/TaskContextProvider"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { adjustDateToTimezone, cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"
import { useContext, useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { TaskNewTypeOpt } from "types"
import NewTaskButton from "../new-task-button"
import NewTaskForm from "../new-task-form"
import TaskComponent from "../task"

type TaskDayProps = {
  day: Date
}

const TaskDay = ({ day }: TaskDayProps) => {
  const { today, USER_PREF_NEW_TASK_POSITION } = useContext(ToolbarContext)
  const { tasks } = useContext(TaskContext)
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState<TaskNewTypeOpt>()
  return (
    <span className="flex h-full flex-col p-2 pt-3">
      <span className="flex w-[16vw] items-center pb-3">
        <h1 className="font-satoshi text-xl font-semibold">
          {format(day, "EEE")}
          <span className="text-neutral-500"> {format(day, "MMM dd")}</span>
        </h1>
        {compareDates(today, day) && (
          <p className="pl-2 text-xs text-primary">Today</p>
        )}
      </span>
      <div className="flex h-full flex-col">
        <NewTaskButton
          className="mb-4"
          tasks={tasks.filter(
            (task) =>
              task && task.date && compareDates(new Date(task.date), day)
          )}
          toggle={() => {
            setIsAdding(true)
            setNewTask({
              title: "",
              notes: "",
              recurrent: false,
              estimate: 0,
              actual: 0,
              date: day,
              dump: false,
              done: false,
              archived: false,
              labelId: null,
              index: USER_PREF_NEW_TASK_POSITION === "TOP" ? 0 : 1,
              indexes: [],
            })
          }}
        />
        {isAdding && newTask !== undefined && (
          <NewTaskForm
            data={newTask}
            setTaskData={setNewTask}
            onBlur={() => {
              setIsAdding(false)
              setNewTask(undefined)
            }}
          />
        )}
        <Droppable droppableId={day.toString()}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "flex grow flex-col rounded-lg transition-colors duration-200 ease-in-out",
                snapshot.isDraggingOver && "bg-purple-500/5"
              )}
            >
              {tasks
                ?.filter(
                  (task) =>
                    task?.date && compareDates(new Date(task?.date), day)
                )
                .sort((a, b) => a?.index - b?.index)
                .map((task, index) => (
                  <TaskComponent
                    key={task.id}
                    index={index}
                    data={task}
                    className="mb-2"
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </span>
  )
}

export default TaskDay
