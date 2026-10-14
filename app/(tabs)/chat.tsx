import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function ChatPage() {
  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'bold', marginTop:40}}>Chat 💬</Text>
      <Text style={{color:'#666', marginTop:5}}>Parla con i padroni vicino a te</Text>

      <TouchableOpacity style={{marginTop:20, backgroundColor:'white', padding:18, borderRadius:15, flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#FFE0D6'}}>
        <View style={{width:50, height:50, backgroundColor:'#FFE0D6', borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:25}}>🐶</Text>
        </View>
        <View style={{marginLeft:15, flex:1}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Sara e Bella</Text>
          <Text style={{color:'#666', marginTop:2}}>Ciao! Andiamo al parco oggi?</Text>
        </View>
        <Text style={{color:'#999'}}>10:42</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:12, backgroundColor:'white', padding:18, borderRadius:15, flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#FFE0D6'}}>
        <View style={{width:50, height:50, backgroundColor:'#FFE0D6', borderRadius:25, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:25}}>🐕</Text>
        </View>
        <View style={{marginLeft:15, flex:1}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Marco e Rocky</Text>
          <Text style={{color:'#666', marginTop:2}}>Hope vuole giocare! 🦴</Text>
        </View>
        <Text style={{color:'#999'}}>Ieri</Text>
      </TouchableOpacity>

      <View style={{height:100}} />
    </ScrollView>
  );
}
