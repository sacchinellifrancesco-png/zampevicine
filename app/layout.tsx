import type { Metadata } from "next"
import Script from "next/script"
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="it">
      <body>
        {children}
        <CookieBanner />
        
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
