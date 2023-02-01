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
          "overflow-hidden px-2 py-2 rounded-lg font-satoshi font-medium w-full text-md max-w-[50%] border-[1px] inline-flex items-center justify-center",
          size === "sm" && "text-sm px-1 py-0 rounded-sm",
          condensed && "w-max px-2",
          "text-neutral-900",
          "hover:border-neutral-900",
          "dark:bg-neutral-800 dark:text-white dark:border-neutral-700",
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
            "rounded border-[1px] shadow-md w-full px-4",
            "bg-white border-neutral-900",
            "dark:bg-neutral-900 border-neutral-500"
          )}
        >
          <RadixSelect.ScrollUpButton
            className={cn(
              "flex items-center justify-center h-6 cursor-default",
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
        "text-sm flex items-center justify-between px-5 py-2 relative select-none cursor-pointer",
        "hover:bg-neutral-100",
        "dark:hover:bg-neutral-600",
        className
      )}
      value={value}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute inline-flex justify-center items-center left-0 w-4">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}
export default Select
