import type { Metadata } from "next"
import "./globals.css"
import CookieBanner from "./CookieBanner"

export const metadata: Metadata = {
  title: "Leash Love - Fedeltà",
  description: "Programma fedeltà Leash Love",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
