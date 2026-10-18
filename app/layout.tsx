export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{margin:0, fontFamily:'system-ui', background:'white', color:'black'}}>
        {children}
      </body>
    </html>
  )
}
