import { cn } from "@/lib/utils"

const LabelColorBubble = ({
  color,
  className,
  rootClassName,
}: {
  color: string
  className?: string
  rootClassName?: string
}) => {
  return (
    <span
      className={cn(
        "flex aspect-square items-center justify-center",
        rootClassName
      )}
    >
      <div
        className={cn("h-2 w-2 rounded-full", className)}
        style={{ backgroundColor: color }}
      />
    </span>
  )
}

export default LabelColorBubble
