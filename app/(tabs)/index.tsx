import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const DOGS = [
  { id: '1', name: 'Luna 🐶', breed: 'Labrador', age: '2 anni', where: 'Prati - 200m' },
  { id: '2', name: 'Brando 🐕', breed: 'Pastore Tedesco', age: '3 anni', where: 'Trastevere - 500m' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cani Vicino a Te 🐾</Text>
      <Text style={styles.sub}>Tocca per chattare!</Text>
      {DOGS.map((dog) => (
        <Link key={dog.id} href={`/dog/${dog.id}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.name}>{dog.name}</Text>
            <Text style={styles.info}>{dog.breed} • {dog.age}</Text>
            <Text style={styles.where}>📍 {dog.where}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '800', color: '#222' },
  sub: { fontSize: 16, color: '#666', marginBottom: 20, marginTop: 4 },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 16, marginBottom: 12, elevation: 2 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  info: { fontSize: 14, color: '#555' },
  where: { fontSize: 13, color: '#FF6B9D', marginTop: 6, fontWeight: '600' },
});
