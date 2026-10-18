export const metadata = { title: "Zampe Vicine" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{margin:0, padding:20, backgroundColor:'white', color:'black'}}>
        {children}
      </body>
    </html>
  )
}
