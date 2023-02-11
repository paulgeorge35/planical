import Avatar from "@/components/avatar"
import Button from "@/components/button"
import Separator from "@/components/separator"
import { cn } from "@/lib/utils"

type AccountSettingsProps = {
  fullName: string
  email: string
}

const AccountSettings = ({ fullName, email }: AccountSettingsProps) => {
  return (
    <div className="flex h-full max-h-[85vh] grow flex-col">
      <div
        className={cn(
          "w-full border-b-[1px] p-4",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Account Settings</h1>
      </div>
      <div className={cn("flex w-full flex-col p-6")}>
        <Avatar className="h-20 w-20 cursor-auto hover:p-0" />
        <div className="mt-3 flex">
          <Button
            className={cn(
              "ml-0 py-2 text-xs",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
            )}
          >
            Upload photo
          </Button>
          <Button
            className={cn(
              "py-2 text-xs",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
            )}
          >
            Remove
          </Button>
        </div>
        <Separator rootClassName="py-4" />
        <fieldset className="group mt-0 flex flex-col space-y-2">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Name
          </label>

          <input
            className={cn(
              "text-md max-w-[50%] rounded-lg border-[1px] px-3 py-2 font-satoshi font-medium",
              "bg-transparent text-neutral-900",
              "hover:border-neutral-900",
              "dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
              "dark:hover:border-neutral-500"
            )}
            type="text"
            id="name"
            defaultValue={fullName}
          />
        </fieldset>
        <Separator rootClassName="py-4" />
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Email
          </label>
          <p
            className={cn(
              "text-md max-w-[50%] py-2 font-satoshi",
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
            "ml-0 py-2 text-xs",
            "border-neutral-200 text-neutral-600",
            "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
            "dark:border-neutral-700 dark:text-neutral-400",
            "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
          )}
        >
          Change Email
        </Button>
        <Separator rootClassName="py-4" />
        <label
          className={cn(
            "text-xs font-semibold uppercase",
            "text-neutral-400",
            "dark:text-neutral-500"
          )}
        >
          Password
        </label>
        <Button
          className={cn(
            "ml-0 mt-2 py-2 text-xs",
            "border-neutral-200 text-neutral-600",
            "hover:border-purple-600 hover:bg-purple-50 hover:text-purple-600",
            "dark:border-neutral-700 dark:text-neutral-400",
            "dark:hover:border-purple-600 dark:hover:bg-transparent dark:hover:text-purple-600"
          )}
        >
          Change Password
        </Button>
      </div>
    </div>
  )
}

export default AccountSettings
