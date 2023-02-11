import React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

type SwitchProps = {
  checked: boolean
  onChange: (value: boolean) => void
  children?: React.ReactNode
  className?: string
  rootClassName?: string
}
const Switch = ({
  checked,
  onChange,
  className,
  rootClassName,
}: SwitchProps) => (
  <RadixSwitch.Root
    checked={checked}
    onCheckedChange={onChange}
    className={cn(
      "relative h-4 w-7 cursor-pointer rounded-full outline-none",
      "bg-neutral-300 data-[state=checked]:bg-purple-500",
      "dark:bg-neutral-700 dark:data-[state=checked]:bg-purple-500",
      rootClassName
    )}
  >
    <RadixSwitch.Thumb
      className={cn(
        "block h-3 w-3 translate-x-0.5 rounded-full transition-transform will-change-transform duration-100 data-[state=checked]:translate-x-[14px]",
        "bg-white",
        className
      )}
    />
  </RadixSwitch.Root>
)

export default Switch
