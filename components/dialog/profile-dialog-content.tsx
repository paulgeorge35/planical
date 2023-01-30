import { cn } from "@/lib/utils"
import Avatar from "../avatar"
import AccountSettings from "./profile-dialog/account-settings"

type ProfileDialogContentProps = {}

const ProfileDialogContent = ({}: ProfileDialogContentProps) => {
  return (
    <span className="flex flex-row h-full w-full">
      <div
        className={cn(
          "p-4 border-r-[1px] w-[300px] h-full",
          "bg-neutral-100 border-neutral-300",
          "dark:bg-neutral-800 dark:border-neutral-700"
        )}
      >
        <span className={cn("flex flex-col")}>
          <span className="flex space-x-2 h-10">
            <Avatar className="hover:p-0 cursor-auto h-full" />
            <span className="flex flex-col h-full justify-center">
              <h1 className={cn("font-satoshi font-medium text-sm")}>
                Paul George Tibulca
              </h1>
              <p
                className={cn(
                  "text-xs text-neutral-400",
                  "dark:text-neutral-500"
                )}
              >
                paultibulca@gmail.com
              </p>
            </span>
          </span>
        </span>
      </div>
      <AccountSettings
        fullName="Paul George Tibulca"
        email="paultibulca@gmail.com"
      />
    </span>
  )
}

export default ProfileDialogContent
