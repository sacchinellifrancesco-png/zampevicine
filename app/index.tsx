import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AcceptanceModal from '../components/AcceptanceModal';

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

      <AcceptanceModal 
        visible={showModal}
        dogName="Luna"
        onAccept={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 96, height: 96, backgroundColor: '#FF8C42', borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  primaryBtn: { backgroundColor: '#FF8C42', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, width: '100%', maxWidth: 300, alignItems: 'center', marginBottom: 12 },
  secondaryBtn: { backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, width: '100%', maxWidth: 300, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btnText: { color: 'white', fontWeight: '700', fontSize: 16 },
  btnTextDark: { color: '#333', fontWeight: '700', fontSize: 16 },
  linkBtn: { marginTop: 10 },
  linkText: { color: '#FF8C42', fontWeight: '600' },
});
