import { createContext, useEffect, useState } from "react"
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
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useState(
    localStorage.getItem("isOpenLeftSidebar") === "true"
  )
  const [isOpenRightSidebar, setIsOpenRightSidebar] = useState(
    localStorage.getItem("isOpenRightSidebar") === "true"
  )
  const [sidebarLeftWidth, setSidebarLeftWidth] = useState(
    parseInt(localStorage.getItem("sidebarLeftWidth") || "300")
  )
  const [mainView, setMainView] = useState<"CALENDAR" | "TASKS">(
    (localStorage.getItem("mainView") as "CALENDAR" | "TASKS") || "CALENDAR"
  )

  useEffect(() => {
    localStorage.setItem("isOpenLeftSidebar", isOpenLeftSidebar.toString())
    localStorage.setItem("isOpenRightSidebar", isOpenRightSidebar.toString())
    localStorage.setItem("sidebarLeftWidth", sidebarLeftWidth.toString())
    localStorage.setItem("mainView", mainView)
  }, [isOpenLeftSidebar, isOpenRightSidebar, sidebarLeftWidth, mainView])

  const value = {
    left: isOpenLeftSidebar,
    setLeft: (value: boolean) => setIsOpenLeftSidebar(value),
    right: isOpenRightSidebar,
    setRight: (value: boolean) => setIsOpenRightSidebar(value),
    sidebarLeftWidth,
    setSidebarLeftWidth: (value: number) =>
      setSidebarLeftWidth(value > 500 ? 500 : value < 250 ? 250 : value),
    mainView,
    toggleMainView: (_: "CALENDAR" | "TASKS") =>
      setMainView(mainView === "CALENDAR" ? "TASKS" : "CALENDAR"),
  }
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
