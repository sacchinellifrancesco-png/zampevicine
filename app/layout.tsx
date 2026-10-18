import "./globals.css";
export const metadata = {
  title: "Leash Love - Incontri per cani vicini a Roma",
  description: "Trova cani compatibili vicino a te a Roma",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
