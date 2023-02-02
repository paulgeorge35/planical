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
        "flex justify-center items-center aspect-square",
        rootClassName
      )}
    >
      <div
        className={cn("rounded-full w-2 h-2", className)}
        style={{ backgroundColor: color }}
      />
    </span>
  )
}

export default LabelColorBubble
