import Button from "@/components/button"
import Separator from "@/components/separator"
import { SessionContext } from "@/contexts/SessionContext"
import { cn, ProfileDialogTabSections } from "@/lib/utils"
import { ExitIcon } from "@radix-ui/react-icons"
import { useContext } from "react"

type ProfileDialogTabProps =
  (typeof ProfileDialogTabSections)[number]["tabs"][number] & {
    active: boolean
    toggleActiveTab: () => void
  }

const ProfileDialogTab = ({
  label,
  icon,
  active,
  toggleActiveTab,
}: ProfileDialogTabProps) => {
  return (
    <Button
      className={cn(
        "m-0 mt-1 w-full border-0 bg-transparent",
        "text-neutral-900",
        "dark:text-neutral-100",
        "hover:bg-neutral-200",
        "dark:hover:bg-neutral-700",
        active && "bg-neutral-200 dark:bg-neutral-700"
      )}
      icon={icon}
      onClick={toggleActiveTab}
    >
      <h1 className="py-1 px-2 font-semibold">{label}</h1>
    </Button>
  )
}

type ProfileDIalogSectionProps = {
  title?: string
  tabs: (typeof ProfileDialogTabSections)[number]["tabs"][number][]
  activeTab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  toggleActiveTab: (
    tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  ) => void
  additionalActions: (
    tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  ) => void
}

const ProfileDialogSection = ({
  title,
  tabs,
  activeTab,
  toggleActiveTab,
  additionalActions,
}: ProfileDIalogSectionProps) => {
  return (
    <span className="flex flex-col">
      {title && (
        <h1
          className={cn(
            "px-3 pt-3 text-xs font-semibold uppercase",
            "text-neutral-500",
            "dark:text-neutral-600"
          )}
        >
          {title}
        </h1>
      )}
      {tabs.map((tab, index) => (
        <ProfileDialogTab
          key={index}
          {...tab}
          active={activeTab === tab.value}
          toggleActiveTab={() =>
            title ? toggleActiveTab(tab.value) : additionalActions(tab.value)
          }
        />
      ))}
      <Separator rootClassName="px-3 py-2" />
    </span>
  )
}

type ProfileDialogTabsProps = {
  className?: string
  sections: typeof ProfileDialogTabSections
  activeTab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  toggleActiveTab: (
    tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  ) => void
  additionalActions: (
    tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  ) => void
}

const ProfileDialogTabs = ({
  className,
  activeTab,
  sections,
  toggleActiveTab,
  additionalActions,
}: ProfileDialogTabsProps) => {
  const { signOut } = useContext(SessionContext)
  return (
    <div className={cn("flex h-full grow flex-col", className)}>
      {sections.map((section, index) => (
        <ProfileDialogSection
          key={index}
          {...section}
          activeTab={activeTab}
          toggleActiveTab={toggleActiveTab}
          additionalActions={additionalActions}
        />
      ))}
      <span className="flex grow flex-col">
        <Button
          className={cn(
            "group m-0 mt-1 w-full border-0 bg-transparent !text-purple-500",
            "hover:!text-neutral-900",
            "dark:hover:!text-neutral-100"
          )}
          icon={ExitIcon}
          onClick={signOut}
        >
          <h1
            className={cn(
              "py-1 px-2 font-semibold text-purple-500",
              "group-hover:text-neutral-900",
              "dark:group-hover:text-neutral-100"
            )}
          >
            Log out
          </h1>
        </Button>
      </span>
    </div>
  )
}

export default ProfileDialogTabs
