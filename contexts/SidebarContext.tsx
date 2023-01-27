import { useLocalStorage } from "@/hooks/use-local-storage"
import { createContext } from "react"
import { SidebarContextType } from "types"

export const SidebarContext = createContext({
  left: true,
  setLeft: (_: boolean) => null,
  right: true,
  setRight: (_: boolean) => null,
  setSidebarLeftWidth: (_: number) => null,
  sidebarLeftWidth: 300,
  mainView: "CALENDAR",
  toggleMainView: (_: "CALENDAR" | "TASKS") => null,
} as SidebarContextType)

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useLocalStorage(
    "isOpenLeftSidebar",
    true
  )
  const [isOpenRightSidebar, setIsOpenRightSidebar] = useLocalStorage(
    "isOpenRightSidebar",
    true
  )
  const [sidebarLeftWidth, setSidebarLeftWidth] = useLocalStorage(
    "sidebarLeftWidth",
    300
  )
  const [mainView, setMainView] = useLocalStorage("mainView", "CALENDAR")

  const value = {
    left: isOpenLeftSidebar,
    setLeft: (value: boolean) => setIsOpenLeftSidebar(value),
    right: isOpenRightSidebar,
    setRight: (value: boolean) => setIsOpenRightSidebar(value),
    sidebarLeftWidth,
    setSidebarLeftWidth: (value: number) =>
      setSidebarLeftWidth(value > 500 ? 500 : value < 250 ? 250 : value),
    // cast mainView to "CALENDAR" | "TASKS" to avoid type error
    mainView: mainView as "CALENDAR" | "TASKS",
    toggleMainView: (_: "CALENDAR" | "TASKS") =>
      setMainView(mainView === "CALENDAR" ? "TASKS" : "CALENDAR"),
  }
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
