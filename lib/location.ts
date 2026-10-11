import * as Location from 'expo-location';
import { AppState, Platform } from 'react-native';
import { useEffect } from 'react';
import { useAppStore, hydrateLocal, saveLocal } from '@/lib/store';
import { isOnline } from '@/lib/dogs';

let locating: Promise<void> | null = null;
export function refreshLocation(): Promise<void> {
  if (locating) return locating;
  locating = (async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== Location.PermissionStatus.GRANTED) {
        useAppStore
          .getState()
          .setLocationError(
            'Posizione non disponibile. Puoi esplorare Roma o Milano in modalità demo.',
          );
        return;
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
      const dog = useAppStore.getState().myDog;
      if (isOnline(dog)) await saveLocal({ myDog: { ...dog, ...position, city } });
    } catch {
      useAppStore
        .getState()
        .setLocationError(
          'Non riusciamo a trovare la posizione. Riprova o esplora una città demo.',
        );
    }
  })().finally(() => {
    locating = null;
  });
  return locating;
}
export function useAppLifecycle() {
  useEffect(() => {
    void hydrateLocal();
    void refreshLocation();
    const timer = setInterval(() => useAppStore.getState().tick(), 1000);
    const locationTimer = setInterval(() => {
      if (
        AppState.currentState === 'active' &&
        isOnline(useAppStore.getState().myDog) &&
        !useAppStore.getState().demoLocation
      )
        void refreshLocation();
    }, 120000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        useAppStore.getState().tick();
        if (isOnline(useAppStore.getState().myDog) && !useAppStore.getState().demoLocation)
          void refreshLocation();
      }
    });
    return () => {
      clearInterval(timer);
      clearInterval(locationTimer);
      subscription.remove();
    };
  }, []);
}
