import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { Warm } from "../constants/Colors";

export default function DogProfile() {
  const [safety, setSafety] = useState("green");

  return (
    <View style={{ flex: 1, backgroundColor: Warm.bg, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "800", color: Warm.text }}>Il tuo cane</Text>
      <Text style={{ color: Warm.textSoft, marginTop: 4 }}>Questo vedono gli altri a 250m</Text>

      <TextInput placeholder="Nome cane" style={{ marginTop: 24, backgroundColor: "white", padding: 16, borderRadius: 12 }} />
      <TextInput placeholder="Razza" style={{ marginTop: 12, backgroundColor: "white", padding: 16, borderRadius: 12 }} />
      <TextInput placeholder="Età" style={{ marginTop: 12, backgroundColor: "white", padding: 16, borderRadius: 12 }} />

      <Text style={{ marginTop: 20, fontWeight: "700", color: Warm.text }}>Sicurezza:</Text>
      
      <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
        <Pressable onPress={() => setSafety("green")} style={{ flex: 1, backgroundColor: safety === "green" ? Warm.green : "white", padding: 14, borderRadius: 12, alignItems: "center", borderWidth: 2, borderColor: safety === "green" ? Warm.green : Warm.border }}>
          <Text style={{ fontWeight: "700", color: safety === "green" ? "white" : Warm.text }}>VERDE</Text>
          <Text style={{ fontSize: 10, color: safety === "green" ? "white" : Warm.textSoft }}>Amichevole</Text>
        </Pressable>
        
        <Pressable onPress={() => setSafety("yellow")} style={{ flex: 1, backgroundColor: safety === "yellow" ? Warm.yellow : "white", padding: 14, borderRadius: 12, alignItems: "center", borderWidth: 2, borderColor: safety === "yellow" ? Warm.yellow : Warm.border }}>
          <Text style={{ fontWeight: "700", color: Warm.text }}>GIALLO</Text>
          <Text style={{ fontSize: 10, color: Warm.textSoft }}>Attenzione</Text>
        </Pressable>

        <Pressable onPress={() => setSafety("red")} style={{ flex: 1, backgroundColor: safety === "red" ? Warm.red : "white", padding: 14, borderRadius: 12, alignItems: "center", borderWidth: 2, borderColor: safety === "red" ? Warm.red : Warm.border }}>
          <Text style={{ fontWeight: "700", color: safety === "red" ? "white" : Warm.text }}>ROSSO</Text>
          <Text style={{ fontSize: 10, color: safety === "red" ? "white" : Warm.textSoft }}>Non avvicinare</Text>
        </Pressable>
      </View>

      <Link href="/map" asChild>
        <Pressable style={{ marginTop: 32, backgroundColor: Warm.primary, padding: 16, borderRadius: 16, alignItems: "center" }}>
          <Text style={{ color: "white", fontWeight: "700" }}>Salva e inizia</Text>
        </Pressable>
      </Link>
    </View>
  );
}
