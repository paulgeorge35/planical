import * as RadixSeparator from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical"
}) => (
  <RadixSeparator.Root
    className={cn(
      "m-4",
      "bg-neutral-200",
      "dark:bg-neutral-600",
      orientation === "horizontal" ? "w-full h-[1px]" : "h-full w-[1px]"
    )}
    orientation={orientation}
    style={{ margin: "15px 0" }}
  />
)

export default Separator
