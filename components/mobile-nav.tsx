import { cn } from "@/lib/utils"
import { CalendarIcon, Component1Icon, GearIcon } from "@radix-ui/react-icons"
import Button from "./button"
import useMediaQuery from "@/hooks/use-media-query"
import { useContext } from "react"
import { SidebarContext } from "@/contexts/SidebarContextProvider"

type MobileNavProps = {}

const MobileNav = ({}: MobileNavProps) => {
  const isPhone = useMediaQuery("(max-width: 639px)")
  const { toggleMainView, mainView } = useContext(SidebarContext)
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-50 flex h-[60px] w-screen items-center justify-around border-t-[1px] shadow-lg",
        "border-neutral-300 bg-white",
        "dark:border-neutral-500 dark:bg-neutral-900",
        !isPhone && "hidden"
      )}
    >
      <Button
        className={cn(
          "rounded-lg border-0 bg-transparent p-2",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-600"
        )}
        onClick={() => mainView === "TASKS" && toggleMainView()}
      >
        <CalendarIcon className="h-8 w-8" />
      </Button>
      <Button
        className={cn(
          "rounded-lg border-0 bg-transparent p-2",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-600"
        )}
        onClick={() => mainView === "CALENDAR" && toggleMainView()}
      >
        <Component1Icon className="h-8 w-8" />
      </Button>
      <Button
        className={cn(
          "rounded-lg border-0 bg-transparent p-2",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-600"
        )}
      >
        <GearIcon className="h-8 w-8" />
      </Button>
    </div>
  )
}

export default MobileNav
