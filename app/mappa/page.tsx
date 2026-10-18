export default function Mappa() {
  return (
    <main className="h-screen flex flex-col bg-[#FFFBF0]">
      <div className="p-4 flex justify-between items-center bg-white border-b">
        <a href="/" className="font-black">🐾 Zampe Vicine</a>
        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">● 12 cani vicino a te</span>
      </div>
      <div className="flex-1 relative">
        <iframe width="100%" height="100%" style={{border:0}} src="https://www.openstreetmap.org/export/embed.html?bbox=12.442%2C41.895%2C12.488%2C41.92&layer=mapnik&marker=41.9075%2C12.465"></iframe>
        <div className="absolute bottom-6 left-6 right-6 bg-white rounded-[1.5rem] p-4 shadow-xl flex justify-between items-center">
          <div><p className="font-black">Parco di Villa Borghese</p><p className="text-sm text-zinc-500">3 cani stanno passeggiando ora</p></div>
          <a href="/iscriviti" className="px-5 py-3 bg-black text-white rounded-full font-bold">Unisciti</a>
        </div>
      </div>
    </main>
  )
}
