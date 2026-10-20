import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeashLove - Dove i cani di Roma si incontrano",
  description: "Trova compagni di passeggiata per il tuo cane a Roma. Fase pilota gratuita.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
