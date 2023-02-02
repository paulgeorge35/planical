import { cn } from "@/lib/utils"
import {
  DotsVerticalIcon,
  DragHandleDots2Icon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { useState } from "react"
import { SubtaskType } from "types"
import Button from "../button"
import Checkbox from "../checkbox"
import Separator from "../separator"

type SubtaskSectionProps = {
  extended: boolean
  subtasks: SubtaskType[]
  className?: string
}

const Subtask = ({ subtask }: { subtask: SubtaskType }) => {
  const [title, setTitle] = useState(subtask.title)
  return (
    <span className="flex flex-row items-start pl-5 flex-wrap w-full">
      <DragHandleDots2Icon
        className={cn(
          "w-4 h-4 cursor-grab flex justify-center items-center mr-2"
        )}
      />
      <Checkbox
        checked={subtask.done}
        onChange={() => console.log(subtask.done)}
      />
      <textarea
        className={cn(
          "text-xs ml-2 bg-transparent break-words resize-none outline-none p-0 flex-auto max-w-[calc(100%-4rem)] overflow-y-hidden"
        )}
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Subtask description"
      />
      <DotsVerticalIcon
        className={cn(
          "w-4 h-4 cursor-pointer flex justify-center items-center",
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
      <span className={cn("flex flex-col space-y-0", className)}>
        {subtasks.map((subtask, index) => (
          <Subtask key={index} subtask={subtask} />
        ))}
        <Button
          icon={PlusIcon}
          className="p-0 ml-5 border-0 bg-transparent hover:text-blue-500 dark:hover:text-blue-500"
        >
          Add subtask
        </Button>
      </span>
    </span>
  ) : null
}

export default SubtaskSection
