import { cn } from "@/lib/utils"
import { TaskAllFields } from "types"
import Separator from "../separator"
import TimeButtonPopover from "./time-button-popover"

type TimeSectionProps = {
  estimate: number
  actual: number
  updateTask: (field: "estimate" | "actual", value: string) => void
  extended?: boolean
}

const TimeSection = ({
  extended,
  actual,
  estimate,
  updateTask,
}: TimeSectionProps) => {
  return extended ? (
    <span>
      <Separator className="my-2" />
      <span className={cn("flex flex-row justify-end space-x-1 pt-1")}>
        <TimeButtonPopover
          field="Actual"
          value={actual}
          setTime={(value: string) => {
            updateTask("actual", value)
          }}
        />
        <TimeButtonPopover
          field="Estimate"
          value={estimate}
          setTime={(value: string) => {
            updateTask("estimate", value)
          }}
        />
      </span>
    </span>
  ) : null
}

export default TimeSection
