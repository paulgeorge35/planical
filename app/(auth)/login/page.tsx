"use client"

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import supabase from '@/lib/supabase'

export default function Home() {
  return (
    <div className="p-0 px-8">
      <main className="min-h-screen p-0 py-16 flex flex-1 flex-col justify-center items-center">
        <h1 className="no-underline text-[#0070f3]">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Auth 
            supabaseClient={supabase} 
            appearance={{theme: ThemeSupa}}
            theme='supabase'
        />
      </main>
    </div>
  )
}
