import { View, Text, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { PARKS_ROMA } from "../constants/parks";

export default function Map() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9EF" }}>
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Text style={{ fontSize: 26, fontWeight: "800" }}>Mappa - 20 Parchi</Text>
        <View style={{ marginTop: 12, backgroundColor: "#FFE082", padding: 12, borderRadius: 12 }}>
          <Text style={{ fontWeight: "700", textAlign: "center" }}>🏠 ZONA PRIVACY 250m</Text>
          <Text style={{ fontSize: 11, textAlign: "center" }}>A casa sei nascosto. A 250m diventi visibile.</Text>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {PARKS_ROMA.map((p) => (
          <Link key={p.id} href="/chat" asChild>
            <Pressable style={{ backgroundColor: "white", padding: 14, borderRadius: 12, marginBottom: 8 }}>
              <Text style={{ fontWeight: "700" }}>{p.name} - {p.cani} cani</Text>
              <Text style={{ fontSize: 11, color: "green" }}>Tocca per chattare</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
