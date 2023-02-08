import React from "react"
import * as Toolbar from "@radix-ui/react-toolbar"
import { cn } from "@/lib/utils"
import { IconProps } from "@radix-ui/react-icons/dist/types"

type ToggleButtonItemType = {
  label: string
  value: string
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}

const ToggleButton = ({
  options,
  toggleValue,
  onToggleValueChange,
  className,
}: {
  options: ToggleButtonItemType[]
  toggleValue: string
  onToggleValueChange: (value: string) => void
  className?: string
}) => {
  return (
    <Toolbar.Root aria-label="Section selector" className={className}>
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="CALENDAR"
        aria-label="Section options"
        className={cn(
          "flex rounded p-[1px]",
          "bg-neutral-200",
          "dark:bg-neutral-600"
        )}
        value={toggleValue}
        onValueChange={onToggleValueChange}
      >
        {options.map(
          (
            { value, label, icon: Icon }: ToggleButtonItemType,
            index: number
          ) => (
            <Toolbar.ToggleItem
              key={index}
              className={cn(
                "flex h-[28px] items-center rounded px-2 py-1 text-xs",
                "text-neutral-600",
                "hover:text-neutral-900",
                "dark:text-neutral-200",
                "dark:hover:text-white ",
                `${
                  toggleValue === value ? "bg-white" : "hover:bg-neutral-300"
                }`,
                `${
                  toggleValue === value
                    ? "dark:bg-neutral-900 dark:hover:bg-neutral-900"
                    : "dark:hover:bg-neutral-700"
                }`
              )}
              value={value}
              aria-label={label}
            >
              {Icon && (
                <span className="mr-1">
                  <Icon />
                </span>
              )}
              {label}
            </Toolbar.ToggleItem>
          )
        )}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  )
}

export default ToggleButton
