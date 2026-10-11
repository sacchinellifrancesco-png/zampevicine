import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Esplora() {
  const router = useRouter();
  const [filter, setFilter] = useState('1,5 km');
  const [isOut, setIsOut] = useState(false);
  const [seconds, setSeconds] = useState(3600);
  const [myDogName, setMyDogName] = useState('Rocky');
  const filters = ['500 m', '1,5 km', '5 km', 'Città · 10 km'];

  useEffect(() => {
    AsyncStorage.getItem('myDog').then(v => {
      if(v) { try { const d = JSON.parse(v); if(d.name) setMyDogName(d.name); } catch {} }
    });
  }, []);

  useEffect(() => {
    if (!isOut) return;
    const t = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { setIsOut(false); return 3600; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isOut]);

  const toggleOut = () => {
    if (isOut) {
      setIsOut(false); setSeconds(3600);
    } else {
      setIsOut(true); setSeconds(3600);
    }
  };

  const fmt = (s:number) => {
    const m = Math.floor(s/60); const sec = s%60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  };

  return (
    <View style={s.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* HEADER */}
        <View style={s.header}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontSize: 22 }}>🐾</Text>
              <Text style={s.logo}><Text style={{ color: '#FF6B2B' }}>Leash</Text><Text style={{ color: '#222' }}>Love</Text></Text>
            </View>
            <Text style={s.subHeader}>Incontra cani e padroni vicino a te</Text>
          </View>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100' }} style={s.avatar} />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={s.title}>Vicino a te</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <Text>📍</Text><Text style={s.location}>Roma, Lazio</Text><Text style={{ color: '#666' }}>∨</Text><Text style={s.demo}>Demo</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginTop: 14 }}>
          {filters.map(f => (
            <Pressable key={f} onPress={() => setFilter(f)} style={[s.filter, filter === f && s.filterActive]}>
              <Text style={[s.filterText, filter === f && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* MAPPA */}
        <View style={s.map}>
          <View style={s.mapBg} />
          <View style={s.badgeSpasso}><View style={s.greenDot} /><Text style={s.badgeText}>{isOut? '6' : '5'} cani a spasso {isOut? '• tu incluso!' : ''}</Text></View>

          <View style={[s.marker, { top: 30, left: '42%' }]}><Image source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100' }} style={s.markerImg} /></View>
          <View style={[s.marker, { top: 95, left: '62%' }]}><View style={s.markerActive}><Image source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100' }} style={s.markerImg} /></View></View>

          {isOut && (
            <View style={[s.marker, { top: 55, left: '28%' }]}>
              <View style={[s.markerActive, { borderColor: '#1F3D2B', backgroundColor: '#1F3D2B' }]}>
                <Text style={{ fontSize: 20 }}>🐶</Text>
              </View>
              <View style={[s.myBadge]}><Text style={s.myBadgeText}>TU • {myDogName}</Text></View>
            </View>
          )}
          <Text style={s.osm}>© OpenStreetMap contributors</Text>
        </View>

        {/* CARD MOKA */}
        <View style={s.cardWrap}>
          <Pressable style={s.card} onPress={() => router.push('/dog/1')}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200' }} style={s.cardImg} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={s.cardName}>Moka</Text><Text style={{ color: '#999', fontSize: 18 }}>›</Text>
              </View>
              <Text style={s.cardBreed}>Golden Retriever · 3 anni</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}><Text style={{ fontSize: 12 }}>📍</Text><Text style={s.cardDist}>0,3 km · Villa Borghese</Text></View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}><View style={s.tagGreen}><Text style={s.tagGreenText}>Giocoso</Text></View><Text style={s.ownerText}>di Giulia</Text></View>
            </View>
          </Pressable>
        </View>

        {/* BOTTONE CHE FUNZIONA */}
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <Pressable style={[s.orangeBtn, isOut && s.greenBtn]} onPress={toggleOut}>
            {isOut? (
              <>
                <Text style={s.orangeBtnTitle}>✅ Sei fuori! {fmt(seconds)}</Text>
                <Text style={s.orangeBtnSub}>Tocca per tornare a casa 🏠</Text>
              </>
            ) : (
              <>
                <Text style={s.orangeBtnTitle}>Sto uscendo ora</Text>
                <Text style={s.orangeBtnSub}>- visibile 60 min 🐾</Text>
              </>
            )}
          </Pressable>

          {isOut && (
            <View style={s.infoBox}>
              <Text style={s.infoText}>🎉 Sei visibile a tutti vicino a Villa Borghese! Gli altri padroni possono vederti per {fmt(seconds)} min.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF7' },
  header: { paddingTop: 60, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 22, fontWeight: '900' },
  subHeader: { fontSize: 12, color: '#777', marginTop: 2 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE5D6' },
  title: { fontSize: 32, fontWeight: '900', color: '#111', letterSpacing: -1 },
  location: { fontWeight: '600', color: '#333' },
  demo: { fontSize: 12, color: '#999', backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 6 },
  filter: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#E5E5E5' },
  filterActive: { backgroundColor: '#1F3D2B', borderColor: '#1F3D2B' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#555' },
  filterTextActive: { color: 'white' },
  map: { height: 280, marginTop: 16, marginHorizontal: 12, borderRadius: 20, overflow: 'hidden', backgroundColor: '#E8F1E6', borderWidth: 1, borderColor: '#E0E0E0' },
  mapBg: {...StyleSheet.absoluteFillObject, backgroundColor: '#E8F1E6' },
  badgeSpasso: { position: 'absolute', top: 12, left: 12, backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 6, elevation: 3 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2E7D32' },
  badgeText: { fontSize: 12, fontWeight: '700' },
  marker: { position: 'absolute', alignItems: 'center' },
  markerImg: { width: 36, height: 36, borderRadius: 18 },
  markerActive: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: '#FF6B2B', padding: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  myBadge: { marginTop: 4, backgroundColor: '#1F3D2B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  myBadgeText: { color: 'white', fontSize: 9, fontWeight: '800' },
  osm: { position: 'absolute', bottom: 6, right: 8, fontSize: 9, color: '#666' },
  cardWrap: { marginTop: -40, paddingHorizontal: 20, zIndex: 20 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 12, flexDirection: 'row', gap: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 },
  cardImg: { width: 80, height: 80, borderRadius: 16, backgroundColor: '#FFF0E0' },
  cardName: { fontSize: 22, fontWeight: '900', color: '#111' },
  cardBreed: { fontSize: 13, color: '#777', marginTop: 1 },
  cardDist: { fontSize: 12, color: '#2E7D32', fontWeight: '600' },
  tagGreen: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tagGreenText: { fontSize: 11, color: '#2E7D32', fontWeight: '600' },
  ownerText: { fontSize: 12, color: '#777' },
  orangeBtn: { backgroundColor: '#FF6B2B', borderRadius: 20, paddingVertical: 14, alignItems: 'center', elevation: 4 },
  greenBtn: { backgroundColor: '#1F3D2B' },
  orangeBtnTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
  orangeBtnSub: { color: 'white', fontWeight: '700', fontSize: 14, marginTop: 2, opacity: 0.9 },
  infoBox: { marginTop: 10, backgroundColor: '#E8F5E9', borderRadius: 12, padding: 12 },
  infoText: { fontSize: 12, color: '#1F3D2B', lineHeight: 16, fontWeight: '600' },
});
