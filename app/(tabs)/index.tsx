import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const DOGS = [
  { id: '1', name: 'Luna', breed: 'Labrador', age: '2 anni', emoji: '🦮', desc: 'Dolce e giocherellona! Cerco amici per correre al parco.', dist: '0.3 km', owner: 'Marco' },
  { id: '2', name: 'Brando', breed: 'Golden', age: '3 anni', emoji: '🐕‍🦺', desc: 'Ama correre e giocare con la palla!', dist: '0.8 km', owner: 'Giulia' },
];

export default function Home() {
  const router = useRouter();
  return (
    <View style={s.container}>
      <Text style={s.header}>Cani Vicino a Te 🐾</Text>
      <Text style={s.sub}>2 amici nelle vicinanze</Text>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {DOGS.map((dog) => (
          <Pressable key={dog.id} style={s.card} onPress={() => router.push(`/dog/${dog.id}`)}>
            <View style={s.emojiBox}><Text style={{ fontSize: 50 }}>{dog.emoji}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={s.name}>{dog.name}</Text>
                <Text style={s.dist}>📍 {dog.dist}</Text>
              </View>
              <Text style={s.breed}>{dog.breed} • {dog.age}</Text>
              <Text style={s.desc} numberOfLines={2}>{dog.desc}</Text>
              <View style={s.btn}><Text style={s.btnText}>Esplora profilo →</Text></View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', paddingTop: 60 },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', paddingHorizontal: 20 },
  sub: { color: '#888', paddingHorizontal: 20, marginTop: 4, marginBottom: 10 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 16, flexDirection: 'row', gap: 14, marginBottom: 16, shadowColor: '#FF5A7A', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  emojiBox: { width: 70, height: 70, backgroundColor: '#FFE4E8', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: '800', color: '#333' },
  dist: { fontSize: 12, color: '#FF5A7A', fontWeight: '600' },
  breed: { fontSize: 13, color: '#999', marginTop: 2 },
  desc: { fontSize: 13, color: '#555', marginTop: 6, lineHeight: 18 },
  btn: { marginTop: 10, backgroundColor: '#FF5A7A', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  btnText: { color: 'white', fontSize: 12, fontWeight: '700' },
});
