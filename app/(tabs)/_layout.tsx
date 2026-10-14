import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarStyle: { height: 60 },
      }}
    >
      {/* HOME - Vicino a te - quella che vedi già */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Vicino a te',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />

      {/* PAGINA CANE - prima dava errore, ora c'è */}
      <Tabs.Screen
        name="dog"
        options={{
          title: 'Il mio cane',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size} color={color} />
          ),
        }}
      />

      {/* PAGINA CHAT - prima dava errore, ora c'è */}
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />

      {/* PROFILO - se ce l'hai già lascialo, altrimenti togli questo blocco */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
