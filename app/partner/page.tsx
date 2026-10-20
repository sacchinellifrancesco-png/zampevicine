import Link from "next/link"
export default function Partner(){
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Diventa Partner Pilota</h1>
        <p className="text-gray-600 mb-8">Stiamo selezionando 3 negozi / cliniche a Roma per la fase pilota gratuita.</p>
        <a href="mailto:info@leashlove.it?subject=Diventare Partner LeashLove&body=Ciao! Sono interessato a diventare partner..." className="bg-black text-white px-8 py-4 rounded-full inline-block font-medium">Contattaci via Email</a>
        <p className="text-xs text-gray-400 mt-4">info@leashlove.it - Rispondiamo in 24h</p>
        <div className="mt-10"><Link href="/" className="text-sm underline">Torna alla Home</Link></div>
      </div>
    </main>
  )
}
