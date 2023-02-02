import { cn } from "@/lib/utils"

const Logo = ({
  left,
  sidebarWidth,
}: {
  left: boolean
  sidebarWidth: number
}) => {
  return (
    <div
      className={cn(
        "h-full border-r-[0.5px] flex min-w-[250px] max-w-[500px] items-center transition-all border-neutral-200",
        "dark:border-neutral-600",
        left ? `p-4 w-[${"300"}px]` : "w-0 min-w-0 p-0 "
      )}
      style={{ width: `${left ? sidebarWidth : 0}px` }}
    >
      <h1
        className={cn(
          "text-2xl font-sans transition-all",
          `${left ? "block" : "hidden"}`
        )}
      >
        <span className="text-neutral-900 dark:text-white">planical</span>
      </h1>
    </div>
  )
}

export default Logo
