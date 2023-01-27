import * as Toolbar from "@radix-ui/react-toolbar"
import { cn } from "@/lib/utils"
import { IconProps } from "@radix-ui/react-icons/dist/types"

type ButtonType = {
  children: React.ReactNode
  className?: string
  rootClassName?: string
  onClick?: () => void
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
}: ButtonType) => {
  return (
    <Toolbar.Root className={rootClassName}>
      <Toolbar.Button
        onClick={onClick}
        className={cn(
          "ml-4 px-3 py-1 border rounded text-xs h-full flex flex-row items-center",
          "border-neutral-200 text-neutral-600",
          "hover:border-neutral-900 hover:text-neutral-900",
          "dark:border-neutral-600 dark:text-neutral-300",
          "dark:hover:text-white",
          className
        )}
      >
        {Icon && (
          <span className="mr-1">
            <Icon />
          </span>
        )}
        {children}
      </Toolbar.Button>
    </Toolbar.Root>
  )
}

export default Button
