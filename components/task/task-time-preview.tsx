import { cn, formatTime } from "@/lib/utils"

type TimePreviewProps = {
  estimate?: number
  actual?: number
  className?: string
}

const TimePreview = ({ estimate, actual, className }: TimePreviewProps) => {
  return estimate || actual ? (
    <span
      className={cn(
        "flex font-satoshi p-1 px-2 rounded-md text-[0.65rem]",
        "bg-neutral-100 text-neutral-600",
        "hover:bg-neutral-500 hover:text-white",
        "dark:bg-neutral-600 dark:text-white",
        "dark:hover:bg-neutral-500",
        className
      )}
    >
      <p>
        {actual ? formatTime(actual) : ""}
        {estimate && actual ? " / " : ""}
        {estimate ? formatTime(estimate) : ""}
      </p>
    </span>
  ) : null
}

export default TimePreview
