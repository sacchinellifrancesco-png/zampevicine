import * as Location from 'expo-location';
import { AppState, Platform } from 'react-native';
import { useEffect } from 'react';
import { useAppStore, hydrateLocal, saveLocal } from '@/lib/store';
import { isOnline } from '@/lib/dogs';

export type LocationOutcome = 'success' | 'permission-denied' | 'gps-disabled' | 'error';
let locating: Promise<LocationOutcome> | null = null;
export function refreshLocation(requestPermission = true): Promise<LocationOutcome> {
  if (locating) return locating;
  locating = (async (): Promise<LocationOutcome> => {
    try {
      let permission = await Location.getForegroundPermissionsAsync();
      if (!permission.granted && requestPermission && permission.canAskAgain) {
        permission = await Location.requestForegroundPermissionsAsync();
      }
      if (!permission.granted) {
        useAppStore
          .getState()
          .setLocationError('Consenti l’accesso alla posizione per essere visibile.');
        return 'permission-denied';
      }
      if (Platform.OS !== 'web' && !(await Location.hasServicesEnabledAsync())) {
        useAppStore.getState().setLocationError('Attiva la localizzazione per essere visibile.');
        return 'gps-disabled';
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const position = { latitude: result.coords.latitude, longitude: result.coords.longitude };
      let city = 'La tua zona';
      let region = '';
      if (Platform.OS !== 'web') {
        const address = await Location.reverseGeocodeAsync(position).catch(() => []);
        city = address[0]?.city ?? address[0]?.subregion ?? city;
        region = address[0]?.region ?? '';
      } else if (
        position.latitude > 41.7 &&
        position.latitude < 42.1 &&
        position.longitude > 12.2 &&
        position.longitude < 12.8
      ) {
        city = 'Roma';
        region = 'Lazio';
      } else if (
        position.latitude > 45.2 &&
        position.latitude < 45.7 &&
        position.longitude > 8.9 &&
        position.longitude < 9.5
      ) {
        city = 'Milano';
        region = 'Lombardia';
      }
      useAppStore.getState().setPosition(position, city, region, false);
      if (isOnline(useAppStore.getState().myDog)) {
        await saveLocal((state) => ({
          myDog: isOnline(state.myDog) ? { ...state.myDog, ...position, city } : state.myDog,
        }));
      }
      return 'success';
    } catch {
      useAppStore.getState().setLocationError('Non riusciamo a trovare la posizione. Riprova.');
      return 'error';
    }
  })().finally(() => {
    locating = null;
  });
  return locating;
}
export function useAppLifecycle() {
  const ready = useAppStore((state) => state.ready);
  const visible = useAppStore((state) => isOnline(state.myDog, state.now));
  useEffect(() => {
    void hydrateLocal();
    const timer = setInterval(() => useAppStore.getState().tick(), 1000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') useAppStore.getState().tick();
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    if (!ready || !visible) return undefined;
    const update = () => {
      if (AppState.currentState === 'active' && isOnline(useAppStore.getState().myDog)) {
        void refreshLocation(false);
      }
    };
    update();
    const locationTimer = setInterval(update, 120000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') update();
    });
    return () => {
      clearInterval(locationTimer);
      subscription.remove();
    };
  }, [ready, visible]);
}
