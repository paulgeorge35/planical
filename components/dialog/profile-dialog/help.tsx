import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"

type HelpProps = {}

const Help = ({}: HelpProps) => {
  return (
    <div className="flex flex-col h-full grow ">
      <div
        className={cn(
          "p-4 w-full border-b-[1px]",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Help & Support</h1>
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
            Changelog
          </label>
          <a
            href="https://planical.canny.io"
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%] flex items-center cursor-pointer transition-colors duration-200 ease-in-out",
              "text-purple-500 hover:text-purple-700",
              "dark:text-purple-500 dark:hover:text-purple-700"
            )}
          >
            What's new & What's upcoming{" "}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </a>
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
            Contact support
          </label>
          <a
            href="mailto:paultibulca@gmail.com"
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%] flex items-center cursor-pointer transition-colors duration-200 ease-in-out",
              "text-purple-500 hover:text-purple-700",
              "dark:text-purple-500 dark:hover:text-purple-700"
            )}
          >
            paultibulca@gmail.com <ArrowRightIcon className="ml-2 w-5 h-5" />
          </a>
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
            App Version
          </label>
          <a
            className={cn(
              "py-2 font-satoshi text-md max-w-[50%] flex items-center",
              "text-neutral-900",
              "dark:text-neutral-200"
            )}
          >
            0.1.0-alpha.1
          </a>
        </fieldset>
      </div>
    </div>
  )
}

export default Help
