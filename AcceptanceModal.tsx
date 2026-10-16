import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  dogName?: string;
  onAccept: () => void;
  onCancel: () => void;
}

export default function AcceptanceModal({ visible, dogName = "questo cane", onAccept, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Conferma richiesta</Text>
          <Text style={styles.text}>
            Stai richiedendo un incontro per {dogName}.{"\n\n"}
            Accettando confermi la regola di ZampeVicine:{"\n"}
            <Text style={{fontWeight:'700'}}>50% responsabilità padrone / 50% benessere cane</Text>
            {"\n\n"}Il proprietario accetta di rispettare le regole del parco e il benessere del cane.
          </Text>

          <TouchableOpacity style={styles.primary} onPress={onAccept}>
            <Text style={styles.primaryText}>Accetto - Invia richiesta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondary} onPress={onCancel}>
            <Text style={styles.secondaryText}>Annulla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 20, width: '100%', maxWidth: 400 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  text: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
  primary: { backgroundColor: '#FF8C42', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  primaryText: { color: 'white', fontWeight: '700' },
  secondary: { padding: 14, borderRadius: 10, alignItems: 'center', backgroundColor: '#f0f0f0' },
  secondaryText: { fontWeight: '600' },
});
