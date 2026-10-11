import { useState } from 'react';
import { View, Linking, Platform, StyleSheet } from 'react-native';
import { Button, Dialog, Spinner, useToast } from 'heroui-native';
import { PawPrint, MapPin } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore, saveLocal } from '@/lib/store';
import { refreshLocation } from '@/lib/location';
import { isOnline } from '@/lib/dogs';
import { colors, fonts } from '@/lib/theme';
import { ErrorNotice } from './Feedback';
import { Text } from './Text';

export function VisibilityButton() {
  const dog = useAppStore((s) => s.myDog);
  const now = useAppStore((s) => s.now);
  const ready = useAppStore((s) => s.ready);
  const locationError = useAppStore((s) => s.locationError);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<'toggle' | 'extend'>('toggle');
  const [gpsOpen, setGpsOpen] = useState(false);
  const { toast } = useToast();
  const visible = isOnline(dog, now);
  const seconds = dog.visibleUntil
    ? Math.max(0, Math.ceil((new Date(dog.visibleUntil).getTime() - now) / 1000))
    : 3600;
  const countdown = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const toggle = async () => {
    if (pending) return;
    setRetryAction('toggle');
    setPending(true);
    setError(null);
    try {
      if (!visible) {
        const outcome = await refreshLocation();
        if (outcome === 'permission-denied' || outcome === 'gps-disabled') {
          setGpsOpen(true);
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          return;
        }
        if (outcome !== 'success') {
          setError('La posizione non è disponibile. Riprova prima di iniziare.');
          return;
        }
      }
      await saveLocal((state) => ({
        myDog: visible
          ? { ...state.myDog, isVisibleNow: false, visibleUntil: null }
          : {
              ...state.myDog,
              ...state.position,
              city: state.city,
              isVisibleNow: true,
              visibleUntil: new Date(Date.now() + 3600000).toISOString(),
            },
      }));
      useAppStore.getState().tick();
      toast.show({
        variant: 'success',
        label: visible ? 'Non sei più visibile' : 'Sei visibile per 60 min sul tuo dispositivo',
      });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setError('Non riusciamo ad aggiornare la visibilità. Riprova.');
    } finally {
      setPending(false);
    }
  };
  const extend = async () => {
    if (pending) return;
    setRetryAction('extend');
    setPending(true);
    setError(null);
    try {
      await saveLocal((state) => {
        if (!isOnline(state.myDog) || !state.myDog.visibleUntil) throw new Error('expired');
        return {
          myDog: {
            ...state.myDog,
            visibleUntil: new Date(
              new Date(state.myDog.visibleUntil).getTime() + 1800000,
            ).toISOString(),
          },
        };
      });
      useAppStore.getState().tick();
      toast.show({ variant: 'success', label: 'Visibilità prolungata di 30 min' });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setError('Non riusciamo a prolungare la visibilità. Riprova.');
    } finally {
      setPending(false);
    }
  };
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      setError('Non riusciamo ad aprire le impostazioni. Aprile dal tuo dispositivo.');
      setGpsOpen(false);
    }
  };
  return (
    <View className="gap-2">
      {error ? (
        <ErrorNotice
          message={error}
          retry={() => void (retryAction === 'extend' ? extend() : toggle())}
        />
      ) : null}
      {visible && locationError ? (
        <ErrorNotice message={locationError} retry={() => void refreshLocation()} />
      ) : null}
      {visible && seconds > 0 && seconds <= 600 ? (
        <View className="bg-green-soft gap-2 rounded-2xl p-3">
          <Text style={{ color: colors.green }}>10 min rimanenti, vuoi prolungare?</Text>
          <Button size="sm" variant="secondary" isDisabled={pending} onPress={() => void extend()}>
            <Button.Label>+30 min</Button.Label>
          </Button>
        </View>
      ) : null}
      <View style={[styles.shadow, { backgroundColor: visible ? colors.green : colors.orange }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          <Button
            className="h-14 flex-1 rounded-3xl px-2"
            style={{ height: 56, backgroundColor: visible ? colors.green : colors.orange }}
            isDisabled={!ready || pending}
            onPress={() => void toggle()}
            accessibilityLabel={
              visible
                ? `Sei visibile, ${countdown} rimanenti. Termina la visibilità`
                : 'Sto uscendo ora, visibile 60 min'
            }
          >
            {pending ? <Spinner size="sm" color={visible ? colors.paper : colors.ink} /> : null}
            <View style={{ alignItems: 'center', flexShrink: 1 }}>
              <Button.Label
                maxFontSizeMultiplier={1.1}
                numberOfLines={1}
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 16,
                  lineHeight: 22,
                  color: visible ? colors.paper : colors.ink,
                }}
              >
                {visible ? 'Sei visibile' : 'Sto uscendo ora'}
              </Button.Label>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text
                  maxFontSizeMultiplier={1.1}
                  numberOfLines={1}
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 16,
                    lineHeight: 20,
                    color: visible ? colors.paper : colors.ink,
                  }}
                >
                  {visible ? `• ${countdown} rimanenti` : '– visibile 60 min'}
                </Text>
                {visible ? (
                  <MapPin size={14} color={colors.paper} strokeWidth={1.8} />
                ) : (
                  <PawPrint size={14} color={colors.ink} strokeWidth={1.8} />
                )}
              </View>
            </View>
          </Button>
          {visible ? (
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 px-2"
              isDisabled={pending}
              onPress={() => void toggle()}
            >
              <Button.Label
                style={{
                  fontFamily: fonts.medium,
                  color: colors.paper,
                  fontSize: 12,
                  textDecorationLine: 'underline',
                }}
              >
                Termina
              </Button.Label>
            </Button>
          ) : null}
        </View>
      </View>
      <Text style={{ fontSize: 11, color: colors.muted, textAlign: 'center' }}>
        Visibilità demo, solo su questo dispositivo
      </Text>
      <Dialog isOpen={gpsOpen} onOpenChange={setGpsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="bg-background gap-4 rounded-3xl">
            <Dialog.Close />
            <Dialog.Title style={{ fontFamily: fonts.semibold, paddingRight: 24 }}>
              Per essere visibile devi attivare GPS
            </Dialog.Title>
            {Platform.OS === 'web' ? (
              <Dialog.Description>
                Consenti la posizione nelle impostazioni del browser per questo sito, poi riprova.
              </Dialog.Description>
            ) : null}
            {Platform.OS !== 'web' ? (
              <Button onPress={() => void openSettings()}>
                <Button.Label>Apri impostazioni</Button.Label>
              </Button>
            ) : null}
            <Button
              variant="secondary"
              isDisabled={pending}
              onPress={() => {
                setGpsOpen(false);
                void toggle();
              }}
            >
              <Button.Label>Riprova</Button.Label>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  shadow: {
    borderRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
