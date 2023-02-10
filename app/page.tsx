"use client"

import { useCallback, useContext, useEffect, useState } from "react"

import CalendarView from "@/components/calendar-view"
import Dialog from "@/components/dialog"
import ProfileDialogContent from "@/components/dialog/profile-dialog-content"
import SidebarLeft from "@/components/sidebar-left"
import SidebarRight from "@/components/sidebar-right"
import TasksToolbar from "@/components/appbar/tasks-toolbar"
import TasksView from "@/components/tasks-view"
import Toolbar from "@/components/appbar/toolbar"
import WelcomeDialogContent from "@/components/dialog/welcome-dialog-content"

import { SidebarContext } from "@/contexts/SidebarContextProvider"

import { useMounted } from "@/hooks/use-mounted"

import { cn } from "@/lib/utils"
import MobileNav from "@/components/mobile-nav"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { DragDropContext } from "react-beautiful-dnd"

export default function Home() {
  const mounted = useMounted()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const session = useSession()

  const { mainView, left, right, sidebarLeftWidth, setSidebarLeftWidth } =
    useContext(SidebarContext)
  const [profileDialogueOpen, setProfileDialogueOpen] = useState(false)
  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false)
  const [newAccount, _] = useState(false)

  const toggleProfileDialogue = useCallback(() => {
    setProfileDialogueOpen(!profileDialogueOpen)
  }, [profileDialogueOpen])

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" && !session) {
        router.push("/login")
      }
    })
  }, [])

  useEffect(() => {
    if (mounted && !session) {
      router.push("/login")
    }
  }, [session, mounted])

  useEffect(() => {
    setInterval(() => {
      if (mounted && newAccount) {
        setNewAccountDialogOpen(true)
      }
    }, 200)
  }, [mounted, newAccount])

  return (
    <DragDropContext onDragEnd={() => null}>
      <div className="flex h-screen flex-row">
        <MobileNav />
        <Dialog
          className="p-0"
          open={profileDialogueOpen}
          toggle={toggleProfileDialogue}
          dismissOnEscapeKey={true}
        >
          <ProfileDialogContent />
        </Dialog>
        <Dialog
          className={cn("max-w-[600px] p-6 py-8")}
          open={newAccountDialogOpen}
          toggle={() => setNewAccountDialogOpen(false)}
          closeButton={false}
        >
          <WelcomeDialogContent
            onClose={() => setNewAccountDialogOpen(false)}
          />
        </Dialog>
        <SidebarLeft
          left={left}
          sidebarWidth={sidebarLeftWidth}
          setSidebarWidth={setSidebarLeftWidth}
        />
        <span className="flex flex-col">
          <div
            className={cn(
              "flex h-12 border-b-[0.5px] border-neutral-200 bg-white",
              "dark:border-neutral-600 dark:bg-neutral-900",
              "phone:hidden"
            )}
          >
            <Toolbar openProfileDialogue={() => setProfileDialogueOpen(true)} />
            <TasksToolbar right={right} mainView={mainView} />
          </div>
          <span className="flex h-full flex-row">
            <main
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center p-0",
                "dark:bg-neutral-800",
                mainView === "CALENDAR"
                  ? "bg-white dark:bg-neutral-800"
                  : "bg-slate-50 dark:bg-neutral-900",
                "phone:hidden"
              )}
            >
              {mainView === "CALENDAR" ? (
                <CalendarView />
              ) : (
                <TasksView sidebarLeftWidth={left ? sidebarLeftWidth : 1} />
              )}
            </main>
            <SidebarRight right={right} mainView={mainView} />
          </span>
        </span>
      </div>
    </DragDropContext>
  )
}
