export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head><title>Zampe Vicine</title></head>
      <body style={{margin:0, background:'white', color:'black'}}>{children}</body>
    </html>
  )
}
