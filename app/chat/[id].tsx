import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DOGS: any = {
  '1': { name: 'Luna', owner: 'Marco', emoji: '🦮' },
  '2': { name: 'Brando', owner: 'Giulia', emoji: '🐕‍🦺' },
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dog = DOGS[id as string] || DOGS['1'];
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'them', text: `Ciao! Sono ${dog.owner}, padrone di ${dog.name}! 🐾` },
    { id: 2, from: 'them', text: 'Quando ci vediamo al parco?' },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), from: 'me', text: msg }]);
    setMsg('');
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now()+1, from: 'them', text: 'Perfetto! A domani alle 18 al Sempione? 🐶' }]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.header}>
        <Pressable onPress={() => router.back()}><Text style={s.back}>← Indietro</Text></Pressable>
        <Text style={s.headerTitle}>{dog.emoji} {dog.owner} • {dog.name}</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {messages.map(m => (
          <View key={m.id} style={[s.bubble, m.from === 'me' ? s.me : s.them]}>
            <Text style={[s.bubbleText, m.from === 'me' ? { color: 'white' } : null]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={s.inputRow}>
        <TextInput style={s.input} placeholder="Scrivi un messaggio..." value={msg} onChangeText={setMsg} />
        <Pressable style={s.send} onPress={send}><Text style={{ color: 'white', fontWeight: '700' }}>Invia</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5' },
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { color: '#FF5A7A', fontWeight: '700' },
  headerTitle: { fontWeight: '800', fontSize: 16 },
  bubble: { padding: 12, borderRadius: 18, marginBottom: 8, maxWidth: '80%' },
  them: { backgroundColor: 'white', alignSelf: 'flex-start' },
  me: { backgroundColor: '#FF5A7A', alignSelf: 'flex-end' },
  bubbleText: { color: '#333' },
  inputRow: { flexDirection: 'row', padding: 12, backgroundColor: 'white', gap: 8 },
  input: { flex: 1, backgroundColor: '#FFF0F5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
  send: { backgroundColor: '#FF5A7A', borderRadius: 20, paddingHorizontal: 18, justifyContent: 'center' },
});
