import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Map() {
  const [city, setCity] = useState("Terni");
  const [loading, setLoading] = useState(true);

  // Cani vicini - per ora mock, poi colleghiamo ai dati veri
  const [caniVicini] = useState([
    { id: "1", nome: "Hope", proprietario: "Marco", distanza: "120m", eta: "2 anni" },
    { id: "2", nome: "Luna", proprietario: "Giulia", distanza: "250m", eta: "1 anno" },
    { id: "3", nome: "Rocky", proprietario: "Francesco", distanza: "400m", eta: "3 anni" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status!== "granted") {
          setLoading(false);
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        let reverse = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        if (reverse[0]?.city) {
          setCity(reverse[0].city);
        } else if (reverse[0]?.subregion) {
          setCity(reverse[0].subregion);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFEF5" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Cerco cani vicino a te...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFEF5" }}>
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Text style={{ fontSize: 26, fontWeight: "800" }}>{city}</Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>Cani vicini - raggio 250m</Text>

        <View style={{ marginTop: 12, backgroundColor: "#FFE082", padding: 12, borderRadius: 10 }}>
          <Text style={{ fontWeight: "700", textAlign: "center" }}>🔒 ZONA PRIVACY 250m</Text>
          <Text style={{ fontSize: 11, textAlign: "center", marginTop: 4 }}>A casa sei nascosto, al parco sei visibile</Text>
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }}>
        {caniVicini.map((c) => (
          <Link key={c.id} href={`/chat-detail?id=${c.id}`} asChild>
            <Pressable style={{ backgroundColor: "white", padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee" }}>
              <Text style={{ fontWeight: "700" }}>{c.nome} - {c.proprietario} • {c.distanza}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>{c.eta} • Tocca per chattare</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
