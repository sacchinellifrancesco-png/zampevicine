'use client'
import { useState } from 'react'
import AcceptanceModal from '@/components/AcceptanceModal'
import { acceptRequest, rejectRequest } from '@/lib/matchLogic'

type CaneVicino = {
  id: string
  ownerId: string
  ownerNome: string
  ownerFoto: string
  dogNome: string
  dogFoto: string
  razza: string
  eta: string
  sesso: string
  citta: string
  distanza: string
  bio: string
}

const fintiVicini: CaneVicino[] = [
  {
    id: 'req1',
    ownerId: 'user2',
    ownerNome: 'Sofia',
    ownerFoto: 'https://i.pravatar.cc/150?img=5',
    dogNome: 'Luna',
    dogFoto: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg',
    razza: 'Golden',
    eta: '2 anni',
    sesso: 'F',
    citta: 'Milano',
    distanza: '0.8',
    bio: 'Usciamo ogni sera ai Giardini'
  },
  {
    id: 'req2',
    ownerId: 'user3',
    ownerNome: 'Marco',
    ownerFoto: 'https://i.pravatar.cc/150?img=8',
    dogNome: 'Rocky',
    dogFoto: 'https://images.dog.ceo/breeds/husky/n02110185_100.jpg',
    razza: 'Husky',
    eta: '3 anni',
    sesso: 'M',
    citta: 'Milano',
    distanza: '1.2',
    bio: 'Super energico'
  }
]

export default function Page() {
  const [showAccept, setShowAccept] = useState(false)
  const [selected, setSelected] = useState<CaneVicino | null>(null)

  const apriFinestra = (c: CaneVicino) => {
    setSelected(c)
    setShowAccept(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-1">LeashLove</h1>
      <p className="text-gray-500 mb-4">Cani vicini a te</p>

      <div className="grid gap-3">
        {fintiVicini.map((c) => (
          <div key={c.id} onClick={() => apriFinestra(c)} className="bg-white rounded-2xl p-3 flex gap-3 cursor-pointer shadow-sm">
            <img src={c.dogFoto} className="w-16 h-16 rounded-full object-cover" alt={c.dogNome} />
            <div>
              <p className="font-bold">{c.dogNome} + {c.ownerNome}</p>
              <p className="text-sm text-gray-500">{c.razza} - {c.citta} ({c.distanza} km)</p>
            </div>
          </div>
        ))}
      </div>

      {showAccept && selected && (
        <AcceptanceModal
          dog={{ nome: selected.dogNome, foto: selected.dogFoto, razza: selected.razza, eta: selected.eta, sesso: selected.sesso }}
          owner={{ nome: selected.ownerNome, foto: selected.ownerFoto, citta: selected.citta, distanzaKm: selected.distanza, bio: selected.bio }}
          onAccept={async () => {
            await acceptRequest(selected.id, 'mioId_TEMP', selected.ownerId)
            setShowAccept(false)
            alert('Hai accettato! Ora deve accettare anche l\'altro per aprire la chat')
          }}
          onReject={async () => {
            await rejectRequest(selected.id)
            setShowAccept(false)
          }}
        />
      )}
    </div>
  )
}