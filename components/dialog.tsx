"use client"

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
  closeButton?: boolean
}

const Dialog = ({
  className,
  open,
  toggle,
  dismissOnClickOutside,
  dismissOnEscapeKey,
  closeButton = true,
  children,
}: DialogProps) => (
  <RadixDialog.Root open={open}>
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          "fixed inset-0 z-40 bg-black opacity-30 animate-in",
          "dark:opacity-70"
        )}
        onClick={(e) =>
          e.target === e.currentTarget && dismissOnClickOutside && toggle()
        }
      />
      <RadixDialog.Content
        onKeyDown={(event) =>
          dismissOnEscapeKey && event.key === "Escape" && toggle()
        }
        className={cn(
          "absolute top-[50%] left-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg p-6 shadow-md animate-in focus:outline-none",
          "bg-white",
          "dark:bg-neutral-900",
          className
        )}
      >
        {children}
        {closeButton && (
          <button
            className={cn(
              "absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full focus:shadow-md",
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
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)

export default Dialog
