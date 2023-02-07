import { cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"

const CalendarHeaderDay = ({ date }: { date: Date }) => {
  return (
    <th className="grow w-full p-2 font-normal">
      <a aria-label={format(date, "MMMM d, yyyy")}>
        <div className="flex items-center justify-center">
          <h1
            className={cn("text-sm text-neutral-700", "dark:text-neutral-300")}
          >
            {format(date, "EEE")}
          </h1>
          <h1
            className={cn(
              "text-sm ml-2 text-neutral-700",
              "dark:text-neutral-300",
              compareDates(date, new Date()) &&
                "bg-purple-700 ml-1 px-1 rounded text-neutral-300 font-bold"
            )}
          >
            {format(date, "d")}
          </h1>
        </div>
      </a>
    </th>
  )
}

const CalendarHeader = ({ weekToView }: { weekToView: Date[] }) => {
  return (
    <thead
      className={cn(
        "w-full flex border-neutral-300 border-b-[0.5px]",
        "dark:border-neutral-600"
      )}
    >
      <tr className="w-full inline-flex overflow-y-scroll py-1">
        <th>
          <div
            className={cn(
              "flex items-center w-max justify-center",
              weekToView.length === 1 && "hidden"
            )}
          >
            <h1 className="text-xs text-neutral-500 font-light p-1 opacity-0 select-none">
              All day
            </h1>
          </div>
        </th>
        {weekToView.map((date: Date, index: number) => (
          <CalendarHeaderDay key={index} date={date} />
        ))}
      </tr>
    </thead>
  )
}

export default CalendarHeader
