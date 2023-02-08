import { cn, compareDates } from "@/lib/utils"
import { format } from "date-fns"

const CalendarHeaderDay = ({ date }: { date: Date }) => {
  return (
    <th className="w-full grow p-2 font-normal">
      <a aria-label={format(date, "MMMM d, yyyy")}>
        <div className="flex items-center justify-center">
          <h1
            className={cn("text-sm text-neutral-700", "dark:text-neutral-300")}
          >
            {format(date, "EEE")}
          </h1>
          <h1
            className={cn(
              "ml-2 text-sm text-neutral-700",
              "dark:text-neutral-300",
              compareDates(date, new Date()) &&
                "ml-1 rounded bg-purple-700 px-1 font-bold text-neutral-300"
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
        "flex w-full border-b-[0.5px] border-neutral-300",
        "dark:border-neutral-600"
      )}
    >
      <tr className="inline-flex w-full overflow-y-scroll py-1">
        <th>
          <div
            className={cn(
              "flex w-max items-center justify-center",
              weekToView.length === 1 && "hidden"
            )}
          >
            <h1 className="select-none p-1 text-xs font-light text-neutral-500 opacity-0">
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
