"use client"

import { Poppins, Roboto } from "@next/font/google"
import localFont from "@next/font/local"
import { cn } from "@/lib/utils"
import "../styles/globals.css"
import { Providers } from "@/lib/providers"
import { Suspense } from "react"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        roboto.variable,
        poppins.variable,
        satoshi.variable,
        "font-sans antialiased max-h-screen light"
      )}
    >
      <head />
      <body>
        <Providers>
          {/* <Suspense fallback={<Loading />}> */}
          {children}
          {/* </Suspense> */}
        </Providers>
      </body>
    </html>
  )
}

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-red-300">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
    </div>
  )
}
