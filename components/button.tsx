import * as Toolbar from "@radix-ui/react-toolbar"
import { cn } from "@/lib/utils"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { MouseEventHandler } from "react"

type ButtonType = {
  children?: React.ReactNode
  className?: string
  rootClassName?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}

const Button = ({
  children,
  className,
  rootClassName,
  onClick,
  icon: Icon,
  disabled = false,
}: ButtonType) => {
  return (
    <Toolbar.Root className={rootClassName}>
      <Toolbar.Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "ml-4 flex h-full flex-row items-center rounded border px-3 py-1 text-xs",
          "border-neutral-200 text-neutral-600",
          "hover:border-neutral-900 hover:text-neutral-900",
          "dark:border-neutral-600 dark:text-neutral-300",
          "dark:hover:text-white",
          disabled && "pointer-events-none cursor-not-allowed !text-opacity-20",
          className
        )}
      >
        {Icon && (
          <span className={cn(children && "mr-1")}>
            <Icon />
          </span>
        )}
        {children}
      </Toolbar.Button>
    </Toolbar.Root>
  )
}

export default Button
