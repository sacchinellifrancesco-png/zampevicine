import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditDog() {
  const router = useRouter();
  const [name, setName] = useState('Rocky');
  const [breed, setBreed] = useState('Border Collie');
  const [age, setAge] = useState('1 anno');
  const [bio, setBio] = useState('Super energico, ama i bambini e le passeggiate lunghe al parco Sempione!');

  const save = () => {
    Alert.alert('Salvato! 🐾', `Profilo di ${name} aggiornato!`);
    router.back();
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        <Text style={s.header}>Modifica Profilo ✏️</Text>
        <Text style={s.label}>Nome del cane</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} />

        <Text style={s.label}>Razza</Text>
        <TextInput style={s.input} value={breed} onChangeText={setBreed} />

        <Text style={s.label}>Età</Text>
        <TextInput style={s.input} value={age} onChangeText={setAge} />

        <Text style={s.label}>Descrizione</Text>
        <TextInput style={[s.input, { height: 100, textAlignVertical: 'top' }]} value={bio} onChangeText={setBio} multiline />

        <Pressable style={s.saveBtn} onPress={save}>
          <Text style={s.saveText}>Salva Modifiche 💾</Text>
        </Pressable>

        <Pressable style={s.cancelBtn} onPress={() => router.back()}>
          <Text style={s.cancelText}>Annulla</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5' },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: 'white', borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 1, borderColor: '#FFE4E8' },
  saveBtn: { backgroundColor: '#FF5A7A', borderRadius: 20, padding: 16, alignItems: 'center', marginTop: 30 },
  saveText: { color: 'white', fontWeight: '800', fontSize: 16 },
  cancelBtn: { marginTop: 12, padding: 14, alignItems: 'center' },
  cancelText: { color: '#999', fontWeight: '600' },
});
