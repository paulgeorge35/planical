import { ReactNode } from "react"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

type DialogProps = {
  className?: string
  open: boolean
  toggle: () => void
  dismissOnClickOutside?: boolean
  dismissOnEscapeKey?: boolean
  children?: ReactNode
}

const Dialog = ({
  className,
  open,
  toggle,
  dismissOnClickOutside,
  dismissOnEscapeKey,
  children,
}: DialogProps) => (
  <RadixDialog.Root open={open}>
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          "fixed inset-0 animate-in bg-black opacity-30",
          "dark:opacity-70"
        )}
        onClick={(e) => dismissOnClickOutside && toggle()}
      />
      <RadixDialog.Content
        onKeyDown={(event) =>
          dismissOnEscapeKey && event.key === "Escape" && toggle()
        }
        className={cn(
          "rounded-lg overflow-hidden shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[850px] max-h-[85vh] p-6 animate-in focus:outline-none",
          "bg-white",
          "dark:bg-neutral-900",
          className
        )}
      >
        {children}
        <button
          className={cn(
            "rounded-full h-6 w-6 inline-flex items-center justify-center absolute top-4 right-4 focus:shadow-md",
            "bg-neutral-100",
            "hover:bg-neutral-200",
            "dark:bg-neutral-600",
            "dark:hover:bg-neutral-700"
          )}
          aria-label="Close"
          onClick={toggle}
        >
          <Cross2Icon />
        </button>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)

export default Dialog
