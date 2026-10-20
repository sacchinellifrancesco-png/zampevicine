
import Link from "next/link"
export default function Login(){
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Bentornato! 🐾</h1>
        <p className="text-gray-600 mb-6">Il login per la fase pilota è quasi pronto.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-full inline-block">Torna alla Home</Link>
      </div>
    </main>
  )
}
