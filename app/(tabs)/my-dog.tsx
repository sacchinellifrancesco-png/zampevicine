import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function MyDog() {
  return (
    <View style={s.container}>
      <Text style={s.header}>Il Mio Cane 🐶</Text>
      <View style={s.card}>
        <Text style={{ fontSize: 80 }}>🐶</Text>
        <Text style={s.name}>Rocky</Text>
        <Text style={s.breed}>Border Collie • 1 anno</Text>
        <Text style={s.desc}>Super energico, ama i bambini e le passeggiate lunghe al parco Sempione!</Text>
        <Pressable style={s.btn}><Text style={s.btnText}>Modifica Profilo ✏️</Text></Pressable>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', paddingTop: 60, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', alignSelf: 'flex-start', paddingHorizontal: 20, marginBottom: 20 },
  card: { backgroundColor: 'white', width: '90%', borderRadius: 24, padding: 24, alignItems: 'center', elevation: 3 },
  name: { fontSize: 24, fontWeight: '800', color: '#333', marginTop: 12 },
  breed: { color: '#999', marginTop: 4 },
  desc: { textAlign: 'center', color: '#666', marginTop: 12, lineHeight: 20 },
  btn: { marginTop: 20, backgroundColor: '#FF5A7A', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: 'white', fontWeight: '700' },
});
