import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';

type Msg = { 
  id: string; 
  text?: string; 
  image?: string; 
  audio?: string; 
  duration?: number; 
  fromMe: boolean; 
  time: string; 
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Msg[]>([
    { id: '1', text: 'Ciao! Come sta il tuo cucciolo?', fromMe: false, time: '10:30' },
    { id: '2', text: 'Bene! Ci vediamo al parco alle 17?', fromMe: true, time: '10:31' },
  ]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMsg: Msg = {
      id: Date.now().toString(),
      text: text.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const pickImage = async () => {
    Alert.alert(
      "Foto disabilitata su web", 
      "Per ora su leashlove.app le foto in chat sono disabilitate per far passare il build."
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Indietro</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Chat {id}</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView 
        ref={scrollRef} 
        style={styles.messages} 
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((m) => (
          <View key={m.id} style={[styles.bubble, m.fromMe ? styles.bubbleMe : styles.bubbleOther]}>
            {m.image && <Image source={{ uri: m.image }} style={styles.bubbleImage} />}
            {m.text && <Text style={[styles.bubbleText, m.fromMe ? styles.textMe : styles.textOther]}>{m.text}</Text>}
            <Text style={styles.time}>{m.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <Pressable onPress={pickImage} style={styles.attachBtn}>
          <Text style={styles.attachText}>📷</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="Scrivi un messaggio..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <Pressable onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendText}>Invia</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#eee', paddingTop: Platform.OS === 'ios' ? 20 : 0 },
  backBtn: { padding: 4 },
  backText: { color: '#ff6b35', fontWeight: '600' },
  headerTitle: { fontWeight: '700', fontSize: 16 },
  messages: { flex: 1, backgroundColor: '#f9f5f2' },
  messagesContent: { padding: 16, gap: 10 },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 18, },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: '#ff6b35', borderBottomRightRadius: 4 },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#eee' },
  bubbleText: { fontSize: 15 },
  textMe: { color: '#fff' },
  textOther: { color: '#111' },
  bubbleImage: { width: 180, height: 180, borderRadius: 12, marginBottom: 6 },
  time: { fontSize: 10, opacity: 0.5, marginTop: 4, alignSelf: 'flex-end' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderColor: '#eee', gap: 8 },
  attachBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center' },
  attachText: { fontSize: 20 },
  input: { flex: 1, height: 44, backgroundColor: '#f2f2f2', borderRadius: 22, paddingHorizontal: 16 },
  sendBtn: { backgroundColor: '#111', paddingHorizontal: 18, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontWeight: '700' },
});
