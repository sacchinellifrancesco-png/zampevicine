import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zampe Vicine",
  description: "Trova dog sitter vicino a te",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
