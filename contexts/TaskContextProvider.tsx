import { createContext, useEffect, useState } from "react"
import { TaskContextType, TaskAllFields } from "types"

export const TaskContext = createContext({
  tasks: [],
  setTasks: () => null,
  isFetching: false,
} as TaskContextType)

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [tasks, setTasks] = useState<TaskAllFields[]>([])

  async function fetchTasks() {
    const res = await (
      await fetch("/api/tasks/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      })
    ).json()
    return res
  }
  const fetchData = async () => {
    setIsFetching(true)
    const { tasks } = await fetchTasks()
    setTasks(tasks)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const value = {
    tasks,
    setTasks: (tasks: TaskAllFields[]) => setTasks(tasks),
    isFetching,
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
