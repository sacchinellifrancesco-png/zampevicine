import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIZES = ['Piccola', 'Media', 'Grande', 'Gigante'];

export default function EditDog() {
  const router = useRouter();
  const [name, setName] = useState('Rocky');
  const [breed, setBreed] = useState('Border Collie');
  const [age, setAge] = useState('1 anno');
  const [size, setSize] = useState('Media');
  const [bio, setBio] = useState('Super energico, ama i bambini e le passeggiate lunghe!');

  useEffect(() => {
    AsyncStorage.getItem('myDog').then(v => {
      if(v){ const d=JSON.parse(v); setName(d.name); setBreed(d.breed); setAge(d.age); setSize(d.size||'Media'); setBio(d.bio); }
    });
  }, []);

  const save = async () => {
    await AsyncStorage.setItem('myDog', JSON.stringify({ name, breed, age, size, bio }));
    Alert.alert('Salvato! 🐾', `${name} aggiornato!`);
    router.back();
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        <Text style={s.header}>Modifica Profilo ✏️</Text>
        <Text style={s.label}>Nome</Text><TextInput style={s.input} value={name} onChangeText={setName} />
        <Text style={s.label}>Razza</Text><TextInput style={s.input} value={breed} onChangeText={setBreed} />
        <Text style={s.label}>Età</Text><TextInput style={s.input} value={age} onChangeText={setAge} />
        <Text style={s.label}>Taglia 🐕</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {SIZES.map(sz => (
            <Pressable key={sz} onPress={()=>setSize(sz)} style={[s.chip, size===sz && s.chipActive]}><Text style={[s.chipText, size===sz && {color:'white'}]}>{sz}</Text></Pressable>
          ))}
        </View>
        <Text style={s.label}>Descrizione</Text><TextInput style={[s.input, { height: 100, textAlignVertical: 'top' }]} value={bio} onChangeText={setBio} multiline />
        <Pressable style={s.saveBtn} onPress={save}><Text style={s.saveText}>Salva Modifiche 💾</Text></Pressable>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5' },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: 'white', borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 1, borderColor: '#FFE4E8' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#FFE4E8' },
  chipActive: { backgroundColor: '#FF5A7A', borderColor: '#FF5A7A' },
  chipText: { fontWeight: '600' },
  saveBtn: { backgroundColor: '#FF5A7A', borderRadius: 20, padding: 16, alignItems: 'center', marginTop: 30 },
  saveText: { color: 'white', fontWeight: '800', fontSize: 16 },
});
