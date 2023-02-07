import { cn } from "@/lib/utils"
import { CalendarIcon, Component1Icon, GearIcon } from "@radix-ui/react-icons"
import Button from "./button"
import useMediaQuery from "@/hooks/use-media-query"
import { useContext } from "react"
import { SidebarContext } from "@/contexts/SidebarContext"

type MobileNavProps = {}

const MobileNav = ({}: MobileNavProps) => {
  const isPhone = useMediaQuery("(max-width: 639px)")
  const { toggleMainView, mainView } = useContext(SidebarContext)
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 w-screen h-[60px] flex items-center justify-around z-50 shadow-lg border-t-[1px]",
        "bg-white border-neutral-300",
        "dark:bg-neutral-900 dark:border-neutral-500",
        !isPhone && "hidden"
      )}
    >
      <Button
        className={cn(
          "p-2 border-0 bg-transparent rounded-lg",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-600"
        )}
        onClick={() => mainView === "TASKS" && toggleMainView()}
      >
        <CalendarIcon className="h-8 w-8" />
      </Button>
      <Button
        className={cn(
          "p-2 border-0 bg-transparent rounded-lg",
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-600"
        )}
        onClick={() => mainView === "CALENDAR" && toggleMainView()}
      >
        <Component1Icon className="h-8 w-8" />
      </Button>
      <Button
        className={cn(
          "p-2 border-0 bg-transparent rounded-lg",
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
