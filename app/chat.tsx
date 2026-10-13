import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Chat() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FEF9EF", padding: 24, paddingTop: 60 }}>
      <Text style={{ fontSize: 26, fontWeight: "800" }}>Chat con Luna</Text>
      <Text style={{ color: "green", marginTop: 4 }}>● VERDE - 120m - Amichevole</Text>
      
      <View style={{ marginTop: 20, backgroundColor: "white", padding: 14, borderRadius: 12 }}>
        <Text>Luna: Ciao! Vuole giocare 🐶</Text>
      </View>
      
      <View style={{ marginTop: 8, backgroundColor: "#FE6A25", padding: 14, borderRadius: 12, alignSelf: "flex-end" }}>
        <Text style={{ color: "white" }}>Tu: Arriviamo al parco!</Text>
      </View>

      <Link href="/map" asChild>
        <Pressable style={{ marginTop: 30, backgroundColor: "white", padding: 14, borderRadius: 12, alignItems: "center" }}>
          <Text>← Torna alla Mappa</Text>
        </Pressable>
      </Link>
    </View>
  );
}
