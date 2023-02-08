import * as RadixSeparator from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

type SeparatorProps = {
  orientation?: "horizontal" | "vertical"
  className?: string
  rootClassName?: string
}

const Separator = ({
  orientation = "horizontal",
  className,
  rootClassName,
}: SeparatorProps) => (
  <span
    className={cn(
      orientation === "horizontal"
        ? "h-[1px] w-full py-4"
        : "h-full w-[1px] px-4",
      rootClassName
    )}
  >
    <RadixSeparator.Root
      className={cn(
        "h-[1px] w-full",
        "bg-neutral-200",
        "dark:bg-neutral-600",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      orientation={orientation}
    />
  </span>
)

export default Separator
