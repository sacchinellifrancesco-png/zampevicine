import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head><title>Zampe Vicine</title></head>
      <body>{children}</body>
    </html>
  )
}
