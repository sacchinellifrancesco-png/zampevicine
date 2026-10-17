import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Entra() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Compila tutti i campi');
      return;
    }
    // salva utente finto per ora
    await AsyncStorage.setItem('user', JSON.stringify({ email }));
    router.replace('/'); // <--- FIX: non ricarica la pagina
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entra in ZampeVicine</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entra</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 14, marginBottom: 12 },
  btn: { backgroundColor: '#111', padding: 16, borderRadius: 12, marginTop: 8 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
