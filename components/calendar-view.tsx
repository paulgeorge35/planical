import { ToolbarContext } from "@/contexts/ToolbarContext"
import { useContext } from "react"
import CalendarBody from "./calendar/calendar-body"
import CalendarHeader from "./calendar/calendar-header"

const CalendarView = () => {
  const { weekToView } = useContext(ToolbarContext)
  return (
    <div className="h-full w-full">
      {weekToView.length === 7 && (
        <table className="flex h-full w-full flex-col justify-start">
          <CalendarHeader weekToView={weekToView} />
          <CalendarBody weekToView={weekToView} />
        </table>
      )}
    </div>
  )
}

export default CalendarView
