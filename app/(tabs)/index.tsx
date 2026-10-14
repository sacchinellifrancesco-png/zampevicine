import { View, Text, ScrollView } from 'react-native';

export default function Home() {
  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'bold', marginTop:40}}>Vicino a te 🐾</Text>
      <Text style={{marginTop:10, color:'#666'}}>Ecco i cani vicino a Marcianise:</Text>

      <View style={{marginTop:20, backgroundColor:'white', padding:20, borderRadius:15}}>
        <Text style={{fontSize:20}}>🐕 Hope - 2 anni</Text>
        <Text style={{color:'#666', marginTop:5}}>Metodo dolce, giocherellona</Text>
        <Text style={{marginTop:5}}>📍 0.5 km da te</Text>
      </View>

      <View style={{marginTop:15, backgroundColor:'white', padding:20, borderRadius:15}}>
        <Text style={{fontSize:20}}>🐕 Luna - 3 anni</Text>
        <Text style={{color:'#666', marginTop:5}}>Calma, ama i bambini</Text>
        <Text style={{marginTop:5}}>📍 1.2 km da te</Text>
      </View>

      <View style={{marginTop:30, backgroundColor:'#FF6B4A', padding:15, borderRadius:10, alignItems:'center'}}>
        <Text style={{color:'white', fontWeight:'bold'}}>Questo è il codice vero! Funziona!</Text>
      </View>
    </ScrollView>
  );
}
