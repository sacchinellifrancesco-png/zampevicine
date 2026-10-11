import { useState } from 'react';
import { View } from 'react-native';
import { Button, Spinner } from 'heroui-native';
import { PawPrint, Timer } from 'lucide-react-native';
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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visible = isOnline(dog, now);
  const seconds = dog.visibleUntil
    ? Math.max(0, Math.ceil((new Date(dog.visibleUntil).getTime() - now) / 1000))
    : 0;
  const countdown = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const toggle = async () => {
    setPending(true);
    setError(null);
    try {
      if (!visible && !useAppStore.getState().demoLocation) {
        await refreshLocation();
        if (useAppStore.getState().locationError) {
          setError('La posizione non è disponibile. Riprova prima di iniziare.');
          return;
        }
      }
      const state = useAppStore.getState();
      await saveLocal({
        myDog: {
          ...state.myDog,
          ...state.position,
          city: state.city,
          isVisibleNow: !visible,
          visibleUntil: visible ? null : new Date(Date.now() + 3600000).toISOString(),
        },
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      useAppStore.getState().tick();
    } catch {
      setError('Non riusciamo ad aggiornare la visibilità. Riprova.');
    } finally {
      setPending(false);
    }
  };
  return (
    <View className="gap-2">
      {error ? <ErrorNotice message={error} retry={() => void toggle()} /> : null}
      <Button
        className={visible ? 'bg-success h-16 rounded-3xl' : 'bg-accent h-16 rounded-3xl'}
        style={{
          backgroundColor: visible ? colors.green : colors.orange,
          height: 64,
          borderRadius: 24,
        }}
        isDisabled={!ready || pending}
        onPress={() => void toggle()}
      >
        {pending ? (
          <Spinner size="sm" color={colors.ink} />
        ) : visible ? (
          <Timer size={21} color={colors.paper} strokeWidth={1.8} />
        ) : (
          <PawPrint size={21} color={colors.ink} strokeWidth={1.8} />
        )}
        <View className="items-center">
          <Button.Label
            style={{
              fontFamily: fonts.semibold,
              color: visible ? colors.paper : colors.ink,
              fontSize: 15,
            }}
          >
            {visible ? `Sei visibile · ${countdown}` : 'Sto uscendo ora'}
          </Button.Label>
          <Text
            style={{ fontSize: 11, lineHeight: 16, color: visible ? colors.paper : colors.ink }}
          >
            {visible ? 'Tocca per terminare la passeggiata' : 'Visibile per 60 min'}
          </Text>
        </View>
      </Button>
      <Text style={{ fontSize: 11, color: colors.muted, textAlign: 'center' }}>
        Visibilità demo, solo su questo dispositivo
      </Text>
    </View>
  );
}
