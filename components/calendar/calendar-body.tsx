import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn, compareDates } from "@/lib/utils"
import { TriangleRightIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useContext, useEffect, useRef, useState } from "react"
import Task from "./task"

type CalendarHourProps = {
  isFirst: boolean
  isToday: boolean
  date: Date
  hour: number
  hourProgress: number
  timeSlots?: number
}

type CalendarHourHeadProps = {
  hour: number
  isCurrentHour: boolean
  hourProgress: number
  timeSlots?: number
}

type CalendarTimeSlotProps = {
  date: Date
  hour: number
  minute: number
  timeSlots?: number
}

const CalendarHour = ({
  isFirst,
  isToday,
  hourProgress,
  date,
  hour,
  timeSlots = 12,
}: CalendarHourProps) => {
  const currentHourRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    currentHourRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])
  return (
    <td
      className={cn(
        "relative w-full border-neutral-300",
        "dark:border-neutral-600",
        !isFirst && "border-l-[0.5px]"
      )}
    >
      {isToday && (
        <div
          style={{ top: `${hourProgress - 1}px` }}
          className={cn("absolute left-0 top-[-1px] h-[1px] w-full bg-red-500")}
        />
      )}
      <div ref={isToday ? currentHourRef : null} className="flex flex-col">
        {Array.from({ length: timeSlots }, (_, index) => {
          const minute = index * (60 / timeSlots)
          return (
            <CalendarTimeSlot
              key={index}
              date={date}
              hour={hour}
              minute={minute}
            />
          )
        })}
      </div>
    </td>
  )
}

const CalendarHourHead = ({
  hour,
  isCurrentHour,
  hourProgress,
  timeSlots = 12,
}: CalendarHourHeadProps) => {
  const getTimeStamp = (slot: number) => {
    let date = new Date()
    date.setHours(hour)
    date.setSeconds(0)
    date.setMilliseconds(0)
    date.setMinutes(slot * (60 / timeSlots))
    return format(date, "ha")
  }

  return (
    <td
      className={cn(
        "relative border-r-[0.5px] border-neutral-300",
        "dark:border-neutral-600"
      )}
    >
      {isCurrentHour && (
        <TriangleRightIcon
          color="red"
          style={{ top: `${hourProgress - 8}px` }}
          className={cn("absolute left-[-6px] top-[-8px]")}
        />
      )}
      <div className="flex w-[50px] flex-col">
        {Array.from({ length: timeSlots }, (_, index) => {
          return (
            <div key={index} className="flex h-2 w-full justify-end">
              {index === 0 && (
                <b
                  className={cn(
                    "p-1 text-[0.65rem] font-light text-neutral-500",
                    "dark:text-neutral-400"
                  )}
                >
                  {getTimeStamp(index)}
                </b>
              )}
            </div>
          )
        })}
      </div>
    </td>
  )
}

const CalendarTimeSlot = ({
  hour,
  date,
  minute,
  timeSlots = 12,
}: CalendarTimeSlotProps) => {
  const cleanDate = (date: Date) => {
    let cleanedDate = new Date(date)
    cleanedDate.setHours(hour)
    cleanedDate.setMinutes(minute)
    cleanedDate.setSeconds(0)
    cleanedDate.setMilliseconds(0)
    return cleanedDate
  }
  const [interval, _] = useState({
    start: cleanDate(date),
    end: cleanDate(date).setMinutes(minute + 60 / timeSlots),
  })
  return (
    <div className="relative h-2 w-full overflow-visible">
      {/* <Task minutes={10} /> */}
    </div>
  )
}

const CalendarBody = ({ weekToView }: { weekToView?: Date[] }) => {
  const { today, isWeekToView } = useContext(ToolbarContext)
  const [hourProgress, setHourProgress] = useState(
    Math.round((98 / 3600000) * (new Date().getTime() % 3600000))
  )
  const [timeDiff, setTimeDiff] = useState(
    Math.round(new Date().getTime() % 60000)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setHourProgress(
        Math.round((98 / 3600000) * (new Date().getTime() % 3600000))
      )
      setTimeDiff(60000)
    }, timeDiff)
    return () => {
      clearInterval(interval)
    }
  }, [timeDiff])
  return (
    <tbody
      className={cn(
        "flex w-full grow flex-col border-b-[0.5px] border-neutral-300",
        "dark:border-neutral-600"
      )}
    >
      <tr
        className={cn(
          "inline-flex w-full overflow-y-scroll border-b-[0.5px] border-neutral-300",
          "dark:border-neutral-600"
        )}
      >
        <td
          className={cn(
            "border-r-[0.5px] border-neutral-300 ",
            "dark:border-neutral-600"
          )}
        >
          <div className="flex w-[50px] items-center justify-center">
            <b
              className={cn(
                "p-1 text-[0.65rem] font-light text-neutral-500",
                "dark:text-neutral-400"
              )}
            >
              All day
            </b>
          </div>
        </td>
        {weekToView?.map((date: Date, index: number) => (
          <td
            key={index}
            data-date={format(date, "EEE MMM dd yyyy")}
            className={cn(
              "w-full border-neutral-300",
              "dark:border-neutral-600",
              index !== 0 && "border-l-[0.5px]"
            )}
          >
            <div className="flex items-center justify-center"></div>
          </td>
        ))}
      </tr>
      <tr className="flex w-full grow p-0">
        <td className="h-[calc(100vh-118.1px)] w-full p-0">
          <div className="h-full overflow-y-scroll">
            <table className="w-full">
              <tbody className="w-full">
                {Array.from({ length: 24 }, (_, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "inline-flex w-full border-b-[0.5px] border-neutral-300",
                      "dark:border-neutral-600"
                    )}
                  >
                    <CalendarHourHead
                      key={index}
                      hour={index}
                      isCurrentHour={
                        index === new Date().getHours() &&
                        (weekToView || false) &&
                        ((weekToView.length > 1 && isWeekToView()) ||
                          (weekToView.length === 1 &&
                            compareDates(weekToView[0], today)))
                      }
                      hourProgress={hourProgress}
                    />
                    {weekToView?.map((date: Date, indexSecond: number) => (
                      <CalendarHour
                        key={`${index}${indexSecond}}`}
                        date={date}
                        isToday={
                          index === new Date().getHours() &&
                          compareDates(date, today)
                        }
                        hourProgress={hourProgress}
                        isFirst={indexSecond === 0}
                        hour={index}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

export default CalendarBody
