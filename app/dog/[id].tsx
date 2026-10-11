import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Link } from 'expo-router';

export default function DogPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.back}>← Indietro</Text>
      </Pressable>
      <Text style={styles.emoji}>🐶</Text>
      <Text style={styles.title}>Luna</Text>
      <Text style={styles.breed}>Labrador • 2 anni</Text>
      <Text style={styles.desc}>Dolce e giocherellona! Cerco amici per correre al parco.</Text>
      <Link href={`/`} asChild>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>💬 Chatta con il padrone</Text>
        </Pressable>
      </Link>
      <Text style={styles.id}>ID: {id}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', padding: 20, paddingTop: 60, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start' },
  back: { fontSize: 16, color: '#FF6B9D', fontWeight: '600', marginBottom: 20 },
  emoji: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '800' },
  breed: { fontSize: 16, color: '#666', marginTop: 4 },
  desc: { fontSize: 16, textAlign: 'center', marginTop: 16, color: '#444', lineHeight: 22 },
  btn: { backgroundColor: '#FF6B9D', padding: 14, borderRadius: 12, marginTop: 24, width: '100%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  id: { marginTop: 20, color: '#AAA', fontSize: 12 },
});
