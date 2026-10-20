import type { Metadata } from "next";
import CookieBanner from "../components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://leashlove.it'),
  title: "LeashLove - Incontra cani vicino a te a Roma",
  description: "Il social per padroni di cani a Roma. Trova cani vicino a te e organizza passeggiate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
