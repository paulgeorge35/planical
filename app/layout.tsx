import { Poppins, Roboto } from "@next/font/google"
import localFont from "@next/font/local"
import { cn } from "@/lib/utils"
import "../styles/globals.css"
import { Providers } from "@/lib/providers"

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
        "font-sans antialiased",
        roboto.variable,
        poppins.variable,
        satoshi.variable
      )}
    >
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
