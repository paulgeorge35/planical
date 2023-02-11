import Select from "@/components/select"
import Separator from "@/components/separator"
import Switch from "@/components/switch"
import { ToolbarContext } from "@/contexts/ToolbarContextProvider"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useContext } from "react"
import { DayOfWeekNumber } from "types"

type PersonalizationSettingsProps = {}

const PersonalizationSettings = ({}: PersonalizationSettingsProps) => {
  const { theme, setTheme } = useTheme()
  const {
    USER_PREF_FIRST_DAY_OF_WEEK,
    setFirstDayOfWeek,
    USER_PREF_COMPLETE_TASKS_AUTO,
    setCompleteTaskOnSubtasksCompletion,
    USER_PREF_NEW_TASK_POSITION,
    setNewTaskPosition,
    USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM,
    setMoveCompletedTasksSubtasksToTheBottom,
    USER_PREF_ROLL_OVER_TASKS,
    setRollOverTasksToTheNextDay,
    USER_PREF_ROLL_OVER_TASKS_POSITION,
    setRollOverTasksPosition,
    USER_PREF_SHOW_WEEKENDS,
    setShowWeekends,
  } = useContext(ToolbarContext)
  const mounted = useMounted()
  const themes = [
    { label: "Use system preferences", value: "system" },
    { label: "Light mode", value: "light" },
    { label: "Dark mode", value: "dark" },
  ]
  const days = [
    { label: "Sunday", value: "0" },
    { label: "Monday", value: "1" },
    { label: "Tuesday", value: "2" },
    { label: "Wednesday", value: "3" },
    { label: "Thursday", value: "4" },
    { label: "Friday", value: "5" },
    { label: "Saturday", value: "6" },
  ]
  const newTaskPositions = [
    { label: "Top of the list", value: "TOP" },
    { label: "Bottom of the list", value: "BOTTOM" },
  ]

  return (
    <div className="flex h-full max-h-[85vh] grow flex-col">
      <div
        className={cn(
          "w-full border-b-[1px] p-4",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>
          Personalization Settings
        </h1>
      </div>
      <div className="h-full w-full overflow-y-scroll pb-8">
        <div className={cn("flex w-full flex-col p-6 pb-0")}>
          <fieldset className="group mt-0 flex flex-col space-y-2">
            <label
              className={cn(
                "text-xs font-semibold uppercase",
                "text-neutral-400",
                "dark:text-neutral-500"
              )}
            >
              Appearance
            </label>
            <Select
              value={theme || ""}
              onChange={(value) => mounted && setTheme(value)}
              options={themes}
            />
          </fieldset>
          <Separator rootClassName="py-4" />
        </div>
        <div className={cn("flex w-full flex-col px-6")}>
          <fieldset className="group mt-0 flex flex-col space-y-4">
            <label
              className={cn(
                "text-xs font-semibold uppercase",
                "text-neutral-400",
                "dark:text-neutral-500"
              )}
            >
              New task position
            </label>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Add new tasks to the
              </p>
              <Select
                size="sm"
                condensed
                value={USER_PREF_NEW_TASK_POSITION}
                onChange={(value) =>
                  mounted && setNewTaskPosition(value as "TOP" | "BOTTOM")
                }
                options={newTaskPositions}
              />
            </span>
          </fieldset>
          <Separator rootClassName="py-4" />
        </div>
        <div className={cn("flex w-full flex-col px-6")}>
          <fieldset className="group mt-0 flex flex-col space-y-4">
            <label
              className={cn(
                "text-xs font-semibold uppercase",
                "text-neutral-400",
                "dark:text-neutral-500"
              )}
            >
              Task rollover
            </label>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Roll-over tasks to the next day
              </p>
              <Switch
                checked={USER_PREF_ROLL_OVER_TASKS}
                onChange={(value) =>
                  mounted && setRollOverTasksToTheNextDay(value)
                }
              />
            </span>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Roll over tasks to the
              </p>
              <Select
                size="sm"
                condensed
                value={USER_PREF_ROLL_OVER_TASKS_POSITION}
                onChange={(value) =>
                  mounted && setRollOverTasksPosition(value as "TOP" | "BOTTOM")
                }
                options={newTaskPositions}
              />
            </span>
          </fieldset>
          <Separator rootClassName="py-4" />
        </div>
        <div className={cn("flex w-full flex-col px-6")}>
          <fieldset className="group mt-0 flex flex-col space-y-4">
            <label
              className={cn(
                "text-xs font-semibold uppercase",
                "text-neutral-400",
                "dark:text-neutral-500"
              )}
            >
              After task completion
            </label>
            <span className="flex items-center space-x-2">
              <p className="max-w-[90%] text-sm text-neutral-700 dark:text-neutral-200">
                Move tasks (and subtasks) to the bottom of the list on complete
              </p>
              <Switch
                checked={USER_PREF_MOVE_COMPLETED_TASKS_TO_THE_BOTTOM}
                onChange={(value) =>
                  mounted && setMoveCompletedTasksSubtasksToTheBottom(value)
                }
              />
            </span>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Mark tasks as complete when subtasks are complete
              </p>
              <Switch
                checked={USER_PREF_COMPLETE_TASKS_AUTO}
                onChange={(value) =>
                  mounted && setCompleteTaskOnSubtasksCompletion(value)
                }
              />
            </span>
          </fieldset>
          <Separator rootClassName="py-4" />
        </div>
        <div className={cn("flex w-full flex-col px-6")}>
          <fieldset className="group mt-0 flex flex-col space-y-4">
            <label
              className={cn(
                "text-xs font-semibold uppercase",
                "text-neutral-400",
                "dark:text-neutral-500"
              )}
            >
              Calendar settings
            </label>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Start week on
              </p>
              <Select
                size="sm"
                condensed
                value={USER_PREF_FIRST_DAY_OF_WEEK.toString()}
                onChange={(value) =>
                  mounted &&
                  setFirstDayOfWeek(parseInt(value) as DayOfWeekNumber)
                }
                options={days}
              />
            </span>
            <span className="flex items-center space-x-2">
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                Show weekends
              </p>
              <Switch
                checked={USER_PREF_SHOW_WEEKENDS}
                onChange={(value) => mounted && setShowWeekends(value)}
              />
            </span>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default PersonalizationSettings
