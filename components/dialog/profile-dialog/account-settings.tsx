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
    <div className="flex flex-col h-full grow ">
      <div
        className={cn(
          "p-4 w-full border-b-[1px]",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Account Settings</h1>
      </div>
      <div className={cn("p-6 w-full flex flex-col")}>
        <Avatar className="h-20 w-20 hover:p-0 cursor-auto" />
        <div className="flex mt-3">
          <Button
            className={cn(
              "text-xs ml-0 py-2",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
            )}
          >
            Upload photo
          </Button>
          <Button
            className={cn(
              "text-xs py-2",
              "border-neutral-200 text-neutral-600",
              "hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50",
              "dark:border-neutral-700 dark:text-neutral-400",
              "dark:hover:text-purple-600 dark:hover:border-purple-600 dark:hover:bg-transparent"
            )}
          >
            Remove
          </Button>
        </div>
        <Separator className="m-0 p-0 w-full h-[1px] bg-neutral-300 dark:bg-neutral-700" />
        <fieldset className="mt-0 group flex flex-col space-y-2">
          <label
            className={cn(
              "font-medium text-sm uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Name
          </label>
          <input
            className={cn(
              "px-3 py-2 rounded-lg font-satoshi font-medium text-md max-w-[50%] border-[1px]",
              "bg-transparent text-neutral-900",
              "hover:border-neutral-900",
              "dark:bg-neutral-800 dark:text-white dark:border-neutral-700",
              "dark:hover:border-neutral-500"
            )}
            type="text"
            id="name"
            defaultValue={fullName}
          />
        </fieldset>
        <Separator className="m-0 p-0 w-full h-[1px] bg-neutral-300 dark:bg-neutral-700" />
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "font-medium text-sm uppercase",
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
            "font-medium text-sm uppercase",
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
        </Button>
      </div>
    </div>
  )
}

export default AccountSettings
