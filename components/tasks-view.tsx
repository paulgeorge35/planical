import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { compareDates } from "@/lib/utils"
import { useContext, useEffect, useRef } from "react"
import TaskDay from "./task-view/task-day"

type TaskViewProps = {
  sidebarLeftWidth: number
}
const TasksView = ({ sidebarLeftWidth }: TaskViewProps) => {
  const { dateIntervalToView, addPrevWeek, addNextWeek, today } =
    useContext(ToolbarContext)
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.scrollTo(324 * 7, 0)
  }, [])

  const handleScroll = () => {
    if (containerRef.current) {
      console.log(containerRef.current.scrollLeft)
      if (containerRef.current.scrollLeft < 324) {
        addPrevWeek()
      } else if (
        containerRef.current.scrollLeft + 100 >=
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      ) {
        addNextWeek()
      }
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: `calc(100vw - ${sidebarLeftWidth}px)`,
        maxWidth: `calc(100vw - ${Math.max(250, sidebarLeftWidth)}px)`,
        minWidth: `calc(100vw - ${Math.min(500, sidebarLeftWidth)}px)`,
      }}
      className="flex h-full w-full flex-row justify-start space-x-2 overflow-x-scroll"
    >
      {dateIntervalToView.map((day, index) => (
        <TaskDay key={index} day={day} isToday={compareDates(today, day)} />
      ))}
    </div>
  )
}

export default TasksView
