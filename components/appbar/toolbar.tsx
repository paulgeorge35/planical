import { useContext } from "react"
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckboxIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons"

import Avatar from "../avatar"
import Button from "../button"
import ToggleButton from "../toggle-button"
import { SidebarContext } from "@/contexts/SidebarContextProvider"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { cn } from "@/lib/utils"

type ToolbarProps = {
  openProfileDialogue: () => void
}

const Toolbar = ({ openProfileDialogue }: ToolbarProps) => {
  const { mainView, toggleMainView, left, setLeft, right, setRight } =
    useContext(SidebarContext)
  const { month, nextWeek, prevWeek, resetToday, dateIntervalToView } =
    useContext(ToolbarContext)
  return (
    <div className={cn("flex h-full grow items-center justify-between px-4")}>
      <ArrowLeftIcon
        onClick={(_) => setLeft(!left)}
        className={cn(
          "h-5 w-5 origin-center transition-transform",
          "text-neutral-400",
          "hover:cursor-pointer hover:text-neutral-900",
          "dark:text-neutral-600",
          "dark:hover:text-neutral-300",
          `${left ? "" : " rotate-180"}`
        )}
      />
      <div className="flex h-full grow items-center justify-between px-4">
        {mainView === "CALENDAR" ? (
          <span className="flex h-full items-center py-2">
            <h1
              className={cn(
                "font-satoshi text-lg font-medium",
                "text-neutral-800",
                "dark:text-neutral-200"
              )}
            >
              {month}
            </h1>
            <Button onClick={resetToday} rootClassName="h-full">
              Today
            </Button>
            <ChevronLeftIcon
              onClick={(_) => prevWeek()}
              className={cn(
                "ml-4 h-4 w-4 origin-center transition-transform",
                "text-neutral-400",
                "hover:cursor-pointer hover:text-neutral-900",
                "dark:text-neutral-600",
                "dark:hover:text-neutral-300"
              )}
            />
            <ChevronLeftIcon
              onClick={(_) => nextWeek()}
              className={cn(
                "ml-2 h-4 w-4 origin-center rotate-180 transition-transform",
                "text-neutral-400",
                "hover:cursor-pointer hover:text-neutral-900",
                "dark:text-neutral-600",
                "dark:hover:text-neutral-300"
              )}
            />
          </span>
        ) : (
          <span className="flex h-full items-center py-2">
            <Button
              onClick={resetToday}
              rootClassName="h-full"
              className="ml-0"
            >
              Today {dateIntervalToView.length}
            </Button>
          </span>
        )}
        <span className="flex h-full items-center py-2">
          <Button className="mr-4" rootClassName="h-full">
            Filter
          </Button>
          <ToggleButton
            className="mr-4"
            toggleValue={mainView}
            onToggleValueChange={(value: string) =>
              value && toggleMainView(value as "CALENDAR" | "TASKS")
            }
            options={[
              { label: "Calendar", value: "CALENDAR", icon: CalendarIcon },
              { label: "Tasks", value: "TASKS", icon: CheckboxIcon },
            ]}
          />
          <Avatar onClick={openProfileDialogue} />
        </span>
      </div>
      <ArrowLeftIcon
        onClick={(_) => setRight(!right)}
        className={cn(
          "h-5 w-5 origin-center transition-transform",
          "text-neutral-400",
          "hover:cursor-pointer hover:text-neutral-900",
          "dark:text-neutral-600",
          "dark:hover:text-neutral-300",
          `${right ? "rotate-180" : ""}`
        )}
      />
    </div>
  )
}

export default Toolbar
