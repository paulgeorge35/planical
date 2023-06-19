import { TaskContext } from "@/contexts/TaskContextProvider"
import { cn } from "@/lib/utils"
import { Subtask } from "@prisma/client"
import {
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  DotsVerticalIcon,
  LoopIcon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { useCallback, useContext, useState } from "react"
import { TaskAllFields } from "types"
import Button from "../button"
import Checkbox from "../checkbox"
import DatePicker from "../date-picker"
import Separator from "../separator"
import SubtaskComponent from "../task/subtask-component"
import TextArea from "../textarea"

type TaskDialogContentProps = {
  task: TaskAllFields
}

const TaskDialogContent = ({ task }: TaskDialogContentProps) => {
  const [data, setData] = useState<TaskAllFields>(task)
  const { createSubtask, updateSubtask, updateTask, setTasks, tasks } =
    useContext(TaskContext)

  const handleCheckChange = useCallback(() => {
    if (!data.done) {
      updateTask({ ...data, done: true }, true)
      setTasks([
        ...tasks.filter((task) => task.id !== data.id),
        { ...data, done: true },
      ])
    } else {
      updateTask({ ...data, done: false }, true)
      setTasks([
        ...tasks.map((task) =>
          task.id === data.id ? { ...data, done: false } : task
        ),
      ])
    }
  }, [data, tasks, setTasks, updateTask])
  return (
    <div className={cn("")}>
      <section className="flex grow flex-row items-center px-8 pt-4">
        <Checkbox
          checked={data.done}
          className={cn("mr-2 h-6 w-6")}
          onChange={handleCheckChange}
        />
        <input
          className={cn(
            "flex-auto grow resize-none overflow-y-hidden break-words rounded-lg bg-transparent px-2 text-2xl font-bold outline-none hover:bg-neutral-100 focus:bg-neutral-100",
            "dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          )}
          type={"text"}
          id="title"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTask(data, true)
              //   setData(data)
              setTasks([...tasks.map((t) => (t.id === task.id ? data : t))])
            }
          }}
          onBlur={() => {
            updateTask(data)
            setData(data)
          }}
          placeholder="Title"
        />
        <DotsVerticalIcon
          className={cn(
            "flex h-4 w-4 cursor-pointer items-center justify-center",
            "hover:text-neutral-800",
            "dark:hover:text-white",
            "text-neutral-400"
          )}
        />
      </section>
      <section className="flex flex-col px-8">
        <Separator />
        <span className="flex items-center pb-2">
          <h1
            className={cn(
              "flex w-40 items-center text-sm font-[500] text-neutral-500",
              "dark:text-neutral-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Task date
          </h1>
          <DatePicker
            selected={new Date(data.date || 0)}
            onChange={(date) => setData({ ...data, date })}
            showTimeInput
            customTimeInput={
              <input
                value={data.date?.toString() || ""}
                onChange={(e) =>
                  setData({ ...data, date: new Date(e.target.value) })
                }
                className={cn("")}
              />
            }
          />
        </span>
        <span className="flex items-center pb-2">
          <h1
            className={cn(
              "flex w-40 items-center text-sm font-[500] text-neutral-500",
              "dark:text-neutral-500"
            )}
          >
            <ClockIcon className="mr-2 h-4 w-4" />
            Estimated time
          </h1>
        </span>
        <span className="flex items-center pb-2">
          <h1
            className={cn(
              "flex w-40 items-center text-sm font-[500] text-neutral-500",
              "dark:text-neutral-500"
            )}
          >
            <ClockIcon className="mr-2 h-4 w-4" />
            Actual time
          </h1>
        </span>
        <span className="flex items-center pb-2">
          <h1
            className={cn(
              "flex w-40 items-center text-sm font-[500] text-neutral-500",
              "dark:text-neutral-500"
            )}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Label
          </h1>
        </span>
        <span className="flex items-center pb-2">
          <h1
            className={cn(
              "flex w-40 items-center text-sm font-[500] text-neutral-500",
              "dark:text-neutral-500"
            )}
          >
            <LoopIcon className="mr-2 h-4 w-4" />
            Repeats
          </h1>
        </span>
      </section>
      <section className="flex flex-col px-8">
        <Separator />
        <h1
          className={cn("font-[500] text-neutral-700", "dark:text-neutral-500")}
        >
          Notes
        </h1>
        <TextArea
          className={cn("bg-transparent text-sm dark:text-neutral-300")}
          id="notes"
          value={data.notes || ""}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          onBlur={() => {
            updateTask(data)
            setData(data)
          }}
          placeholder="Add any notes to the task"
        />
      </section>
      <section className="flex flex-col pb-4">
        <Separator rootClassName="px-8" />
        <h1
          className={cn(
            "px-7 font-[500] text-neutral-700",
            "dark:text-neutral-500"
          )}
        >
          Subtasks
        </h1>
        <span className={cn("flex flex-col space-y-2 pt-1")}>
          {task.subtasks.map((subtask, index) => (
            <SubtaskComponent
              key={index}
              subtask={subtask}
              updateSubtask={(subtask: Subtask) => updateSubtask(subtask)}
              persistentActions={false}
            />
          ))}
          <Button
            onClick={() =>
              createSubtask({
                title: "",
                taskId: task.id,
                done: false,
                index: 0,
              })
            }
            icon={PlusIcon}
            className="ml-1 border-0 bg-transparent p-0 px-7 text-sm font-[500] hover:text-blue-500 dark:hover:text-blue-500"
          >
            Add subtask
          </Button>
        </span>
      </section>
    </div>
  )
}

export default TaskDialogContent
