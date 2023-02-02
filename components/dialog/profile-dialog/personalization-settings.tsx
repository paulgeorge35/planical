import Select from "@/components/select"
import Separator from "@/components/separator"
import { ToolbarContext } from "@/contexts/ToolbarContext"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useContext } from "react"
import { DayOfWeekNumber } from "types"

type PersonalizationSettingsProps = {}

const PersonalizationSettings = ({}: PersonalizationSettingsProps) => {
  const { theme, setTheme } = useTheme()
  const { firstDayOfWeek, setFirstDayOfWeek } = useContext(ToolbarContext)
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

  return (
    <div className="flex flex-col h-full grow ">
      <div
        className={cn(
          "p-4 w-full border-b-[1px]",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>
          Personalization Settings
        </h1>
      </div>
      <div className={cn("p-6 pb-0 w-full flex flex-col")}>
        <fieldset className="mt-0 group flex flex-col space-y-2">
          <label
            className={cn(
              "text-xs uppercase font-semibold",
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
      <div className={cn("p-6 pb-0 w-full flex flex-col")}>
        <fieldset className="mt-0 group flex flex-col space-y-2">
          <label
            className={cn(
              "text-xs uppercase font-semibold",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Calendar settings
          </label>
          <span className="flex space-x-2 items-center">
            <p className="text-sm">Start week on</p>
            <Select
              size="sm"
              condensed
              value={firstDayOfWeek.toString()}
              onChange={(value) =>
                mounted && setFirstDayOfWeek(parseInt(value) as DayOfWeekNumber)
              }
              options={days}
            />
          </span>
        </fieldset>
        <Separator rootClassName="py-4" />
      </div>
    </div>
  )
}

export default PersonalizationSettings
