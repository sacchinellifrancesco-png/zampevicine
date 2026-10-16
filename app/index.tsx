import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <Text style={{ fontSize: 48 }}>🐾</Text>
        </View>
        <Text style={styles.title}>ZampeVicine</Text>
        <Text style={styles.subtitle}>Trova compagni per il tuo cane vicino a te</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/intro')}>
          <Text style={styles.btnText}>Iscrizione</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.btnTextDark}>Guarda i cani</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => setShowModal(true)}>
          <Text style={styles.linkText}>Prova finestrella 50/50</Text>
        </TouchableOpacity>
      </View>

      {showModal && (
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Text style={styles.modalTitle}>Conferma richiesta</Text>
            <Text style={styles.modalText}>
              Stai richiedendo un incontro per Luna.{"\n\n"}
              Regola di ZampeVicine:{"\n"}
              50% responsabilità padrone / 50% benessere cane{"\n\n"}
              Accetti di rispettare le regole del parco?
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.btnText}>Accetto - Invia richiesta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.btnTextDark}>Annulla</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { width: 96, height: 96, backgroundColor: '#FF8C42', borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  primaryBtn: { backgroundColor: '#FF8C42', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, width: '100%', maxWidth: 300, alignItems: 'center', marginBottom: 12 },
  secondaryBtn: { backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, width: '100%', maxWidth: 300, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  btnTextDark: { color: '#333', fontWeight: '700', fontSize: 16 },
  linkBtn: { marginTop: 10 },
  linkText: { color: '#FF8C42', fontWeight: '600' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, width: '100%', maxWidth: 400 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  modalText: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
});
