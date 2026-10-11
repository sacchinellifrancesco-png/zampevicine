import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se sei già iscritto vai diretto a Esplora
    AsyncStorage.getItem('user').then(v => {
      if (v) router.replace('/(tabs)');
      else setLoading(false);
    });
  }, []);

  const iscriviti = async () => {
    if (!nome || !cognome || !email || !dogName) {
      Alert.alert('Compila tutto', 'Manca nome, cognome, email o nome del cane 🐶');
      return;
    }
    const user = { nome, cognome, email, dogName, dogBreed, createdAt: new Date().toISOString() };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('myDog', JSON.stringify({ name: dogName, breed: dogBreed || 'Metincio', age: '2 anni', size: 'Media', bio: `Ciao sono ${dogName} di ${nome}!` }));
    router.replace('/(tabs)');
  };

  if (loading) return <View style={s.loading}><Text style={{color:'#FF6B2B', fontWeight:'800'}}>LeashLove 🐾</Text></View>;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 40 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
          <Text style={s.title}>Crea il tuo profilo</Text>
          <Text style={s.sub}>Unisciti ai cani vicino a te a Roma</Text>
          <Image source={{uri:'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300'}} style={s.heroImg} />
        </View>

        <Text style={s.label}>Il tuo nome</Text>
        <TextInput style={s.input} placeholder="Es. Marco" value={nome} onChangeText={setNome} />

        <Text style={s.label}>Cognome</Text>
        <TextInput style={s.input} placeholder="Es. Rossi" value={cognome} onChangeText={setCognome} />

        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="marco@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <View style={{ height: 1, backgroundColor: '#FFE5D6', marginVertical: 20 }} />

        <Text style={s.sectionTitle}>🐶 Il tuo cane</Text>

        <Text style={s.label}>Nome del cane *</Text>
        <TextInput style={s.input} placeholder="Es. Moka" value={dogName} onChangeText={setDogName} />

        <Text style={s.label}>Razza</Text>
        <TextInput style={s.input} placeholder="Es. Golden Retriever" value={dogBreed} onChangeText={setDogBreed} />

        <Pressable style={s.btn} onPress={iscriviti}>
          <Text style={s.btnText}>Entra in LeashLove 🧡</Text>
        </Pressable>

        <Text style={s.privacy}>Continuando accetti i termini • Demo solo su questo dispositivo</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF7' },
  loading: { flex: 1, backgroundColor: '#FFFBF7', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 28, fontWeight: '900' },
  title: { fontSize: 26, fontWeight: '900', color: '#111', marginTop: 12 },
  sub: { fontSize: 14, color: '#777', marginTop: 6 },
  heroImg: { width: 120, height: 120, borderRadius: 60, marginTop: 16, backgroundColor: '#FFE5D6' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: '#333', marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: 'white', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#FFE5D6', fontSize: 15 },
  btn: { backgroundColor: '#FF6B2B', borderRadius: 20, paddingVertical: 16, alignItems: 'center', marginTop: 24, elevation: 4 },
  btnText: { color: 'white', fontWeight: '900', fontSize: 16 },
  privacy: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 14 },
});
