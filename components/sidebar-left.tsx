import { cn } from "@/lib/utils"
import React from "react"

const SidebarLeft = ({
  left,
  sidebarWidth,
  setSidebarWidth,
}: {
  left: boolean
  sidebarWidth: number
  setSidebarWidth: (value: number) => void
}) => {
  const sidebarRef = React.useRef<HTMLInputElement>(null)
  const [isResizing, setIsResizing] = React.useState(false)

  const startResizing = React.useCallback(() => {
    setIsResizing(true)
  }, [])

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = React.useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        )
      }
    },
    [isResizing]
  )

  React.useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <div
      ref={sidebarRef}
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "relative p-3 border-r-[0.5px] min-w-[250px] max-w-[500px] w-[300px] min-h-screen bg-slate-50 transition-all border-neutral-200",
        "dark:bg-neutral-900 dark:border-neutral-600",
        left ? `p-3 w-[${"300"}px]` : "w-0 min-w-0 p-0 overflow-hidden",
        isResizing && "border-red-500 dark:border-red-500"
      )}
      style={{ width: `${left ? sidebarWidth : 0}px` }}
    >
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-1 cursor-col-resize transition-all",
          left ? "block" : "hidden"
        )}
        onMouseDown={startResizing}
      />
      <h1
        className={cn(
          "text-xl font-satoshi font-semibold",
          "text-black",
          "dark:text-white"
        )}
      >
        🧠 Brain Dump
      </h1>
    </div>
  )
}

export default SidebarLeft
