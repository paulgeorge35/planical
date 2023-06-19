import useResizeTextArea from "@/hooks/use-resize-textarea"
import { cn } from "@/lib/utils"
import { Subtask } from "@prisma/client"
import { DotsVerticalIcon, DragHandleDots2Icon } from "@radix-ui/react-icons"
import { useRef, useState } from "react"
import Checkbox from "../checkbox"
import TextArea from "../textarea"

const SubtaskComponent = ({
  subtask,
  updateSubtask,
  persistentActions = true,
}: {
  subtask: Subtask
  updateSubtask?: (subtask: Subtask) => void
  persistentActions?: boolean
}) => {
  const [data, setData] = useState(subtask)
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span className="group inline-flex w-full flex-row flex-wrap items-start pl-1">
      <fieldset
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={cn(
          "flex w-full flex-row items-start rounded-lg p-2 px-1 hover:bg-neutral-100",
          "dark:hover:bg-neutral-700",
          isFocused && "bg-neutral-200 dark:bg-neutral-600"
        )}
      >
        <DragHandleDots2Icon
          className={cn(
            "mr-2 flex h-4 w-4 cursor-grab items-center justify-center opacity-0",
            persistentActions && "opacity-1",
            (isFocused || isHovered) && "opacity-1"
          )}
        />
        <Checkbox
          checked={subtask.done}
          onChange={() =>
            updateSubtask && updateSubtask({ ...subtask, done: !subtask.done })
          }
        />
        <TextArea
          className="w-full bg-transparent px-2 text-xs outline-none"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          id={`title${subtask.id}`}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && updateSubtask) {
              e.preventDefault()
              updateSubtask(data)
            }
          }}
          onBlur={() => {
            setIsFocused(false)
            if (updateSubtask) updateSubtask(data)
          }}
          placeholder="Subtask description"
        />
        <DotsVerticalIcon
          className={cn(
            "flex h-4 w-4 cursor-pointer items-center justify-center opacity-0",
            "hover:text-neutral-800",
            "dark:hover:text-white",
            "text-neutral-400",
            persistentActions && "opacity-1",
            (isFocused || isHovered) && "opacity-1"
          )}
        />
      </fieldset>
    </span>
  )
}

export default SubtaskComponent
