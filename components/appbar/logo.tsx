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
        "flex h-full min-w-[250px] max-w-[500px] items-center border-r-[0.5px] border-neutral-200 transition-all",
        "dark:border-neutral-600",
        left ? `p-4 w-[${"300"}px]` : "w-0 min-w-0 p-0 "
      )}
      style={{ width: `${left ? sidebarWidth : 0}px` }}
    >
      <h1
        className={cn(
          "font-sans text-2xl transition-all",
          `${left ? "block" : "hidden"}`
        )}
      >
        <span className="text-neutral-900 dark:text-white">planical</span>
      </h1>
    </div>
  )
}

export default Logo
