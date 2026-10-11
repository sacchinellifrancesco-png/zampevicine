import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyDog() {
  const router = useRouter();
  const [dog, setDog] = useState({ name: 'Rocky', breed: 'Border Collie', age: '1 anno', size: 'Media', bio: 'Super energico, ama i bambini e le passeggiate lunghe al parco Sempione!' });

  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('myDog').then(v => { if(v) setDog(JSON.parse(v)); });
  }, []));

  return (
    <View style={s.container}>
      <Text style={s.header}>Il Mio Cane 🐶</Text>
      <View style={s.card}>
        <Text style={{ fontSize: 80 }}>🐶</Text>
        <Text style={s.name}>{dog.name}</Text>
        <Text style={s.breed}>{dog.breed} • {dog.age} • {dog.size}</Text>
        <Text style={s.desc}>{dog.bio}</Text>
        <Pressable style={s.btn} onPress={() => router.push('/edit-dog')}>
          <Text style={s.btnText}>Modifica Profilo ✏️</Text>
        </Pressable>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', paddingTop: 60, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', alignSelf: 'flex-start', paddingHorizontal: 20, marginBottom: 20 },
  card: { backgroundColor: 'white', width: '90%', borderRadius: 24, padding: 24, alignItems: 'center', elevation: 3 },
  name: { fontSize: 24, fontWeight: '800', color: '#333', marginTop: 12 },
  breed: { color: '#999', marginTop: 4, textAlign: 'center' },
  desc: { textAlign: 'center', color: '#666', marginTop: 12, lineHeight: 20 },
  btn: { marginTop: 20, backgroundColor: '#FF5A7A', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20 },
  btnText: { color: 'white', fontWeight: '700' },
});
