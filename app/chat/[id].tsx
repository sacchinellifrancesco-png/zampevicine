import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChatPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([{ id: 1, me: false, t: 'Ciao! Portiamo Luna al parco domani? 🐾' }]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { id: Date.now(), me: true, t: text }]);
    setText('');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>← Indietro</Text></Pressable>
      <Text style={styles.title}>Chat con Marco</Text>
      <ScrollView style={styles.box}>
        {msgs.map(m => (
          <View key={m.id} style={[styles.msg, m.me ? styles.me : styles.them]}>
            <Text style={m.me ? styles.meText : styles.themText}>{m.t}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Scrivi..." />
        <Pressable onPress={send} style={styles.send}><Text style={styles.sendText}>Invia</Text></Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', padding: 20, paddingTop: 50 },
  back: { color: '#FF6B9D', fontWeight: '600', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  box: { flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 12 },
  msg: { padding: 10, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  them: { backgroundColor: '#EEE', alignSelf: 'flex-start' },
  me: { backgroundColor: '#FF6B9D', alignSelf: 'flex-end' },
  themText: { color: '#222' },
  meText: { color: 'white' },
  inputRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  input: { flex: 1, backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
  send: { backgroundColor: '#FF6B9D', borderRadius: 20, paddingHorizontal: 18, justifyContent: 'center' },
  sendText: { color: 'white', fontWeight: '700' },
});
