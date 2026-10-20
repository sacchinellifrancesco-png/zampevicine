
import Link from "next/link"
export default function Register(){
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Iscrivi il tuo cane gratis</h1>
        <p className="text-gray-600 mb-6">Fase pilota Roma - 100% gratuito</p>
        <div className="bg-gray-50 border rounded-2xl p-6 mb-6">
          <p className="text-sm">Modulo iscrizione in arrivo. Per ora scrivici su WhatsApp o email.</p>
          <a href="mailto:info@leashlove.it?subject=Iscrizione Pilota" className="mt-4 bg-black text-white px-6 py-3 rounded-full inline-block text-sm">Scrivici per iscriverti</a>
        </div>
        <Link href="/" className="text-sm underline">Torna alla Home</Link>
      </div>
    </main>
  )
}
