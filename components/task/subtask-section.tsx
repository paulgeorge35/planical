import { cn } from "@/lib/utils"
import { Subtask } from "@prisma/client"
import {
  DotsVerticalIcon,
  DragHandleDots2Icon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { useState } from "react"
import Button from "../button"
import Checkbox from "../checkbox"
import Separator from "../separator"

type SubtaskSectionProps = {
  extended: boolean
  subtasks: Subtask[]
  type: "NEW" | "EXISTING"
  createSubtask?: (title: string) => void
  updateSubtask?: (subtask: Subtask) => void
  className?: string
}

const Subtask = ({
  subtask,
  updateSubtask,
}: {
  subtask: Subtask
  updateSubtask?: (subtask: Subtask) => void
}) => {
  const [data, setData] = useState(subtask)
  const [inputRef, setInputRef] = useState<HTMLLabelElement | null>(null)

  return (
    <span className="inline-flex w-full flex-row flex-wrap items-start pl-1">
      <fieldset className="flex grow flex-row items-center">
        <DragHandleDots2Icon
          className={cn(
            "mr-2 flex h-4 w-4 cursor-grab items-center justify-center"
          )}
        />
        <Checkbox
          checked={subtask.done}
          onChange={() =>
            updateSubtask && updateSubtask({ ...subtask, done: !subtask.done })
          }
        />
        <label
          htmlFor="title"
          className="hidden"
          ref={(label) => setInputRef(label)}
        >
          Task name
        </label>
        <input
          className={cn(
            "h-8 flex-auto grow resize-none overflow-y-hidden break-words bg-transparent px-2 text-xs outline-none"
          )}
          type={"text"}
          id="title"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          onClick={(e) => inputRef?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && updateSubtask) {
              updateSubtask(data)
            }
          }}
          onBlur={() => updateSubtask && updateSubtask(data)}
          placeholder="Subtask description"
        />
        <DotsVerticalIcon
          className={cn(
            "flex h-4 w-4 cursor-pointer items-center justify-center",
            "hover:text-neutral-800",
            "dark:hover:text-white",
            "text-neutral-400"
          )}
        />
      </fieldset>
    </span>
  )
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
          <Subtask
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
