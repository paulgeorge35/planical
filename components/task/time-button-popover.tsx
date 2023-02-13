import React, { useEffect, useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import TimeField from "react-simple-timefield"

type TimeButtonPopoverProps = {
  field: string
  value: number
  setTime: (value: string) => void
  className?: string
}

const TimeButtonPopover = ({
  field,
  value,
  setTime: setTaskTime,
}: TimeButtonPopoverProps) => {
  const [time, setTime] = useState<string>(
    `${
      Math.floor(value / 100) === 0
        ? "00"
        : Math.floor(value / 100) < 10
        ? `0${Math.floor(value / 100)}`
        : Math.floor(value / 100)
    }:${value % 100 === 0 ? "00" : value % 100}`
  )
  const [buttonText, setButtonText] = useState<string>(
    `${Math.floor((value || 0) / 100)}h ${(value || 0) % 100}m`
  )
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setButtonText(`${Math.floor((value || 0) / 100)}h ${(value || 0) % 100}m`)
  }, [value])

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <button
          onClick={(e) => setOpen(!open)}
          className={cn(
            "border-0 p-0 pl-2 text-xs text-neutral-400 hover:text-neutral-800",
            "dark:text-neutral-400 dark:hover:text-neutral-200"
          )}
          aria-label={`Update ${field} time`}
        >
          <span className="flex flex-col items-center">
            <p>{field}</p>
            <p>{buttonText}</p>
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onPointerDownOutside={() => setOpen(false)}
          className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded border-[1px] bg-white p-4 will-change-[transform,opacity]  dark:border-neutral-800 dark:bg-neutral-900"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-mauve12 mb-2.5 text-[15px] font-medium leading-[19px]">
              {field}
            </p>
            <TimeField
              value={time}
              style={{ width: 50 }}
              onChange={(e) => {
                setTime(e.target.value)
              }}
              input={
                <input
                  className="w-full border-0"
                  value={time}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTaskTime(time)
                      setOpen(false)
                    }
                  }}
                />
              }
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default TimeButtonPopover
