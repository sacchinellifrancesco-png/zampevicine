import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function VicinoPage() {
  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'900', marginTop:40}}>Vicino a te 📍</Text>
      <Text style={{color:'#666', marginTop:5}}>2 amici a meno di 2km da Marcianise</Text>

      <View style={{marginTop:20, backgroundColor:'white', borderRadius:20, padding:15, flexDirection:'row', shadowColor:'#000', shadowOpacity:0.05, shadowRadius:10}}>
        <View style={{width:80, height:80, backgroundColor:'#FFF0EB', borderRadius:20, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:40}}>🐶</Text></View>
        <View style={{marginLeft:15, flex:1}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={{fontSize:18, fontWeight:'800'}}>Hope</Text><Text style={{backgroundColor:'#E8FFF0', color:'#1FA971', paddingHorizontal:8, paddingVertical:2, borderRadius:10, fontSize:12, fontWeight:'700'}}>0.5 km</Text></View>
          <Text style={{color:'#666', marginTop:2}}>Metice • 2 anni • Femmina</Text>
          <Text style={{marginTop:6}}>🎾 Dolce, ama giocare</Text>
          <TouchableOpacity style={{marginTop:10, backgroundColor:'#FF6B4A', padding:10, borderRadius:10, alignItems:'center'}}><Text style={{color:'white', fontWeight:'700'}}>Chatta con il padrone</Text></TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop:15, backgroundColor:'white', borderRadius:20, padding:15, flexDirection:'row'}}>
        <View style={{width:80, height:80, backgroundColor:'#FFF0EB', borderRadius:20, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:40}}>🦮</Text></View>
        <View style={{marginLeft:15, flex:1}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={{fontSize:18, fontWeight:'800'}}>Luna</Text><Text style={{backgroundColor:'#E8FFF0', color:'#1FA971', paddingHorizontal:8, paddingVertical:2, borderRadius:10, fontSize:12, fontWeight:'700'}}>1.2 km</Text></View>
          <Text style={{color:'#666', marginTop:2}}>Labrador • 3 anni</Text>
          <Text style={{marginTop:6}}>💦 Adora l'acqua</Text>
          <TouchableOpacity style={{marginTop:10, backgroundColor:'white', padding:10, borderRadius:10, alignItems:'center', borderWidth:1, borderColor:'#FF6B4A'}}><Text style={{color:'#FF6B4A', fontWeight:'700'}}>Vedi profilo</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
