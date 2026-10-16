import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>CIAO TEST</Text>
      <Text>Se vedi questo, il sito funziona</Text>
    </View>
  );
}
