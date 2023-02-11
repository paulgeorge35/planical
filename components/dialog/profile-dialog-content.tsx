import { cn, ProfileDialogTabSections } from "@/lib/utils"
import { useState } from "react"
import Avatar from "../avatar"
import AccountSettings from "./profile-dialog/account-settings"
import Help from "./profile-dialog/help"
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
    <span className="flex h-full w-full flex-row">
      <div
        className={cn(
          "w-[300px] border-r-[1px] p-4 ",
          "border-neutral-300 bg-neutral-50",
          "dark:border-neutral-700 dark:bg-neutral-800"
        )}
      >
        <span className={cn("flex flex-col")}>
          <span className="flex h-10 space-x-2 px-3">
            <Avatar className="h-full cursor-auto hover:p-0" />
            <span className="flex h-full flex-col justify-center">
              <h1 className={cn("font-satoshi text-sm font-medium")}>
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
            ) => {
              switch (tab) {
                case "help":
                  setActiveTab("help")
                  break
                case "feedback":
                  window.open("https://planical.canny.io/give-feedback")
                  break
                default:
                  break
              }
            }}
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
      {activeTab === "help" && <Help />}
    </span>
  )
}

export default ProfileDialogContent
