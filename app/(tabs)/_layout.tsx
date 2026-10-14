import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FF6B4A',
      tabBarStyle: { backgroundColor: 'white', height: 80, paddingTop: 10 }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Vicino',
          tabBarIcon: () => <Text>📍</Text>
        }} 
      />
      <Tabs.Screen 
        name="dog" 
        options={{ 
          title: 'Cani',
          tabBarIcon: () => <Text>🐶</Text>
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profilo',
          tabBarIcon: () => <Text>👤</Text>
        }} 
      />
    </Tabs>
  );
}
