import * as RadixSelect from "@radix-ui/react-select"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: {
    value: string
    label: string
  }[]
  size?: "sm" | "md"
  condensed?: boolean
}

const Select = ({
  value,
  onChange,
  options,
  size = "md",
  condensed = false,
}: SelectProps) => {
  return (
    <RadixSelect.Root onValueChange={onChange} value={value}>
      <RadixSelect.Trigger
        className={cn(
          "text-md inline-flex w-full max-w-[50%] items-center justify-center overflow-hidden rounded-lg border-[1px] px-2 py-2 font-satoshi font-medium",
          size === "sm" && "rounded-sm px-1 py-0 text-sm",
          condensed && "w-max px-2",
          "text-neutral-900",
          "hover:border-neutral-900",
          "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
          "dark:hover:border-neutral-500"
        )}
      >
        <RadixSelect.Value defaultValue={value} />
        <RadixSelect.Icon
          className={cn("ml-1 text-neutral-900", "dark:text-white")}
        >
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          onPointerDownOutside={(e) => null}
          position="popper"
          sideOffset={5}
          className={cn(
            "w-full rounded border-[1px] px-4 shadow-md",
            "border-neutral-900 bg-white",
            "border-neutral-500 dark:bg-neutral-900"
          )}
        >
          <RadixSelect.ScrollUpButton
            className={cn(
              "flex h-6 cursor-default items-center justify-center",
              "bg-white text-purple-500"
            )}
          >
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-1">
            {options.map(({ value, label }, index) => (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

type SelectItemProps = {
  className?: string
  children: React.ReactNode
  value: string
}

const SelectItem = ({ children, className, value }: SelectItemProps) => {
  return (
    <RadixSelect.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-between px-5 py-2 text-sm",
        "hover:bg-neutral-100",
        "dark:hover:bg-neutral-600",
        className
      )}
      value={value}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-4 items-center justify-center">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}
export default Select
