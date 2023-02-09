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
  className?: string
}

const Subtask = ({ subtask }: { subtask: Subtask }) => {
  const [title, setTitle] = useState(subtask.title)
  return (
    <span className="flex w-full flex-row flex-wrap items-start pl-5">
      <DragHandleDots2Icon
        className={cn(
          "mr-2 flex h-4 w-4 cursor-grab items-center justify-center"
        )}
      />
      <Checkbox
        checked={subtask.done}
        onChange={() => console.log(subtask.done)}
      />
      <textarea
        className={cn(
          "ml-2 max-w-[calc(100%-4rem)] flex-auto resize-none overflow-y-hidden break-words bg-transparent p-0 text-xs outline-none"
        )}
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
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
    </span>
  )
}

const SubtaskSection = ({
  extended,
  subtasks,
  className,
}: SubtaskSectionProps) => {
  return extended ? (
    <span>
      <Separator className="my-2" />
      <span className={cn("flex flex-col space-y-0 pt-1", className)}>
        {subtasks.map((subtask, index) => (
          <Subtask key={index} subtask={subtask} />
        ))}
        <Button
          icon={PlusIcon}
          className="ml-1 border-0 bg-transparent p-0 hover:text-blue-500 dark:hover:text-blue-500"
        >
          Add subtask
        </Button>
      </span>
    </span>
  ) : null
}

export default SubtaskSection
