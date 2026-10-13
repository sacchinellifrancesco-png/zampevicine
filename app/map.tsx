import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Warm } from "../constants/Colors";

export default function Map() {
  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg, padding: 24 }}>
      <Text style={{ fontSize: 26, fontWeight: "800", color: Warm.text }}>Mappa - Privacy 250m</Text>
      
      <View style={{ marginTop: 16, backgroundColor: Warm.yellow, padding: 14, borderRadius: 12 }}>
        <Text style={{ fontWeight: "700", color: Warm.text, textAlign: "center" }}>🏠 ZONA PRIVACY</Text>
        <Text style={{ fontSize: 12, marginTop: 4, textAlign: "center", color: Warm.text }}>A meno di 250m da casa = tracking SPENTO</Text>
      </View>

      <View style={{ marginTop: 16, backgroundColor: "white", padding: 16, borderRadius: 12 }}>
        <Text style={{ fontWeight: "700", color: Warm.text }}>Come funziona:</Text>
        <Text style={{ marginTop: 8, color: Warm.textSoft, fontSize: 13 }}>• In casa = nascosto</Text>
        <Text style={{ color: Warm.textSoft, fontSize: 13 }}>• A 250m da casa = diventi visibile</Text>
        <Text style={{ color: Warm.textSoft, fontSize: 13 }}>• Torni a 250m da casa = torni nascosto</Text>
      </View>

      <View style={{ marginTop: 16, backgroundColor: "white", padding: 16, borderRadius: 14 }}>
        <Text style={{ fontWeight: "700" }}>Cani vicini (esempio)</Text>
        <Text style={{ marginTop: 6, color: Warm.textSoft }}>Luna • 120m • VERDE - Amichevole</Text>
      </View>

      <Link href="/dog-profile" asChild>
        <Pressable style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: Warm.textSoft }}>← Profilo cane</Text>
        </Pressable>
      </Link>
    </View>
  );
}
