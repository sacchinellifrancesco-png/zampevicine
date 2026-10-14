import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#FF6B4A', tabBarStyle:{backgroundColor:'white', height:75, paddingTop:8} }}>
      <Tabs.Screen name="index" options={{ title: 'Vicino', tabBarIcon: () => <Text>📍</Text> }} />
      <Tabs.Screen name="dog" options={{ title: 'Cani', tabBarIcon: () => <Text>🐶</Text> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: () => <Text>💬</Text> }} />
    </Tabs>
  );
}
