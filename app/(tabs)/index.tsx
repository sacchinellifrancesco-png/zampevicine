import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Button, Dialog, PressableFeedback } from 'heroui-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ChevronDown,
  ChevronRight,
  LocateFixed,
  MapPin,
  PawPrint,
  Check,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import MapView, { type MapViewHandle, type MapMarker } from '@/components/MapView';
import { dogs, ROME, MILAN, isOnline, distanceKm, formatDistance, ageText } from '@/lib/dogs';
import { useAppStore, hydrateLocal } from '@/lib/store';
import { refreshLocation } from '@/lib/location';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { Logo } from '@/components/leashlove/Logo';
import { DogPin } from '@/components/leashlove/DogPin';
import { VisibilityButton } from '@/components/leashlove/VisibilityButton';
import { ErrorNotice } from '@/components/leashlove/Feedback';

const filters = [
  { label: '500 m', km: 0.5 },
  { label: '1,5 km', km: 1.5 },
  { label: '5 km', km: 5 },
  { label: 'Città · 10 km', km: 10 },
  { label: 'Tutta Italia', km: Infinity },
];
export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const position = useAppStore((s) => s.position);
  const myDogPhoto = useAppStore((s) => s.myDog.photo);
  const city = useAppStore((s) => s.city);
  const regionName = useAppStore((s) => s.regionName);
  const demo = useAppStore((s) => s.demoLocation);
  const now = useAppStore((s) => s.now);
  const storageError = useAppStore((s) => s.storageError);
  const locationError = useAppStore((s) => s.locationError);
  const map = useRef<MapViewHandle>(null);
  const params = useLocalSearchParams<{ dogId?: string }>();
  const initialDog = dogs.find((d) => d.id === params.dogId);
  const [radius, setRadius] = useState(initialDog ? Infinity : 1.5);
  const [selectedId, setSelectedId] = useState(initialDog?.id ?? 'moka');
  const [mapHeight, setMapHeight] = useState(420);
  const [cityOpen, setCityOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [previousDogId, setPreviousDogId] = useState(params.dogId);
  const requestedDog = dogs.find((d) => d.id === params.dogId);
  if (previousDogId !== params.dogId) {
    setPreviousDogId(params.dogId);
    if (requestedDog) {
      setRadius(Infinity);
      setSelectedId(requestedDog.id);
    }
  }
  const visibleDogs = dogs.filter((d) => isOnline(d, now) && distanceKm(position, d) <= radius);
  const selectedDog = visibleDogs.find((d) => d.id === selectedId) ?? visibleDogs[0];

  useEffect(() => {
    map.current?.animateToRegion({ ...position, latitudeDelta: 0.025, longitudeDelta: 0.025 }, 450);
  }, [position]);
  useEffect(() => {
    const dog = dogs.find((d) => d.id === params.dogId);
    if (!dog) return;
    map.current?.animateToRegion(
      {
        latitude: dog.latitude,
        longitude: dog.longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      },
      450,
    );
  }, [params.dogId]);
  const chooseRadius = (km: number) => {
    if (km === radius) return;
    setRadius(km);
    void Haptics.selectionAsync();
    if (km === Infinity)
      map.current?.fitToCoordinates(
        dogs.filter((d) => isOnline(d, now)),
        { edgePadding: { top: 100, right: 60, bottom: 170, left: 60 } },
      );
    else
      map.current?.animateToRegion(
        {
          ...position,
          latitudeDelta: km === 0.5 ? 0.011 : km === 1.5 ? 0.025 : km === 5 ? 0.09 : 0.18,
          longitudeDelta: km === 0.5 ? 0.011 : km === 1.5 ? 0.025 : km === 5 ? 0.09 : 0.18,
        },
        450,
      );
  };
  const chooseCity = (name: 'Roma' | 'Milano') => {
    useAppStore
      .getState()
      .setPosition(
        name === 'Roma' ? ROME : MILAN,
        name,
        name === 'Roma' ? 'Lazio' : 'Lombardia',
        true,
      );
    setRadius(1.5);
    setSelectedId(name === 'Roma' ? 'moka' : 'argo');
    setCityOpen(false);
    void Haptics.selectionAsync();
  };
  const locate = async () => {
    setLocating(true);
    await refreshLocation();
    setLocating(false);
    map.current?.animateToRegion(
      { ...useAppStore.getState().position, latitudeDelta: 0.025, longitudeDelta: 0.025 },
      450,
    );
  };
  const markers: MapMarker[] = visibleDogs.map((d) => ({
    id: d.id,
    coordinate: d,
    title: `Vedi ${d.name}`,
    content: <DogPin photo={d.photo} name={d.name} selected={selectedDog?.id === d.id} />,
    onPress: () => {
      setSelectedId(d.id);
      void Haptics.selectionAsync();
    },
  }));
  markers.push({
    id: 'me',
    coordinate: position,
    title: demo ? 'Posizione demo' : 'La tua posizione',
    contentOffset: [14, 14],
    content: (
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.blueSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: colors.blue,
            borderColor: colors.paper,
            borderWidth: 3,
          }}
        />
      </View>
    ),
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream, paddingTop: insets.top }}>
      <View className="px-6 pt-3 pb-3">
        <View className="flex-row items-center justify-between">
          <Logo />
          <PressableFeedback
            onPress={() => router.push('/my-dog')}
            accessibilityLabel="Il profilo di Milo"
          >
            <Image
              resizeMode="cover"
              source={{ uri: myDogPhoto }}
              style={{
                width: 39,
                height: 39,
                borderRadius: 20,
                resizeMode: 'cover',
                borderWidth: 2,
                borderColor: colors.paper,
              }}
            />
          </PressableFeedback>
        </View>
        <Text style={{ fontSize: 11, lineHeight: 17, color: colors.muted, marginTop: 2 }}>
          Incontra cani e padroni vicino a te
        </Text>
        <Text
          weight="semibold"
          style={{ fontSize: 30, lineHeight: 42, letterSpacing: -0.8, marginTop: 15 }}
        >
          Vicino a te
        </Text>
        <PressableFeedback
          className="flex-row items-center gap-1.5 self-start"
          onPress={() => setCityOpen(true)}
          accessibilityLabel="Scegli la città"
        >
          <MapPin size={15} color={colors.green} strokeWidth={1.8} />
          <Text style={{ color: colors.green, fontSize: 13 }}>
            {city}
            {regionName ? `, ${regionName}` : ''}
          </Text>
          <ChevronDown size={15} color={colors.green} strokeWidth={1.8} />
          {demo ? (
            <Text style={{ color: colors.muted, fontSize: 11, marginLeft: 5 }}>Demo</Text>
          ) : null}
        </PressableFeedback>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 8, paddingBottom: 15, paddingTop: 4 }}
      >
        {filters.map((filter) => (
          <Button
            key={filter.label}
            size="sm"
            variant="tertiary"
            style={{
              backgroundColor: radius === filter.km ? colors.green : colors.paper,
              height: 40,
              borderRadius: 24,
              borderWidth: radius === filter.km ? 0 : 1,
              borderColor: colors.line,
            }}
            className={
              radius === filter.km
                ? 'bg-success h-10 rounded-full px-4'
                : 'border-border bg-surface h-10 rounded-full border px-4'
            }
            onPress={() => chooseRadius(filter.km)}
            accessibilityState={{ selected: radius === filter.km }}
          >
            <Button.Label
              numberOfLines={1}
              style={{
                fontFamily: fonts.medium,
                fontSize: 12,
                color: radius === filter.km ? colors.paper : colors.muted,
              }}
            >
              {filter.label}
            </Button.Label>
          </Button>
        ))}
      </ScrollView>
      {storageError ? (
        <View className="px-4 pb-2">
          <ErrorNotice message={storageError} retry={() => void hydrateLocal()} />
        </View>
      ) : null}
      <View
        style={{
          flex: 1,
          minHeight: 220,
          overflow: 'hidden',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        onLayout={(event) => setMapHeight(event.nativeEvent.layout.height)}
      >
        <MapView
          ref={map}
          style={{ width: '100%', height: mapHeight }}
          initialRegion={{ ...position, latitudeDelta: 0.025, longitudeDelta: 0.025 }}
          markers={markers}
          showsUserLocation={!demo}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          toolbarEnabled={false}
          moveOnMarkerPress={false}
          mapPadding={{ top: 55, left: 20, right: 20, bottom: 145 }}
        />
        <View className="bg-surface absolute top-4 left-4 flex-row items-center gap-2 rounded-full px-3 py-2">
          <View className="bg-success h-2 w-2 rounded-full" />
          <Text weight="medium" style={{ fontSize: 12 }}>
            {visibleDogs.length} {visibleDogs.length === 1 ? 'cane a spasso' : 'cani a spasso'}
          </Text>
        </View>
        <Button
          className="bg-surface absolute top-4 right-4 h-10 w-10 rounded-full"
          variant="tertiary"
          isIconOnly
          accessibilityLabel="Centra la mia posizione"
          isDisabled={locating}
          onPress={() => void locate()}
        >
          <LocateFixed size={20} strokeWidth={1.8} color={colors.green} />
        </Button>
        {selectedDog ? (
          <View
            style={[
              styles.previewShadow,
              { position: 'absolute', left: 16, right: 16, bottom: 26 },
            ]}
          >
            <PressableFeedback
              onPress={() => router.push({ pathname: '/dog/[id]', params: { id: selectedDog.id } })}
              accessibilityLabel={`Apri il profilo di ${selectedDog.name}`}
              className="bg-surface rounded-2xl p-3"
            >
              <View className="flex-row items-center gap-3">
                <Image
                  resizeMode="cover"
                  source={{ uri: selectedDog.photo }}
                  style={{ width: 84, height: 100, borderRadius: 12, resizeMode: 'cover' }}
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text weight="semibold" style={{ fontSize: 23, lineHeight: 31 }}>
                      {selectedDog.name}
                    </Text>
                    <ChevronRight size={20} color={colors.muted} strokeWidth={1.8} />
                  </View>
                  <Text numberOfLines={1} style={{ fontSize: 11, color: colors.muted }}>
                    {selectedDog.breed} · {ageText(selectedDog.age)}
                  </Text>
                  <View className="mt-2 flex-row items-center gap-1">
                    <MapPin size={12} color={colors.green} strokeWidth={1.8} />
                    <Text numberOfLines={1} style={{ fontSize: 11, color: colors.green }}>
                      {formatDistance(distanceKm(position, selectedDog))} · {selectedDog.place}
                    </Text>
                  </View>
                  <View className="mt-2 flex-row items-center gap-2">
                    <View className="bg-green-soft rounded-full px-2 py-0.5">
                      <Text
                        numberOfLines={1}
                        style={{ color: colors.green, fontSize: 11, lineHeight: 17 }}
                      >
                        {selectedDog.character}
                      </Text>
                    </View>
                    <Text numberOfLines={1} style={{ flex: 1, fontSize: 11, color: colors.muted }}>
                      di {selectedDog.ownerName}
                    </Text>
                  </View>
                </View>
              </View>
            </PressableFeedback>
          </View>
        ) : (
          <View className="bg-surface absolute right-4 bottom-7 left-4 items-center gap-2 rounded-2xl p-5">
            <PawPrint color={colors.green} size={26} strokeWidth={1.8} />
            <Text weight="medium" style={{ textAlign: 'center' }}>
              Nessun cane in zona ora, sii il primo!
            </Text>
            <Button variant="secondary" size="sm" onPress={() => chooseRadius(Infinity)}>
              <Button.Label>Esplora tutta Italia</Button.Label>
            </Button>
          </View>
        )}
      </View>
      <View className="px-5 pt-4 pb-3">
        <VisibilityButton />
      </View>
      <Dialog isOpen={cityOpen} onOpenChange={setCityOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="bg-background rounded-3xl">
            <Dialog.Close />
            <Dialog.Title style={{ fontFamily: fonts.semibold }}>Dove passeggiamo?</Dialog.Title>
            <View className="mt-5 mb-4 gap-2">
              {(['Roma', 'Milano'] as const).map((name) => (
                <Button
                  key={name}
                  variant="tertiary"
                  className="bg-surface justify-between rounded-2xl"
                  onPress={() => chooseCity(name)}
                >
                  <Button.Label style={{ fontFamily: fonts.medium }}>{name} · Demo</Button.Label>
                  {city === name && demo ? (
                    <Check size={18} color={colors.green} />
                  ) : (
                    <ChevronRight size={18} color={colors.muted} />
                  )}
                </Button>
              ))}
            </View>
            {locationError ? <ErrorNotice message={locationError} /> : null}
            <Button
              isDisabled={locating}
              onPress={() => {
                void locate().then(() => {
                  if (!useAppStore.getState().locationError) setCityOpen(false);
                });
              }}
            >
              <LocateFixed size={18} color={colors.ink} />
              <Button.Label>
                {locating ? 'Cerco la posizione…' : 'Usa la mia posizione'}
              </Button.Label>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
const styles = StyleSheet.create({
  previewShadow: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
  },
});
