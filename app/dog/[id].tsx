import { useState } from 'react';
import { View, ScrollView, Image, useWindowDimensions } from 'react-native';
import { Button, Chip, Dialog, Spinner } from 'heroui-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { MapPin, ShieldCheck, Heart, Baby, Flag, PawPrint, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { dogs, ageText, isOnline, distanceKm, formatDistance } from '@/lib/dogs';
import { useAppStore, ensureChat, saveLocal } from '@/lib/store';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { DogPhoto } from '@/components/leashlove/DogPhoto';
import { ErrorNotice, EmptyState } from '@/components/leashlove/Feedback';

export default function DogProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dog = dogs.find((d) => d.id === id);
  const position = useAppStore((s) => s.position);
  const now = useAppStore((s) => s.now);
  const ready = useAppStore((s) => s.ready);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState('Profilo non autentico');
  const [reported, setReported] = useState(false);
  const propose = async () => {
    if (!dog) return;
    setPending(true);
    setError(null);
    try {
      await ensureChat(dog.id);
      router.push({ pathname: '/chat/[id]', params: { id: dog.id, propose: '1' } });
    } catch {
      setError('Non riusciamo ad aprire la conversazione. Riprova.');
    } finally {
      setPending(false);
    }
  };
  const report = async () => {
    if (!dog) return;
    setPending(true);
    setError(null);
    try {
      await saveLocal({
        reports: [
          ...useAppStore.getState().reports,
          { dogId: dog.id, reason, createdAt: new Date().toISOString() },
        ],
      });
      setReported(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setError('Non riusciamo a salvare la segnalazione. Riprova.');
    } finally {
      setPending(false);
    }
  };
  if (!dog)
    return (
      <EmptyState
        title="Questo amico non è disponibile"
        action="Torna alla mappa"
        onPress={() => router.replace('/')}
      />
    );
  return (
    <View className="bg-background flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View
          style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: dog.photo }}
            accessibilityLabel={`Foto di ${dog.name}`}
            style={{ width, height: Math.min(width * 0.94, 420), resizeMode: 'cover' }}
          />
          <View className="bg-surface absolute bottom-5 left-6 flex-row items-center gap-2 rounded-full px-3 py-2">
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: isOnline(dog, now) ? colors.green : colors.muted,
              }}
            />
            <Text weight="medium" style={{ fontSize: 12 }}>
              {isOnline(dog, now) ? 'A spasso adesso' : 'Non a spasso'}
            </Text>
          </View>
        </View>
        <View className="px-6 pt-5">
          <View className="flex-row items-center justify-between">
            <Text weight="semibold" style={{ fontSize: 36, lineHeight: 50, letterSpacing: -1 }}>
              {dog.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin size={15} color={colors.green} strokeWidth={1.8} />
              <Text style={{ color: colors.green, fontSize: 13 }}>
                {formatDistance(distanceKm(position, dog))}
              </Text>
            </View>
          </View>
          <Text style={{ color: colors.muted }}>
            {dog.breed} · {ageText(dog.age)} · {dog.weight} kg
          </Text>
          <View className="mt-4 mb-5 flex-row gap-2">
            <Chip className="bg-green-soft" style={{ backgroundColor: colors.greenSoft }}>
              <Chip.Label
                numberOfLines={1}
                style={{ fontFamily: fonts.medium, color: colors.green, fontSize: 12 }}
              >
                {dog.character}
              </Chip.Label>
            </Chip>
            <Chip className="bg-green-soft" style={{ backgroundColor: colors.greenSoft }}>
              <Chip.Label
                numberOfLines={1}
                style={{ fontFamily: fonts.medium, color: colors.green, fontSize: 12 }}
              >
                {dog.city}
              </Chip.Label>
            </Chip>
          </View>
          <View className="border-border flex-row items-center gap-3 border-y py-4">
            <DogPhoto uri={dog.ownerPhoto} size={44} />
            <View className="flex-1">
              <Text weight="medium">di {dog.ownerName}</Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>{dog.place}</Text>
            </View>
            <PawPrint size={22} color={colors.green} strokeWidth={1.8} />
          </View>
          <Text weight="semibold" style={{ fontSize: 18, marginTop: 25, marginBottom: 12 }}>
            Conosci {dog.name}
          </Text>
          <Text style={{ color: colors.muted, lineHeight: 25 }}>{dog.bio}</Text>
          <View className="mt-5 flex-row flex-wrap gap-3">
            {dog.badges.map((badge) => {
              const Icon =
                badge === 'Vaccinato' ? ShieldCheck : badge === 'Ama i bambini' ? Baby : Heart;
              return (
                <View key={badge} className="flex-row items-center gap-1.5">
                  <Icon size={17} color={colors.green} strokeWidth={1.8} />
                  <Text numberOfLines={1} style={{ color: colors.green, fontSize: 12 }}>
                    {badge}
                  </Text>
                </View>
              );
            })}
          </View>
          <View className="border-border mt-7 mb-3 flex-row gap-6 border-t pt-5">
            <View className="flex-1">
              <Text weight="semibold" style={{ fontSize: 22, lineHeight: 30 }}>
                {dog.walks}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>Passeggiate fatte</Text>
            </View>
            <View className="flex-1">
              <Text weight="semibold" style={{ fontSize: 22, lineHeight: 30 }}>
                {dog.joinedMonths} {dog.joinedMonths === 1 ? 'mese' : 'mesi'}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 11 }}>Insieme a LeashLove</Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, fontSize: 11, marginTop: 12 }}>
            Profilo e statistiche di esempio
          </Text>
          {!router.canGoBack() ? (
            <Link href="/" style={{ marginTop: 16, color: colors.green, fontFamily: fonts.medium }}>
              Torna alla mappa
            </Link>
          ) : null}
          {error ? <ErrorNotice message={error} retry={() => void propose()} /> : null}
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: Math.max(insets.bottom, 12),
          paddingHorizontal: 24,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Button
          className="h-14 rounded-3xl"
          isDisabled={!ready || pending}
          onPress={() => void propose()}
        >
          {pending ? (
            <Spinner size="sm" color={colors.ink} />
          ) : (
            <PawPrint size={20} color={colors.ink} strokeWidth={1.8} />
          )}
          <Button.Label style={{ fontFamily: fonts.semibold }}>Proponi passeggiata</Button.Label>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="mt-1"
          onPress={() => {
            setReported(false);
            setReportOpen(true);
          }}
        >
          <Flag color={colors.muted} size={13} strokeWidth={1.8} />
          <Button.Label style={{ fontFamily: fonts.regular, color: colors.muted, fontSize: 12 }}>
            Segnala
          </Button.Label>
        </Button>
      </View>
      <Dialog isOpen={reportOpen} onOpenChange={setReportOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="bg-background rounded-3xl">
            <Dialog.Close />
            <Dialog.Title style={{ fontFamily: fonts.semibold }}>
              {reported ? 'Segnalazione salvata' : `Segnala ${dog.name}`}
            </Dialog.Title>
            {reported ? (
              <>
                <Dialog.Description className="my-5">
                  La segnalazione resta in questo prototipo e non è stata inviata a un moderatore.
                </Dialog.Description>
                <Button onPress={() => setReportOpen(false)}>
                  <Button.Label>Chiudi</Button.Label>
                </Button>
              </>
            ) : (
              <>
                <View className="my-5 gap-2">
                  {['Profilo non autentico', 'Comportamento inappropriato', 'Altro'].map((r) => (
                    <Button
                      key={r}
                      variant="tertiary"
                      className="bg-surface justify-between"
                      onPress={() => {
                        setReason(r);
                        void Haptics.selectionAsync();
                      }}
                    >
                      <Button.Label style={{ fontFamily: fonts.regular, fontSize: 13 }}>
                        {r}
                      </Button.Label>
                      {reason === r ? <Check size={17} color={colors.green} /> : null}
                    </Button>
                  ))}
                </View>
                {error ? <ErrorNotice message={error} /> : null}
                <Button isDisabled={pending || !ready} onPress={() => void report()}>
                  <Button.Label>
                    {pending ? 'Salvataggio…' : 'Salva segnalazione demo'}
                  </Button.Label>
                </Button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
