import { cn, formatTime } from "@/lib/utils"

type TimePreviewProps = {
  estimate: number
  actual: number
  toggleExtended?: () => void
  className?: string
}

const TimePreview = ({
  estimate,
  actual,
  toggleExtended,
  className,
}: TimePreviewProps) => {
  return (
    <a
      className={cn(
        "flex cursor-pointer rounded-md p-1 px-2 font-satoshi text-[0.65rem]",
        "bg-neutral-100 text-neutral-600",
        "hover:bg-neutral-500 hover:text-white",
        "dark:bg-neutral-600 dark:text-white",
        "dark:hover:bg-neutral-500",
        className
      )}
      onClick={(e) => {
        if (toggleExtended) toggleExtended()
      }}
    >
      <p>{`${actual > 0 ? `${formatTime(actual)} / ` : ""}${formatTime(
        estimate
      )}`}</p>
    </a>
  )
}

export default TimePreview
