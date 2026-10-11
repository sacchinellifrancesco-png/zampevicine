import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CHATS = [
  { id: '1', name: 'Marco • Luna', last: 'Ciao! Quando andiamo al parco?', time: '10:32', unread: 2, emoji: '🦮' },
  { id: '2', name: 'Giulia • Brando', last: 'Brando non vede l ora di giocare!', time: 'Ieri', unread: 0, emoji: '🐕‍🦺' },
];

export default function Chats() {
  const router = useRouter();
  return (
    <View style={s.container}>
      <Text style={s.header}>Chat 💬</Text>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {CHATS.map(c => (
          <Pressable key={c.id} style={s.card} onPress={() => router.push(`/dog/${c.id}`)}>
            <View style={s.avatar}><Text style={{ fontSize: 30 }}>{c.emoji}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={s.name}>{c.name}</Text>
                <Text style={s.time}>{c.time}</Text>
              </View>
              <Text style={s.last} numberOfLines={1}>{c.last}</Text>
            </View>
            {c.unread > 0 && <View style={s.badge}><Text style={s.badgeText}>{c.unread}</Text></View>}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', paddingTop: 60 },
  header: { fontSize: 26, fontWeight: '800', color: '#FF5A7A', paddingHorizontal: 20, marginBottom: 10 },
  card: { backgroundColor: 'white', borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 50, height: 50, backgroundColor: '#FFE4E8', borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  name: { fontWeight: '700', color: '#333' },
  time: { fontSize: 11, color: '#999' },
  last: { fontSize: 13, color: '#777', marginTop: 3 },
  badge: { backgroundColor: '#FF5A7A', width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '700' },
});
