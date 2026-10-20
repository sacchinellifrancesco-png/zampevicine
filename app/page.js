export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Logo / Titolo */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">LeashLove</h1>
        <p className="text-gray-500">La community per chi ama i cani</p>
      </div>

      {/* Solo 2 tasti */}
      <div className="w-full max-w-xs flex flex-col gap-4">
        <a 
          href="/login"
          className="w-full bg-black text-white text-center py-4 rounded-full font-semibold text-lg"
        >
          Entra
        </a>
        
        <a 
          href="/register"
          className="w-full bg-white text-black border border-black text-center py-4 rounded-full font-semibold text-lg"
        >
          Iscriviti
        </a>
      </div>
    </main>
  )
}
