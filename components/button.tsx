import * as Toolbar from "@radix-ui/react-toolbar"
import { cn } from "@/lib/utils"

type ButtonType = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Button = ({ children, className, onClick }: ButtonType) => {
  return (
    <Toolbar.Root className="h-full">
      <Toolbar.Button
        onClick={onClick}
        className={cn(
          "ml-4 px-3 py-1 border rounded text-xs h-full",
          "border-neutral-200 text-neutral-600",
          "hover:border-neutral-900 hover:text-neutral-900",
          "dark:border-neutral-600 dark:text-neutral-300",
          "dark:hover:text-white",
          className
        )}
      >
        {children}
      </Toolbar.Button>
    </Toolbar.Root>
  )
}

export default Button
