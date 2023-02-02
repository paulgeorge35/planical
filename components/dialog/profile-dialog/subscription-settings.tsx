import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"

type SubscriptionSettingsProps = {}

const SubscriptionSettings = ({}: SubscriptionSettingsProps) => {
  return (
    <div className="flex flex-col h-full grow ">
      <div
        className={cn(
          "p-4 w-full border-b-[1px]",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Subscription Settings</h1>
      </div>
      <div className={cn("p-6 pb-0 w-full flex flex-col")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs uppercase font-semibold",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Membership
          </label>
          <p
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%]",
              "bg-transparent disabled:text-neutral-900",
              "dark:text-neutral-300"
            )}
          >
            Free Plan
          </p>
        </fieldset>
      </div>
      <div className={cn("p-6 pb-0 w-full flex flex-col")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs uppercase font-semibold",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Upgrade To Pro
          </label>
          <a
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%] flex items-center cursor-not-allowed line-through",
              "text-purple-500",
              "dark:text-purple-500"
            )}
          >
            Upgrade to Pro <ArrowRightIcon className="ml-2 w-5 h-5" />
          </a>
        </fieldset>
      </div>
    </div>
  )
}

export default SubscriptionSettings
