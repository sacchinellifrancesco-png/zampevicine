
import { View, Text } from "react-native";
import { Warm } from "../constants/Colors";

export default function Intro() {
  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "800", color: Warm.text }}>LeashLove</Text>
      <Text style={{ marginTop: 10, color: Warm.text }}>Fai uscire il tuo cane, non solo te.</Text>
    </View>
  );
}
