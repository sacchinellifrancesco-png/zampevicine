import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditDog() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🐶</Text>
      <Text style={styles.title}>Il Mio Cane</Text>
      <Text style={styles.name}>Luna - Labrador</Text>
      <Text style={styles.desc}>Profilo in sistemazione. Presto potrai modificare foto e info!</Text>
      <Pressable onPress={() => router.back()} style={styles.btn}>
        <Text style={styles.btnText}>← Torna alla Home</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  emoji: { fontSize: 80 },
  title: { fontSize: 26, fontWeight: '800', marginTop: 10 },
  name: { fontSize: 18, fontWeight: '600', marginTop: 8, color: '#FF6B9D' },
  desc: { fontSize: 15, color: '#666', textAlign: 'center', marginTop: 12, lineHeight: 20 },
  btn: { backgroundColor: 'white', padding: 14, borderRadius: 12, marginTop: 20, width: '100%', alignItems: 'center' },
  btnText: { fontWeight: '700', color: '#FF6B9D' },
});
