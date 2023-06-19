import { cn } from "@/lib/utils"
import { Subtask } from "@prisma/client"
import { PlusIcon } from "@radix-ui/react-icons"
import Button from "../button"
import Separator from "../separator"
import SubtaskComponent from "./subtask-component"

type SubtaskSectionProps = {
  extended: boolean
  subtasks: Subtask[]
  type: "NEW" | "EXISTING"
  createSubtask?: (title: string) => void
  updateSubtask?: (subtask: Subtask) => void
  className?: string
}

const SubtaskSection = ({
  extended,
  subtasks,
  type = "NEW",
  createSubtask,
  updateSubtask,
  className,
}: SubtaskSectionProps) => {
  return extended ? (
    <span>
      <Separator className="my-2" />
      <span className={cn("flex flex-col space-y-2 pt-1", className)}>
        {subtasks.map((subtask, index) => (
          <SubtaskComponent
            key={index}
            subtask={subtask}
            updateSubtask={updateSubtask}
          />
        ))}
        <Button
          onClick={() => createSubtask && createSubtask("")}
          icon={PlusIcon}
          className="ml-1 border-0 bg-transparent p-0 text-xs hover:text-blue-500 dark:hover:text-blue-500"
        >
          Add subtask
        </Button>
      </span>
    </span>
  ) : null
}

export default SubtaskSection
