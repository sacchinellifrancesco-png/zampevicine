import { ScrollView, View } from 'react-native';
import { Button } from 'heroui-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pencil, ShieldCheck, MapPin, Heart } from 'lucide-react-native';
import { useAppStore, hydrateLocal } from '@/lib/store';
import { ageText, isOnline } from '@/lib/dogs';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { DogPhoto } from '@/components/leashlove/DogPhoto';
import { VisibilityButton } from '@/components/leashlove/VisibilityButton';
import { ErrorNotice, ListLoading } from '@/components/leashlove/Feedback';

export default function MyDogScreen() {
  const dog = useAppStore((s) => s.myDog);
  const now = useAppStore((s) => s.now);
  const ready = useAppStore((s) => s.ready);
  const error = useAppStore((s) => s.storageError);
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream, paddingTop: insets.top }}>
      <View className="px-6 pt-6 pb-5">
        <Text weight="semibold" style={{ fontSize: 30, lineHeight: 42, letterSpacing: -0.8 }}>
          Il mio cane
        </Text>
      </View>
      {!ready ? (
        <ListLoading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}>
          {error ? <ErrorNotice message={error} retry={() => void hydrateLocal()} /> : null}
          <View className="bg-green-soft mb-6 items-center rounded-3xl py-7">
            <DogPhoto uri={dog.photo} size={132} />
            <Text weight="semibold" style={{ fontSize: 32, lineHeight: 44, marginTop: 14 }}>
              {dog.name}
            </Text>
            <Text style={{ color: colors.green }}>
              {dog.breed} · {ageText(dog.age)} · {dog.weight} kg
            </Text>
            <View className="mt-3 flex-row items-center gap-1.5">
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: isOnline(dog, now) ? colors.green : colors.muted,
                }}
              />
              <Text style={{ fontSize: 12, color: colors.green }}>
                {isOnline(dog, now) ? 'A spasso' : 'Non visibile sulla mappa'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text weight="semibold" style={{ fontSize: 18 }}>
              Piacere, {dog.name}
            </Text>
            <Button size="sm" variant="tertiary" onPress={() => router.push('/edit-dog')}>
              <Pencil size={15} color={colors.green} strokeWidth={1.8} />
              <Button.Label style={{ color: colors.green, fontFamily: fonts.medium, fontSize: 12 }}>
                Modifica
              </Button.Label>
            </Button>
          </View>
          <Text style={{ marginTop: 12, color: colors.muted, lineHeight: 24 }}>{dog.bio}</Text>
          <View className="mt-4 mb-6 flex-row flex-wrap gap-2">
            <View className="bg-green-soft rounded-full px-3 py-1.5">
              <Text style={{ color: colors.green, fontSize: 12 }}>{dog.character}</Text>
            </View>
            {dog.badges.map((b) => (
              <View
                key={b}
                className="border-border flex-row items-center gap-1.5 rounded-full border px-3 py-1.5"
              >
                {b === 'Vaccinato' ? (
                  <ShieldCheck color={colors.green} size={14} strokeWidth={1.8} />
                ) : (
                  <Heart color={colors.green} size={14} strokeWidth={1.8} />
                )}
                <Text numberOfLines={1} style={{ fontSize: 12 }}>
                  {b}
                </Text>
              </View>
            ))}
          </View>
          <View className="mb-6 flex-row items-center gap-2">
            <MapPin color={colors.green} size={17} strokeWidth={1.8} />
            <Text style={{ color: colors.green }}>
              {dog.city} · di {dog.ownerName}
            </Text>
          </View>
          <VisibilityButton />
          <View className="border-border mt-8 border-t pt-5">
            <Text weight="semibold">Il tuo spazio di prova</Text>
            <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 21, marginTop: 8 }}>
              Profili e conversazioni sono di esempio. Le modifiche restano su questo dispositivo:
              nessun account, messaggio reale o notifica push.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
