import { View, Text } from 'react-native';

export default function MyDog() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF0F5', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 60 }}>🐶</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF5A7A', marginTop: 10 }}>Il Mio Cane</Text>
      <Text style={{ marginTop: 10 }}>Funziona!</Text>
    </View>
  );
}
