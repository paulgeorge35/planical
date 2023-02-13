import React, { useContext, useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Label } from "@prisma/client"
import LabelColorBubble from "./label-color-bubble"
import { TaskContext } from "@/contexts/TaskContextProvider"
import Button from "../button"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Separator from "../separator"

type LabelButtonPopoverProps = {
  label: Label | null
  open: boolean
  setOpen: (open: boolean) => void
  labels: Label[]
  updateLabel?: (label: Label) => void
  className?: string
}

const LabelButtonPopover = ({
  label,
  open,
  labels,
  updateLabel,
  setOpen,
}: LabelButtonPopoverProps) => {
  const [search, setSearch] = useState("")

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <button
          onClick={(e) => setOpen(!open)}
          className={cn("m-0 border-0 p-0")}
          aria-label={`Update task label`}
        >
          {label === null ? (
            <span className="flex flex-col items-center">
              <p>Select label</p>
            </span>
          ) : (
            <span className="flex flex-row items-center">
              <LabelColorBubble color={label.color} />
              <p className="pl-1">{label.name}</p>
            </span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal className="focus:border-none">
        <Popover.Content
          onPointerDownOutside={() => setOpen(false)}
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded border-[1px] bg-white p-0 will-change-[transform,opacity]  dark:border-neutral-800 dark:bg-neutral-900"
          sideOffset={5}
        >
          <div className="flex max-w-[150px] flex-col">
            <span
              className={cn(
                "text-md relative flex w-full flex-row items-center justify-between overflow-hidden py-2 pl-8 font-satoshi font-medium",
                "text-neutral-900",
                "dark:border-neutral-700 dark:text-white"
              )}
            >
              <input
                className={cn(
                  "flex grow items-center bg-transparent text-sm",
                  "text-neutral-900",
                  "dark:text-neutral-300"
                )}
                placeholder={"Search labels"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon className={cn("absolute left-2")} />
            </span>
            <Separator rootClassName="py-0" />
            <div className="flex max-h-[150px] max-w-[150px] flex-col overflow-y-scroll">
              {labels
                .filter((label) =>
                  search
                    .toLowerCase()
                    .split(/[\s,.-_]+/)
                    .some((word) => label.name.toLowerCase().includes(word))
                )
                .map((label: Label) => (
                  <Button
                    key={label.id}
                    onClick={() => {
                      if (updateLabel) updateLabel(label.id)
                      setOpen(false)
                    }}
                    className={cn(
                      "m-0 w-full rounded-none border-0 bg-transparent p-2 text-sm hover:bg-neutral-400/20",
                      "dark:hover:bg-neutral-400/50"
                    )}
                  >
                    <LabelColorBubble color={label.color} />
                    <p className="pl-1">{label.name}</p>
                  </Button>
                ))}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default LabelButtonPopover
