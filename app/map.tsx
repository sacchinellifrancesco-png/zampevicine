import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Map() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9EF", padding: 24, paddingTop: 50 }}>
      <Text style={{ fontSize: 26, fontWeight: "800" }}>Mappa - LeashLove</Text>
      
      <View style={{ marginTop: 16, backgroundColor: "#FFE082", padding: 14, borderRadius: 12 }}>
        <Text style={{ fontWeight: "700", textAlign: "center" }}>🏠 ZONA PRIVACY 250m</Text>
        <Text style={{ fontSize: 12, marginTop: 4, textAlign: "center" }}>A casa sei nascosto. A 250m diventi visibile</Text>
      </View>

      <Text style={{ marginTop: 20, fontWeight: "700" }}>Cani vicini a te:</Text>

      <Link href="/chat" asChild>
        <Pressable style={{ marginTop: 12, backgroundColor: "white", padding: 16, borderRadius: 14, borderLeftWidth: 6, borderLeftColor: "#4CAF50" }}>
          <Text style={{ fontWeight: "700" }}>Luna • 120m</Text>
          <Text style={{ fontSize: 12, color: "green", marginTop: 2 }}>● VERDE - Amichevole - Tocca per chattare</Text>
        </Pressable>
      </Link>

      <Link href="/chat" asChild>
        <Pressable style={{ marginTop: 10, backgroundColor: "white", padding: 16, borderRadius: 14, borderLeftWidth: 6, borderLeftColor: "#FFC107" }}>
          <Text style={{ fontWeight: "700" }}>Rocky • 180m</Text>
          <Text style={{ fontSize: 12, color: "#9E7700", marginTop: 2 }}>● GIALLO - Attenzione - Tocca per chattare</Text>
        </Pressable>
      </Link>

      <View style={{ marginTop: 20, backgroundColor: "white", padding: 14, borderRadius: 12 }}>
        <Text style={{ fontSize: 12, color: "#888" }}>Regola privacy che volevi tu: il tracking parte a 250m da casa e si spegne a 250m prima di casa. Nessuno vede dove abiti.</Text>
      </View>
    </View>
  );
}
