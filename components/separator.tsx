import * as RadixSeparator from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

type SeparatorProps = {
  orientation?: "horizontal" | "vertical"
  className?: string
}

const Separator = ({ orientation, className }: SeparatorProps) => (
  <RadixSeparator.Root
    className={cn(
      "m-4 w-full h-[1px]",
      "bg-neutral-200",
      "dark:bg-neutral-600",
      orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]",
      className
    )}
    orientation={orientation}
    style={{ margin: "15px 0" }}
  />
)

export default Separator
