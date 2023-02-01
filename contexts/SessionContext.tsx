import supabase from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import { createContext, useEffect, useState } from "react"
import { SessionContextType } from "types"

export const SessionContext = createContext({
  session: null,
  signOut: () => null,
} as SessionContextType)

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [session, setSession] = useState<any>(null)

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession()
    setSession(data.session?.user)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  useEffect(() => {
    if (session) router.push("/")
    if (!session && pathname !== "/login") router.push("/login")
  }, [session])

  const value = {
    session,
    signOut,
  }
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
