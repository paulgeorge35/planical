import { cn } from "@/lib/utils"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons"
import { ReactNode } from "react"

type CheckboxProps = {
  className?: string
  rootClassName?: string
  checked: boolean | "indeterminate"
  onChange?: (value: boolean | "indeterminate") => void
  label?: ReactNode
}

const Checkbox = ({
  className,
  rootClassName,
  checked,
  onChange,
  label,
}: CheckboxProps) => (
  <div className={cn("flex items-center", rootClassName)}>
    <RadixCheckbox.Root
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-md border",
        "border-neutral-300",
        checked ? "border-green-600 bg-green-600" : "bg-transparent",
        className
      )}
      checked={checked}
      onCheckedChange={onChange}
    >
      <RadixCheckbox.Indicator
        className={cn("flex h-4 w-4 items-center justify-center text-white")}
      >
        {checked === "indeterminate" && <DividerHorizontalIcon />}
        {checked === true && <CheckIcon />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    {label && <label htmlFor="c1">{label}</label>}
  </div>
)

export default Checkbox
