import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { initialChats, initialDog, ROME, type Chat, type Dog, type Message } from '@/lib/dogs';
import type { LatLng } from '@/components/MapView';
import { Platform } from 'react-native';

// storage sicuro che funziona sia su web che su app
const safeStorage = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (e) {
      console.warn('storage get error', e);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.warn('storage set error', e);
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.warn('storage remove error', e);
    }
  },
};

type AppState = {
  dog: Dog;
  chats: Chat[];
  myLocation: LatLng;
  isLogged: boolean;
  userEmail: string | null;
  setDog: (d: Dog) => void;
  addMessage: (chatId: string, m: Message) => void;
  setLocation: (l: LatLng) => void;
  login: (email: string) => void;
  logout: () => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      dog: initialDog,
      chats: initialChats,
      myLocation: ROME,
      isLogged: false,
      userEmail: null,
      setDog: (dog) => set({ dog }),
      setLocation: (myLocation) => set({ myLocation }),
      addMessage: (chatId, msg) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c
          ),
        })),
      login: (email) => set({ isLogged: true, userEmail: email }),
      logout: () => set({ isLogged: false, userEmail: null }),
    }),
    {
      name: 'zampavicine-storage',
      storage: createJSONStorage(() => safeStorage),
      // su web a volte la persistenza blocca, skip se errore
      onRehydrateStorage: () => (state, error) => {
        if (error) console.log('rehydrate error', error);
      },
    }
  )
);
