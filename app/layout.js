import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "LeashLove",
  description: "Trova cani vicino a te",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="bg-zinc-50">{children}</body>
    </html>
  );
}
