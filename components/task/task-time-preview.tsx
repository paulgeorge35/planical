import { cn, formatTime } from "@/lib/utils"

type TimePreviewProps = {
  estimate: number | null
  actual: number | null
  className?: string
}

const TimePreview = ({ estimate, actual, className }: TimePreviewProps) => {
  return estimate || actual ? (
    <span
      className={cn(
        "flex rounded-md p-1 px-2 font-satoshi text-[0.65rem]",
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
