import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { Warm } from "../constants/Colors";

export default function Signup() {
  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "800", color: Warm.text }}>Crea account</Text>
      <Text style={{ color: Warm.textSoft, marginTop: 4 }}>Senza Moka - solo te e il tuo cane</Text>

      <TextInput placeholder="Il tuo nome" style={{ marginTop: 24, backgroundColor: "white", padding: 16, borderRadius: 12 }} />
      <TextInput placeholder="Nome del cane" style={{ marginTop: 12, backgroundColor: "white", padding: 16, borderRadius: 12 }} />
      <TextInput placeholder="Email" style={{ marginTop: 12, backgroundColor: "white", padding: 16, borderRadius: 12 }} />

      <Link href="/dog-profile" asChild>
        <Pressable style={{ marginTop: 24, backgroundColor: Warm.primary, padding: 16, borderRadius: 16, alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "700" }}>Continua</Text>
        </Pressable>
      </Link>
    </View>
  );
}
