import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text style={styles.headerSubtitle}>3 conversazioni attive</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <TouchableOpacity style={styles.chatItem}>
          <View style={styles.avatar}><Text style={styles.avatarText}>🐕</Text></View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatName}>Luna & Marco</Text>
              <Text style={styles.chatTime}>2 min fa</Text>
            </View>
            <Text style={styles.chatMessage} numberOfLines={1}>Ci vediamo al parco alle 18?</Text>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatItem}>
          <View style={styles.avatar}><Text style={styles.avatarText}>🦮</Text></View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatName}>Rocky & Giulia</Text>
              <Text style={styles.chatTime}>1h fa</Text>
            </View>
            <Text style={styles.chatMessage} numberOfLines={1}>Rocky ha adorato la passeggiata!</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatItem}>
          <View style={styles.avatar}><Text style={styles.avatarText}>🐩</Text></View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatName}>Milo & Sara</Text>
              <Text style={styles.chatTime}>Ieri</Text>
            </View>
            <Text style={styles.chatMessage} numberOfLines={1}>A domani per il giro in centro</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F5' },
  header: { padding: 20, paddingTop: 60, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  list: { flex: 1 },
  listContent: { padding: 12 },
  chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 14, borderRadius: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFE0D6', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24 },
  chatInfo: { flex: 1, marginLeft: 12 },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatName: { fontSize: 16, fontWeight: '600', color: '#333' },
  chatTime: { fontSize: 12, color: '#AAA' },
  chatMessage: { fontSize: 14, color: '#666', marginTop: 2 },
  badge: { backgroundColor: '#FF6B6B', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 24, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#FF6B6B', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
});
