'use client'
import { useState } from 'react'
import AcceptanceModal from '@/components/AcceptanceModal'
import { acceptRequest, rejectRequest } from '@/lib/matchLogic'

export default function Page() {
  const [show, setShow] = useState(false)
  const [sel, setSel] = useState<any>(null)

  const cani = [
    { id: '1', ownerId: 'u2', ownerNome: 'Sofia', ownerFoto: 'https://i.pravatar.cc/150?img=5', dogNome: 'Luna', dogFoto: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg', razza: 'Golden', eta: '2 anni', sesso: 'F', citta: 'Milano', distanza: '0.8', bio: 'Usciamo ai Giardini' },
    { id: '2', ownerId: 'u3', ownerNome: 'Marco', ownerFoto: 'https://i.pravatar.cc/150?img=8', dogNome: 'Rocky', dogFoto: 'https://images.dog.ceo/breeds/husky/n02110185_100.jpg', razza: 'Husky', eta: '3 anni', sesso: 'M', citta: 'Milano', distanza: '1.2', bio: 'Energico' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold">LeashLove</h1>
      <p className="text-gray-500 mb-4">Clicca un cane per provare la finestra</p>
      <div className="space-y-3">
        {cani.map(c => (
          <div key={c.id} onClick={() => { setSel(c); setShow(true) }} className="bg-white p-3 rounded-2xl flex gap-3 shadow-sm cursor-pointer">
            <img src={c.dogFoto} className="w-16 h-16 rounded-full object-cover" />
            <div><p className="font-bold">{c.dogNome} + {c.ownerNome}</p><p className="text-sm text-gray-500">{c.razza} - {c.distanza} km</p></div>
          </div>
        ))}
      </div>

      {show && sel && (
        <AcceptanceModal
          dog={{ nome: sel.dogNome, foto: sel.dogFoto, razza: sel.razza, eta: sel.eta, sesso: sel.sesso }}
          owner={{ nome: sel.ownerNome, foto: sel.ownerFoto, citta: sel.citta, distanzaKm: sel.distanza, bio: sel.bio }}
          onAccept={async () => { await acceptRequest(sel.id, 'mioId', sel.ownerId); setShow(false); alert('Accettato!') }}
          onReject={async () => { await rejectRequest(sel.id); setShow(false) }}
        />
      )}
    </div>
  )
}