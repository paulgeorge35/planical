import { SidebarContext } from "@/contexts/SidebarContext"
import { ToolbarContext } from "@/contexts/ToolbarContext"
import { cn } from "@/lib/utils"
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckboxIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons"
import { useContext } from "react"
import Avatar from "../avatar"
import Button from "../button"
import ThemeSwitch from "../theme-switcher"
import ToggleButton from "../toggle-button"

const Toolbar = () => {
  const { left, setLeft, right, setRight } = useContext(SidebarContext)
  const { month, mainView, toggleMainView, nextWeek, prevWeek, resetToday } =
    useContext(ToolbarContext)
  return (
    <div className={cn("px-4 h-full grow flex justify-between items-center")}>
      <ArrowLeftIcon
        onClick={(_) => setLeft(!left)}
        className={cn(
          "origin-center h-5 w-5 transition-transform",
          "text-neutral-400",
          "hover:text-neutral-900 hover:cursor-pointer",
          "dark:text-neutral-600",
          "dark:hover:text-neutral-300",
          `${left ? "" : " rotate-180"}`
        )}
      />
      <div className="px-4 grow flex items-center justify-between h-full">
        <span className="flex items-center h-full py-2">
          <h1
            className={cn(
              "text-lg font-satoshi font-medium",
              "text-neutral-800",
              "dark:text-neutral-200"
            )}
          >
            {month}
          </h1>
          <Button onClick={resetToday}>Today</Button>
          <ChevronLeftIcon
            onClick={(_) => prevWeek()}
            className={cn(
              "origin-center h-4 w-4 transition-transform ml-4",
              "text-neutral-400",
              "hover:text-neutral-900 hover:cursor-pointer",
              "dark:text-neutral-600",
              "dark:hover:text-neutral-300"
            )}
          />
          <ChevronLeftIcon
            onClick={(_) => nextWeek()}
            className={cn(
              "origin-center h-4 w-4 transition-transform ml-2 rotate-180",
              "text-neutral-400",
              "hover:text-neutral-900 hover:cursor-pointer",
              "dark:text-neutral-600",
              "dark:hover:text-neutral-300"
            )}
          />
        </span>
        <span className="flex items-center h-full py-2">
          <ThemeSwitch />
          <Button className="mr-4">Filter</Button>
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
          <Avatar />
        </span>
      </div>
      <ArrowLeftIcon
        onClick={(_) => setRight(!right)}
        className={cn(
          "origin-center h-5 w-5 transition-transform",
          "text-neutral-400",
          "hover:text-neutral-900 hover:cursor-pointer",
          "dark:text-neutral-600",
          "dark:hover:text-neutral-300",
          `${right ? "rotate-180" : ""}`
        )}
      />
    </div>
  )
}

export default Toolbar
