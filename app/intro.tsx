import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Warm } from "../constants/Colors";

export default function Intro() {
  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 40, fontWeight: "800", color: Warm.text }}>LeashLove</Text>
      <Text style={{ marginTop: 8, color: Warm.text }}>Fai uscire il tuo cane, non solo te.</Text>
      
      <Link href="/signup" asChild>
        <Pressable style={{ marginTop: 28, backgroundColor: Warm.primary, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 20 }}>
          <Text style={{ color: "white", fontWeight: "700" }}>Inizia</Text>
        </Pressable>
      </Link>
    </View>
  );
}
