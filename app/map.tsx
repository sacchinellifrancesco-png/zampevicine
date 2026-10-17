import { View, Text, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";

export default function Map() {
  const [city, setCity] = useState("Terni");
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // su web non chiediamo la posizione, su telefono sì
    if (Platform.OS !== 'web') {
      (async () => {
        try {
          const Location = await import('expo-location');
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const loc = await Location.getCurrentPositionAsync({});
            setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
          }
        } catch {}
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mappa vicino a {city}</Text>
      
      {Platform.OS === 'web' ? (
        <View style={styles.webBox}>
          <Text style={styles.webText}>🗺️ Mappa disponibile sull'app mobile</Text>
          <Text style={styles.webSub}>Su web vedi la lista dei cani a {city}</Text>
          <Link href="/" style={styles.link}>Torna alla lista</Link>
        </View>
      ) : (
        <View style={styles.webBox}>
          <Text>Posizione: {coords ? `${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}` : 'Caricamento...'}</Text>
          {/* Qui puoi rimettere MapView quando sei su telefono */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  webBox: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 16, padding: 20 },
  webText: { fontSize: 18, fontWeight: 'bold' },
  webSub: { marginTop: 8, color: '#666' },
  link: { marginTop: 20, color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' }
});
