import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Warm } from "../constants/Colors";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([
    { from: "Luna", text: "Ciao! Luna è VERDE, vuole giocare 🐶", mine: false },
    { from: "Tu", text: "Perfetto, arriviamo al parco tra 5 min!", mine: true },
  ]);

  const send = () => {
    if (!msg) return;
    setChats([...chats, { from: "Tu", text: msg, mine: true }]);
    setMsg("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg }}>
      <View style={{ padding: 20, paddingTop: 50, backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontWeight: "800", fontSize: 18, color: Warm.text }}>Chat con Luna</Text>
          <Text style={{ fontSize: 12, color: Warm.green }}>● VERDE - 120m - Amichevole</Text>
        </View>
        <Link href="/map" asChild>
          <Pressable style={{ backgroundColor: Warm.bg, padding: 10, borderRadius: 10 }}>
            <Text>← Mappa</Text>
          </Pressable>
        </Link>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {chats.map((c, i) => (
          <View key={i} style={{ alignSelf: c.mine ? "flex-end" : "flex-start", backgroundColor: c.mine ? Warm.primary : "white", padding: 12, borderRadius: 14, marginTop: 8, maxWidth: "80%" }}>
            <Text style={{ color: c.mine ? "white" : Warm.text }}>{c.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", padding: 16, backgroundColor: "white", gap: 10 }}>
        <TextInput value={msg} onChangeText={setMsg} placeholder="Scrivi..." style={{ flex: 1, backgroundColor: Warm.bg, padding: 14, borderRadius: 12 }} />
        <Pressable onPress={send} style={{ backgroundColor: Warm.primary, paddingHorizontal: 20, justifyContent: "center", borderRadius: 12 }}>
          <Text style={{ color: "white", fontWeight: "700" }}>Invia</Text>
        </Pressable>
      </View>
    </View>
  );
}
