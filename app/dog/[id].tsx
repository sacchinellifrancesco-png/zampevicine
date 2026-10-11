import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DOGS: any = {
  '1': { name: 'Luna', breed: 'Labrador', age: '2 anni', size: 'Media', emoji: '🦮', owner: 'Marco', desc: 'Dolce e giocherellona! Cerco amici per correre al parco Sempione.' },
  '2': { name: 'Brando', breed: 'Golden', age: '3 anni', size: 'Grande', emoji: '🐕‍🦺', owner: 'Giulia', desc: 'Ama correre e giocare con la palla! Cerchiamo compagni di avventure.' },
};

export default function DogDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dog = DOGS[id as string] || DOGS['1'];
  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <Pressable onPress={() => router.back()}><Text style={s.back}>← Torna ai cani</Text></Pressable>
      <View style={s.card}>
        <Text style={{ fontSize: 90 }}>{dog.emoji}</Text>
        <Text style={s.name}>{dog.name}</Text>
        <Text style={s.breed}>{dog.breed} • {dog.age} • {dog.size}</Text>
        <Text style={s.owner}>Padrone: {dog.owner}</Text>
        <Text style={s.desc}>{dog.desc}</Text>
        <Pressable style={s.btn} onPress={() => router.push(`/chat/${id}`)}>
          <Text style={s.btnText}>Chatta con {dog.owner} 💬</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5' },
  back: { color: '#FF5A7A', fontWeight: '700', marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 24, alignItems: 'center' },
  name: { fontSize: 28, fontWeight: '800', marginTop: 10 },
  breed: { color: '#999', marginTop: 4 },
  owner: { marginTop: 8, fontWeight: '600', color: '#FF5A7A' },
  desc: { marginTop: 16, color: '#666', textAlign: 'center', lineHeight: 22 },
  btn: { marginTop: 24, backgroundColor: '#FF5A7A', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 24, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '800', fontSize: 16 },
});
