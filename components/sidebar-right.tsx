import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"
import { useContext, useState } from "react"
import CalendarBody from "./calendar/calendar-body"
import CalendarHeader from "./calendar/calendar-header"
import NewTaskButton from "./new-task-button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { TaskNewTypeOpt } from "types"
import { TaskContext } from "@/contexts/TaskContextProvider"
import NewTaskForm from "./new-task-form"
import TaskComponent from "./task"
import { Droppable } from "react-beautiful-dnd"

const SidebarRight = ({
  right,
  mainView,
}: {
  right: boolean
  mainView: "CALENDAR" | "TASKS"
}) => {
  const { today, dateToView, prevDay, nextDay, USER_PREF_NEW_TASK_POSITION } =
    useContext(ToolbarContext)
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState<TaskNewTypeOpt>()
  const { tasks } = useContext(TaskContext)
  return (
    <div
      className={cn(
        "flex min-h-full w-[300px] flex-col overflow-hidden border-l-[0.5px] border-neutral-200 bg-slate-50 p-3",
        "dark:border-neutral-600 dark:bg-neutral-900",
        right ? "block" : "hidden",
        mainView === "CALENDAR"
          ? "bg-slate-50 dark:bg-neutral-900"
          : "absolute right-0 min-h-[calc(100vh-48px)] bg-white p-0 dark:bg-neutral-800 phone:hidden",
        "phone:!h-screen phone:!w-screen"
      )}
    >
      {mainView === "CALENDAR" && (
        <span
          className={cn(
            "flex items-center pb-3",
            "phone:justify-between phone:px-4"
          )}
        >
          <ChevronLeftIcon
            onClick={prevDay}
            className={cn(
              "hidden h-8 w-8 origin-center transition-transform",
              "text-neutral-400",
              "hover:cursor-pointer hover:text-neutral-900",
              "dark:text-neutral-600",
              "dark:hover:text-neutral-300",
              "phone:!block"
            )}
          />
          <span className={cn("flex items-center")}>
            <h1 className="font-satoshi text-xl font-semibold">
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
          <ChevronLeftIcon
            onClick={nextDay}
            className={cn(
              "hidden h-8 w-8 origin-center rotate-180 transition-transform",
              "text-neutral-400",
              "hover:cursor-pointer hover:text-neutral-900",
              "dark:text-neutral-600",
              "dark:hover:text-neutral-300",
              "phone:!block"
            )}
          />
        </span>
      )}
      {mainView === "CALENDAR" ? (
        <span className="flex h-full w-full flex-col space-y-2">
          <NewTaskButton
            className="mb-4"
            tasks={tasks.filter(
              (task) =>
                task &&
                task.date &&
                compareDates(new Date(task.date), dateToView)
            )}
            toggle={() => {
              setIsAdding(true)
              setNewTask({
                title: "",
                notes: "",
                recurrent: false,
                estimate: 0,
                actual: 0,
                date: dateToView,
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
          <Droppable droppableId={dateToView.toString()}>
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
                      task?.date &&
                      compareDates(new Date(task.date), dateToView)
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
        </span>
      ) : (
        <span className="w-full">
          {dateToView && (
            <table className="flex w-full flex-col justify-start">
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
