'use client'

type Dog = { nome: string; foto: string; razza: string; eta: string; sesso: string }
type Owner = { nome: string; foto: string; citta: string; distanzaKm: string; bio: string }

export default function AcceptanceModal({ dog, owner, onAccept, onReject }: {
  dog: Dog
  owner: Owner
  onAccept: () => void
  onReject: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-[28px] w-full max-w-[380px] overflow-hidden shadow-2xl">
        <div className="p-5 pb-3 text-center">
          <h2 className="text-xl font-bold">Nuova richiesta!</h2>
          <p className="text-sm text-gray-500">Vuoi accettare questa passeggiata?</p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5">
          {/* METÀ PADRONE */}
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <img src={owner.foto} className="w-20 h-20 rounded-full mx-auto object-cover" alt={owner.nome} />
            <p className="font-bold mt-2">{owner.nome}</p>
            <p className="text-xs text-gray-500">{owner.citta} • {owner.distanzaKm} km</p>
            <p className="text-xs mt-2 text-gray-600">{owner.bio}</p>
          </div>
          {/* METÀ CANE */}
          <div className="bg-orange-50 rounded-2xl p-3 text-center">
            <img src={dog.foto} className="w-20 h-20 rounded-full mx-auto object-cover" alt={dog.nome} />
            <p className="font-bold mt-2">{dog.nome}</p>
            <p className="text-xs text-gray-500">{dog.razza} • {dog.eta} • {dog.sesso}</p>
          </div>
        </div>

        <div className="p-5 flex gap-3">
          <button onClick={onReject} className="flex-1 h-12 rounded-full bg-gray-100 font-bold">Rifiuta</button>
          <button onClick={onAccept} className="flex-1 h-12 rounded-full bg-black text-white font-bold">Accetta 🐾</button>
        </div>
      </div>
    </div>
  )
}