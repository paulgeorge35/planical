import Separator from "@/components/separator"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useSession } from "@supabase/auth-helpers-react"

type HelpProps = {}

const Help = ({}: HelpProps) => {
  const session = useSession()
  return (
    <div className="flex h-full max-h-[85vh] grow flex-col">
      <div
        className={cn(
          "w-full border-b-[1px] p-4",
          "border-neutral-300",
          "dark:border-neutral-700"
        )}
      >
        <h1 className={cn("font-sans font-medium")}>Help & Support</h1>
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
            Changelog
          </label>
          <a
            href="https://planical.canny.io"
            className={cn(
              "text-md flex max-w-[50%] cursor-pointer items-center py-2 font-satoshi transition-colors duration-200 ease-in-out",
              "text-purple-500 hover:text-purple-700",
              "dark:text-purple-500 dark:hover:text-purple-700"
            )}
          >
            What&apos;s new & What&apos;s upcoming{" "}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </fieldset>
      </div>
      <Separator rootClassName="py-4" />
      <div className={cn("flex w-full flex-col p-6 pb-0")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            Contact support
          </label>
          <a
            href="mailto:contact@paulgeorge.dev"
            className={cn(
              "text-md flex max-w-[50%] cursor-pointer items-center py-2 font-satoshi transition-colors duration-200 ease-in-out",
              "text-purple-500 hover:text-purple-700",
              "dark:text-purple-500 dark:hover:text-purple-700"
            )}
          >
            contact@paulgeorge.dev <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </fieldset>
      </div>
      <Separator rootClassName="py-4" />
      <div className={cn("flex w-full flex-col p-6 pb-0")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            User ID (For support)
          </label>
          <a
            className={cn(
              "text-md flex max-w-full items-center py-2 font-satoshi",
              "text-neutral-900",
              "dark:text-neutral-200"
            )}
          >
            {session?.user?.id}
          </a>
        </fieldset>
      </div>
      <Separator rootClassName="py-4" />
      <div className={cn("flex w-full flex-col p-6 pb-0")}>
        <fieldset className="flex flex-col">
          <label
            className={cn(
              "text-xs font-semibold uppercase",
              "text-neutral-400",
              "dark:text-neutral-500"
            )}
          >
            App Version
          </label>
          <a
            className={cn(
              "text-md flex max-w-[50%] items-center py-2 font-satoshi",
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
