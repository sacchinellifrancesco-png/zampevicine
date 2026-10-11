import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { z } from 'zod';
import { initialChats, initialDog, ROME, type Chat, type Dog, type Message } from '@/lib/dogs';
import type { LatLng } from '@/components/MapView';

interface SavedState {
  myDog: Dog;
  chats: Chat[];
  reports: { dogId: string; reason: string; createdAt: string }[];
}
interface AppState extends SavedState {
  ready: boolean;
  storageError: string | null;
  position: LatLng;
  city: string;
  regionName: string;
  demoLocation: boolean;
  locationError: string | null;
  now: number;
  setPosition: (position: LatLng, city: string, regionName: string, demo: boolean) => void;
  setLocationError: (message: string | null) => void;
  tick: () => void;
}
const savedStateSchema = z.object({
  myDog: z.object({
    id: z.string(),
    name: z.string(),
    breed: z.string(),
    age: z.number(),
    weight: z.number(),
    photo: z.string(),
    character: z.enum(['Giocoso', 'Tranquillo', 'Energico', 'Socievole']),
    ownerName: z.string(),
    ownerPhoto: z.string(),
    city: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    isVisibleNow: z.boolean(),
    visibleUntil: z.string().nullable(),
    badges: z.array(z.enum(['Vaccinato', 'Socievole', 'Ama i bambini'])),
    bio: z.string(),
    place: z.string(),
    walks: z.number(),
    joinedMonths: z.number(),
  }),
  chats: z.array(
    z.object({
      id: z.string(),
      dogId: z.string(),
      unread: z.number(),
      messages: z.array(
        z.object({
          id: z.string(),
          chatId: z.string(),
          senderId: z.string(),
          receiverDogId: z.string(),
          text: z.string(),
          createdAt: z.string(),
        }),
      ),
    }),
  ),
  reports: z.array(
    z.object({
      dogId: z.string(),
      reason: z.string(),
      createdAt: z.string(),
    }),
  ),
});
const KEY = 'leashlove-local-v1';
export const useAppStore = create<AppState>((set, get) => ({
  myDog: initialDog,
  chats: initialChats,
  reports: [],
  ready: false,
  storageError: null,
  position: ROME,
  city: 'Roma',
  regionName: 'Lazio',
  demoLocation: true,
  locationError: null,
  now: Date.now(),
  setPosition: (position, city, regionName, demoLocation) =>
    set({ position, city, regionName, demoLocation, locationError: null }),
  setLocationError: (locationError) => set({ locationError }),
  tick: () => {
    const now = Date.now();
    set({ now });
    const dog = get().myDog;
    if (dog.isVisibleNow && (!dog.visibleUntil || new Date(dog.visibleUntil).getTime() <= now)) {
      void saveLocal({ myDog: { ...dog, isVisibleNow: false, visibleUntil: null } }).catch(
        () => undefined,
      );
    }
  },
}));
let queue: Promise<void> = Promise.resolve();
export async function hydrateLocal() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const saved = savedStateSchema.parse(JSON.parse(raw));
      useAppStore.setState({ myDog: saved.myDog, chats: saved.chats, reports: saved.reports });
    }
    useAppStore.setState({ ready: true, storageError: null });
    useAppStore.getState().tick();
  } catch {
    useAppStore.setState({
      ready: true,
      storageError: 'Non riusciamo a leggere i dati salvati. Riprova prima di continuare.',
    });
  }
}
export function saveLocal(patch: Partial<SavedState>): Promise<void> {
  const operation = queue
    .catch(() => undefined)
    .then(async () => {
      const current = useAppStore.getState();
      const next: SavedState = {
        myDog: patch.myDog ?? current.myDog,
        chats: patch.chats ?? current.chats,
        reports: patch.reports ?? current.reports,
      };
      try {
        await AsyncStorage.setItem(KEY, JSON.stringify(next));
        useAppStore.setState({ ...next, storageError: null });
      } catch {
        useAppStore.setState({ storageError: 'Non riusciamo a salvare le modifiche. Riprova.' });
        throw new Error('Non riusciamo a salvare le modifiche. Riprova.');
      }
    });
  queue = operation;
  return operation;
}
export async function ensureChat(dogId: string) {
  const state = useAppStore.getState();
  const id = `chat-${dogId}`;
  if (!state.chats.some((c) => c.id === id)) {
    await saveLocal({ chats: [{ id, dogId, unread: 0, messages: [] }, ...state.chats] });
  }
  return id;
}
export async function sendMessage(chatId: string, receiverDogId: string, text: string) {
  const message: Message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    chatId,
    receiverDogId,
    senderId: 'me',
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
  const state = useAppStore.getState();
  const existing = state.chats.find((c) => c.id === chatId);
  const chat: Chat = existing
    ? { ...existing, messages: [...existing.messages, message], unread: 0 }
    : { id: chatId, dogId: receiverDogId, unread: 0, messages: [message] };
  await saveLocal({ chats: [chat, ...state.chats.filter((c) => c.id !== chatId)] });
}
