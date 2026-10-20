import Link from "next/link"
export default function Grazie(){
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white text-center">
      <div className="max-w-md">
        <h1 className="text-4xl mb-4">🐾</h1>
        <h1 className="text-3xl font-bold mb-3">Richiesta inviata!</h1>
        <p className="text-gray-600 mb-2">Abbiamo ricevuto il tuo messaggio su WhatsApp.</p>
        <p className="text-gray-600 mb-8 text-sm">Ti rispondiamo noi personalmente su WhatsApp entro 24 ore per farti entrare nel gruppo pilota di Roma.</p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-full inline-block text-sm">Torna alla Home</Link>
      </div>
    </main>
  )
}
