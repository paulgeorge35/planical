import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"

type SubscriptionSettingsProps = {}

const SubscriptionSettings = ({}: SubscriptionSettingsProps) => {
  return (
    <div className="flex h-full max-h-[85vh] grow flex-col">
      <div
        className={cn(
          "w-full border-b-[1px] p-4",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Subscription Settings</h1>
      </div>
      <div className={cn("flex w-full flex-col p-6 pb-0")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Membership
          </label>
          <p
            className={cn(
              "text-md max-w-[50%] py-2 font-satoshi",
              "bg-transparent disabled:text-neutral-900",
              "dark:text-neutral-300"
            )}
          >
            Free Plan
          </p>
        </fieldset>
      </div>
      <div className={cn("flex w-full flex-col p-6 pb-0")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Upgrade To Pro
          </label>
          <a
            className={cn(
              "text-md flex max-w-[50%] cursor-not-allowed items-center py-2 font-satoshi line-through",
              "text-purple-500",
              "dark:text-purple-500"
            )}
          >
            Upgrade to Pro <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </fieldset>
      </div>
    </div>
  )
}

export default SubscriptionSettings
