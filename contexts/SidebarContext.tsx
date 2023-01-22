import { createContext, useState } from "react"
import { SidebarContextType } from "types"

export const SidebarContext = createContext({
  left: true,
  setLeft: (_: boolean) => null,
  right: true,
  setRight: (_: boolean) => null,
} as SidebarContextType)

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useState(true)
  const [isOpenRightSidebar, setIsOpenRightSidebar] = useState(true)

  const value = {
    left: isOpenLeftSidebar,
    setLeft: (value: boolean) => setIsOpenLeftSidebar(value),
    right: isOpenRightSidebar,
    setRight: (value: boolean) => setIsOpenRightSidebar(value),
  }
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
