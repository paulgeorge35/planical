import { cn, ProfileDialogTabSections } from "@/lib/utils"
import { useState } from "react"
import Avatar from "../avatar"
import AccountSettings from "./profile-dialog/account-settings"
import LabelsSettings from "./profile-dialog/labels-settings"
import PersonalizationSettings from "./profile-dialog/personalization-settings"
import ProfileDialogTabs from "./profile-dialog/profile-dialog-tabs"
import SubscriptionSettings from "./profile-dialog/subscription-settings"

type ProfileDialogContentProps = {}

const ProfileDialogContent = ({}: ProfileDialogContentProps) => {
  const [activeTab, setActiveTab] = useState<
    (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
  >(ProfileDialogTabSections[0].tabs[0].value)

  return (
    <span className="flex flex-row">
      <div
        className={cn(
          "p-4 border-r-[1px] w-[300px] ",
          "bg-neutral-50 border-neutral-300",
          "dark:bg-neutral-800 dark:border-neutral-700"
        )}
      >
        <span className={cn("flex flex-col")}>
          <span className="flex space-x-2 h-10 px-3">
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
          <ProfileDialogTabs
            sections={ProfileDialogTabSections}
            activeTab={activeTab}
            toggleActiveTab={(
              tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
            ) => setActiveTab(tab)}
            additionalActions={(
              tab: (typeof ProfileDialogTabSections)[number]["tabs"][number]["value"]
            ) => {}}
          />
        </span>
      </div>
      {activeTab === "account-settings" && (
        <AccountSettings
          fullName="Paul George Tibulca"
          email="paultibulca@gmail.com"
        />
      )}
      {activeTab === "personalization-settings" && <PersonalizationSettings />}
      {activeTab === "labels-settings" && <LabelsSettings />}
      {activeTab === "subscription-settings" && <SubscriptionSettings />}
    </span>
  )
}

export default ProfileDialogContent
