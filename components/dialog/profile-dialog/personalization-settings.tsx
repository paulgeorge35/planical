import Button from "@/components/button"
import Select from "@/components/select"
import Separator from "@/components/separator"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

type PersonalizationSettingsProps = {}

const PersonalizationSettings = ({}: PersonalizationSettingsProps) => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const themes = [
    { label: "Use system preferences", value: "system" },
    { label: "Light mode", value: "light" },
    { label: "Dark mode", value: "dark" },
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
      <div className={cn("p-6 w-full flex flex-col")}>
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
          {/* <select
            className={cn(
              "px-3 py-2 rounded-lg font-satoshi font-medium text-md max-w-[50%] border-[1px] appearance-none",
              "after:content-['^'] after:self-end after:w-3 after:h-3 after:bg-neutral-900",
              "bg-transparent text-neutral-900 shadow-none",
              "hover:border-neutral-900",
              "dark:bg-neutral-800 dark:text-white dark:border-neutral-700  after:bg-white",
              "dark:hover:border-neutral-500"
            )}
            value={theme}
            onChange={(e) => mounted && setTheme(e.target.value)}
          >
            <option value="system">Use system preferences</option>
            <option value="light">Light mode</option>
            <option value="dark">Dark mode</option>
          </select> */}
          <Select
            value={theme || ""}
            onChange={(value) => mounted && setTheme(value)}
            options={[
              { label: "Use system preferences", value: "system" },
              { label: "Light mode", value: "light" },
              { label: "Dark mode", value: "dark" },
            ]}
          />

          {/* <input
            className={cn(
              "px-3 py-2 rounded-lg font-satoshi font-medium text-md max-w-[50%] border-[1px]",
              "bg-transparent text-neutral-900",
              "hover:border-neutral-900",
              "dark:bg-neutral-800 dark:text-white dark:border-neutral-700",
              "dark:hover:border-neutral-500"
            )}
            type="select"
            id="theme"
            value={theme}
            onChange={(e) => mounted && setTheme(e.target.value)}
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </input> */}
        </fieldset>
        <Separator className="m-0 p-0 w-full h-[1px] bg-neutral-300 dark:bg-neutral-700" />
        {/* <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs uppercase font-semibold",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Email
          </label>
          <p
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%]",
              "bg-transparent disabled:text-neutral-900",
              "dark:text-neutral-300"
            )}
            id="name"
          >
            {email}
          </p>
        </fieldset>
        <Button
          className={cn(
            "text-xs ml-0 py-2",
            "border-neutral-200 text-neutral-600",
            "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
            "dark:border-neutral-700 dark:text-neutral-400",
            "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
          )}
        >
          Change Email
        </Button>
        <Separator className="m-0 p-0 w-full h-[1px] bg-neutral-300 dark:bg-neutral-700" />
        <label
          className={cn(
            "text-xs uppercase font-semibold",
            "text-neutral-400",
            "dark:text-neutral-500"
          )}
        >
          Password
        </label>
        <Button
          className={cn(
            "text-xs ml-0 py-2 mt-2",
            "border-neutral-200 text-neutral-600",
            "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
            "dark:border-neutral-700 dark:text-neutral-400",
            "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
          )}
        >
          Change Password
        </Button> */}
      </div>
    </div>
  )
}

export default PersonalizationSettings
