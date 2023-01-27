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
        "w-4 h-4 rounded-md flex items-center justify-center border",
        "border-neutral-300",
        checked ? "bg-green-600 border-green-600" : "bg-transparent",
        className
      )}
      checked={checked}
      onCheckedChange={onChange}
    >
      <RadixCheckbox.Indicator
        className={cn("text-white w-4 h-4 flex items-center justify-center")}
      >
        {checked === "indeterminate" && <DividerHorizontalIcon />}
        {checked === true && <CheckIcon />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    {label && <label htmlFor="c1">{label}</label>}
  </div>
)

export default Checkbox
