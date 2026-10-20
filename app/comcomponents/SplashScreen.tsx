"use client"
export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] to-[#FF8C42] animate-fadeOut">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur">
          <span className="text-4xl">🐾</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight">LeashLove</h1>
        <p className="text-white/90 mt-3 text-lg font-medium">Trova un nuovo amico al tuo cane</p>
        <div className="flex gap-2 mt-12">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  )
}
