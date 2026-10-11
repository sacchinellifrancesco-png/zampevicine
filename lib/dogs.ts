import type { LatLng } from '@/components/MapView';

export type Character = 'Giocoso' | 'Tranquillo' | 'Energico' | 'Socievole';
export type Badge =
  | 'Vaccinato'
  | 'Socievole'
  | 'Ama i bambini'
  | 'Microchippato'
  | 'Buono con altri cani';
export interface Dog extends LatLng {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  size?: 'Piccola' | 'Media' | 'Grande';
  lastSeen?: string;
  photo: string;
  character: Character;
  ownerName: string;
  ownerPhoto: string;
  city: string;
  isVisibleNow: boolean;
  visibleUntil: string | null;
  badges: Badge[];
  bio: string;
  place: string;
  walks: number;
  joinedMonths: number;
}
export interface User {
  id: string;
  email: string;
  name: string;
  dogId: string;
}
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverDogId: string;
  text: string;
  createdAt: string;
}
export interface Chat {
  id: string;
  dogId: string;
  unread: number;
  messages: Message[];
}
export const ROME = { latitude: 41.9118, longitude: 12.4904 };
export const MILAN = { latitude: 45.4642, longitude: 9.19 };
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
const owner = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&h=120&q=80`;
const visibleUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString();
const base = {
  isVisibleNow: true,
  visibleUntil,
  badges: ['Vaccinato', 'Socievole'] as Badge[],
  walks: 42,
  joinedMonths: 3,
};
export const dogs: Dog[] = [
  {
    ...base,
    id: 'moka',
    name: 'Moka',
    breed: 'Golden Retriever',
    age: 3,
    weight: 28,
    photo: photo('photo-1633722715463-d30f4f325e24'),
    character: 'Giocoso',
    ownerName: 'Giulia',
    ownerPhoto: owner('photo-1534528741775-53994a69daeb'),
    city: 'Roma',
    latitude: 41.9142,
    longitude: 12.4922,
    badges: ['Vaccinato', 'Socievole', 'Ama i bambini'],
    bio: 'Esperto di palline, pozzanghere e nuove amicizie. Cerchiamo compagni per una passeggiata a Villa Borghese, magari con una pausa al sole!',
    place: 'Villa Borghese',
    walks: 127,
  },
  {
    ...base,
    id: 'luna',
    name: 'Luna',
    breed: 'Beagle',
    age: 2,
    weight: 10,
    photo: photo('photo-1543466835-00a7907e9de1'),
    character: 'Socievole',
    ownerName: 'Sofia',
    ownerPhoto: owner('photo-1524504388940-b1c1722653e1'),
    city: 'Roma',
    latitude: 41.9109,
    longitude: 12.478,
    bio: 'Un naso curioso e una coda sempre in movimento. Al Pincio c’è sempre qualcosa da annusare insieme.',
    place: 'Parco del Pincio',
    walks: 64,
  },
  {
    ...base,
    id: 'rocky',
    name: 'Rocky',
    breed: 'Husky',
    age: 4,
    weight: 25,
    photo: photo('photo-1605568427561-40dd23c2acea'),
    character: 'Energico',
    ownerName: 'Marco',
    ownerPhoto: owner('photo-1500648767791-00dcc994a43e'),
    city: 'Roma',
    latitude: 41.8886,
    longitude: 12.4682,
    bio: 'Lunghe passeggiate, aria fresca e tanti amici. Ci trovi a Trastevere, pronti per una nuova avventura.',
    place: 'Trastevere',
    walks: 92,
  },
  {
    ...base,
    id: 'nina',
    name: 'Nina',
    breed: 'Bulldog francese',
    age: 5,
    weight: 7,
    photo: photo('photo-1583337130417-3346a1be7dee'),
    character: 'Tranquillo',
    ownerName: 'Elena',
    ownerPhoto: owner('photo-1531123897727-8f129e1688ce'),
    city: 'Roma',
    latitude: 41.9065,
    longitude: 12.4865,
    bio: 'Passi piccoli, passeggiate lunghe. Mi piacciono gli amici gentili e le soste all’ombra.',
    place: 'Via Veneto',
    walks: 36,
  },
  {
    ...base,
    id: 'toby',
    name: 'Toby',
    breed: 'Labrador',
    age: 2,
    weight: 30,
    photo: photo('photo-1552053831-71594a27632d'),
    character: 'Giocoso',
    ownerName: 'Andrea',
    ownerPhoto: owner('photo-1506794778202-cad84cf45f1d'),
    city: 'Roma',
    latitude: 41.9178,
    longitude: 12.4815,
    bio: 'Se hai una pallina, siamo già amici. Amo correre al parco e tornare a casa felice.',
    place: 'Valle dei Cani',
    walks: 51,
  },
  {
    ...base,
    id: 'otto',
    name: 'Otto',
    breed: 'Jack Russell Terrier',
    age: 3,
    weight: 8,
    photo: photo('photo-1518717758536-85ae29035b6d'),
    character: 'Energico',
    ownerName: 'Luca',
    ownerPhoto: owner('photo-1500648767791-00dcc994a43e'),
    city: 'Roma',
    latitude: 41.907,
    longitude: 12.4968,
    bio: 'Piccolo ma instancabile! In cerca di un amico per esplorare ogni sentiero del quartiere.',
    place: 'Piazza Fiume',
    walks: 83,
  },
  {
    ...base,
    id: 'pepe',
    name: 'Pepe',
    breed: 'Bassotto',
    age: 6,
    weight: 9,
    photo: photo('photo-1517849845537-4d257902454a'),
    character: 'Tranquillo',
    ownerName: 'Francesca',
    ownerPhoto: owner('photo-1524504388940-b1c1722653e1'),
    city: 'Roma',
    latitude: 41.9028,
    longitude: 12.4534,
    bio: 'Le passeggiate migliori sono quelle senza fretta. Sempre disponibile per una bella annusata.',
    place: 'Prati',
    walks: 105,
  },
  {
    ...base,
    id: 'daisy',
    name: 'Daisy',
    breed: 'Cavalier King Charles Spaniel',
    age: 1,
    weight: 6,
    photo: photo('photo-1548199973-03cce0bbc87b'),
    character: 'Socievole',
    ownerName: 'Chiara',
    ownerPhoto: owner('photo-1534528741775-53994a69daeb'),
    city: 'Roma',
    latitude: 41.8695,
    longitude: 12.5125,
    isVisibleNow: false,
    visibleUntil: null,
    bio: 'Nuova in città, pronta a conoscere nuovi amici a quattro zampe. Preferisco le passeggiate tranquille.',
    place: 'Parco della Caffarella',
    walks: 12,
    joinedMonths: 1,
  },
  {
    ...base,
    id: 'argo',
    name: 'Argo',
    breed: 'Border Collie',
    age: 3,
    weight: 19,
    photo: photo('photo-1518717758536-85ae29035b6d'),
    character: 'Energico',
    ownerName: 'Matteo',
    ownerPhoto: owner('photo-1506794778202-cad84cf45f1d'),
    city: 'Milano',
    latitude: 45.4642,
    longitude: 9.19,
    bio: 'Il frisbee è la mia passione. Cerchiamo amici per una passeggiata nel centro di Milano.',
    place: 'Centro di Milano',
    walks: 73,
  },
  {
    ...base,
    id: 'bella',
    name: 'Bella',
    breed: 'Labrador',
    age: 4,
    weight: 26,
    photo: photo('photo-1552053831-71594a27632d'),
    character: 'Socievole',
    ownerName: 'Alice',
    ownerPhoto: owner('photo-1531123897727-8f129e1688ce'),
    city: 'Milano',
    latitude: 45.472,
    longitude: 9.18,
    bio: 'Una coda felice e tanta voglia di compagnia. Ci vediamo al Parco Sempione?',
    place: 'Parco Sempione',
    walks: 48,
  },
  {
    ...base,
    id: 'dog_marche_01',
    name: 'Luna',
    breed: 'Lagotto Romagnolo',
    age: 3,
    weight: 14,
    size: 'Media',
    character: 'Giocoso',
    ownerName: 'Giulia',
    ownerPhoto: owner('photo-1534528741775-53994a69daeb'),
    bio: "Ama l'acqua e correre in spiaggia. Viviamo tra Senigallia e Ancona!",
    photo: 'luna-marche',
    latitude: 43.6188,
    longitude: 13.2167,
    city: 'Senigallia, Marche',
    place: 'Spiaggia di Senigallia',
    badges: ['Vaccinato', 'Microchippato', 'Buono con altri cani'],
    isVisibleNow: true,
    visibleUntil: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    lastSeen: '10 min fa',
  },
  {
    ...base,
    id: 'dog_marche_02',
    name: 'Brando',
    breed: 'Maremmano',
    age: 5,
    weight: 38,
    size: 'Grande',
    character: 'Tranquillo',
    ownerName: 'Marco',
    ownerPhoto: owner('photo-1500648767791-00dcc994a43e'),
    bio: 'Gigante buono, adora i bambini. Passeggiate sul Conero.',
    photo: 'brando-marche',
    latitude: 43.601,
    longitude: 13.5358,
    city: 'Ancona, Marche - Parco del Conero',
    place: 'Parco del Conero',
    badges: ['Vaccinato', 'Microchippato'],
    isVisibleNow: true,
    visibleUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    lastSeen: 'ora',
  },
];
export const initialDog: Dog = {
  ...base,
  id: 'milo',
  name: 'Milo',
  breed: 'Meticcio',
  age: 2,
  weight: 14,
  photo: photo('photo-1518717758536-85ae29035b6d'),
  character: 'Socievole',
  ownerName: 'Alessia',
  ownerPhoto: owner('photo-1534528741775-53994a69daeb'),
  city: 'Roma',
  ...ROME,
  isVisibleNow: false,
  visibleUntil: null,
  bio: 'Sempre pronto per una passeggiata e per fare nuove amicizie.',
  place: 'Villa Borghese',
  walks: 0,
  joinedMonths: 1,
};
export const demoUser: User = { id: 'me', email: '', name: 'Alessia', dogId: 'milo' };
export function isOnline(dog: Dog, now = Date.now()) {
  return (
    dog.isVisibleNow && dog.visibleUntil !== null && new Date(dog.visibleUntil).getTime() > now
  );
}
const rad = (v: number) => (v * Math.PI) / 180;
export function distanceKm(from: LatLng, to: LatLng) {
  const dLat = rad(to.latitude - from.latitude);
  const dLon = rad(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(from.latitude)) * Math.cos(rad(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export function formatDistance(km: number) {
  return `${km.toLocaleString('it-IT', { maximumFractionDigits: km < 10 ? 1 : 0 })} km`;
}
export function ageText(n: number) {
  return `${n} ${n === 1 ? 'anno' : 'anni'}`;
}
export function timeText(date: string) {
  return new Date(date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}
const ago = (minutes: number) => new Date(Date.now() - minutes * 60000).toISOString();
export const initialChats: Chat[] = [
  {
    id: 'chat-moka',
    dogId: 'moka',
    unread: 1,
    messages: [
      {
        id: 'm1',
        chatId: 'chat-moka',
        senderId: 'moka',
        receiverDogId: 'milo',
        text: 'Ciao! Ho visto che anche Milo ama fare nuove amicizie.',
        createdAt: ago(22),
      },
      {
        id: 'm2',
        chatId: 'chat-moka',
        senderId: 'me',
        receiverDogId: 'moka',
        text: 'Ciao Giulia! Sì, non vede l’ora di conoscere Moka.',
        createdAt: ago(20),
      },
      {
        id: 'm3',
        chatId: 'chat-moka',
        senderId: 'moka',
        receiverDogId: 'milo',
        text: 'Noi siamo a Villa Borghese, vicino al laghetto. Vi va di raggiungerci?',
        createdAt: ago(4),
      },
    ],
  },
  {
    id: 'chat-luna',
    dogId: 'luna',
    unread: 1,
    messages: [
      {
        id: 'l1',
        chatId: 'chat-luna',
        senderId: 'luna',
        receiverDogId: 'milo',
        text: 'Luna ha già trovato la sua pallina preferita! Ci vediamo al Pincio?',
        createdAt: ago(35),
      },
    ],
  },
  {
    id: 'chat-rocky',
    dogId: 'rocky',
    unread: 0,
    messages: [
      {
        id: 'r1',
        chatId: 'chat-rocky',
        senderId: 'me',
        receiverDogId: 'rocky',
        text: 'Perfetto, a presto allora!',
        createdAt: ago(110),
      },
    ],
  },
];
