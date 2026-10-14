import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function DogPage() {
  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'bold', marginTop:40}}>Tutti i cani 🐕</Text>
      <Text style={{marginTop:10, color:'#666'}}>Scegli un amico per Hope</Text>

      <View style={{marginTop:20, backgroundColor:'white', padding:20, borderRadius:15, borderWidth:1, borderColor:'#FFE0D6'}}>
        <Text style={{fontSize:22, fontWeight:'bold'}}>🐶 Rocky</Text>
        <Text style={{marginTop:5}}>Pastore Tedesco - 4 anni</Text>
        <Text style={{marginTop:5, color:'#666'}}>Energico, ama correre. Padrone: Marco</Text>
        <TouchableOpacity style={{marginTop:15, backgroundColor:'#FF6B4A', padding:12, borderRadius:10, alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'bold'}}>Vedi profilo</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop:15, backgroundColor:'white', padding:20, borderRadius:15, borderWidth:1, borderColor:'#FFE0D6'}}>
        <Text style={{fontSize:22, fontWeight:'bold'}}>🐶 Bella</Text>
        <Text style={{marginTop:5}}>Labrador - 2 anni</Text>
        <Text style={{marginTop:5, color:'#666'}}>Dolce, adora l'acqua. Padrone: Sara</Text>
        <TouchableOpacity style={{marginTop:15, backgroundColor:'#FF6B4A', padding:12, borderRadius:10, alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'bold'}}>Vedi profilo</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop:15, backgroundColor:'white', padding:20, borderRadius:15, borderWidth:1, borderColor:'#FFE0D6'}}>
        <Text style={{fontSize:22, fontWeight:'bold'}}>🐶 Max</Text>
        <Text style={{marginTop:5}}>Beagle - 3 anni</Text>
        <Text style={{marginTop:5, color:'#666'}}>Curioso e giocherellone. Padrone: Luca</Text>
        <TouchableOpacity style={{marginTop:15, backgroundColor:'#FF6B4A', padding:12, borderRadius:10, alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'bold'}}>Vedi profilo</Text>
        </TouchableOpacity>
      </View>

      <View style={{height:100}} />
    </ScrollView>
  );
}
