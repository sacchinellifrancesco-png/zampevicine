import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfilePage() {
  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'bold', marginTop:40}}>Il tuo profilo</Text>
      
      {/* CARD PROFILO */}
      <View style={{marginTop:20, backgroundColor:'white', padding:25, borderRadius:20, alignItems:'center', borderWidth:1, borderColor:'#FFE0D6'}}>
        <View style={{width:80, height:80, backgroundColor:'#FF6B4A', borderRadius:40, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:40}}>👤</Text>
        </View>
        <Text style={{fontSize:22, fontWeight:'bold', marginTop:15}}>Francesco</Text>
        <Text style={{color:'#666', marginTop:5}}>Marcianise, CE</Text>
        <Text style={{color:'#666'}}>Membro da Ottobre 2024</Text>
      </View>

      {/* CARD CANE */}
      <View style={{marginTop:20, backgroundColor:'white', padding:20, borderRadius:15, borderWidth:1, borderColor:'#FFE0D6'}}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>Il mio cane 🐕</Text>
        <View style={{marginTop:15, flexDirection:'row', alignItems:'center'}}>
          <Text style={{fontSize:50}}>🐶</Text>
          <View style={{marginLeft:15}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Hope</Text>
            <Text style={{color:'#666'}}>Metice - 2 anni - Femmina</Text>
            <Text style={{color:'#666', marginTop:3}}>Dolce, giocherellona, educata</Text>
          </View>
        </View>
      </View>

      {/* STATISTICHE */}
      <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{backgroundColor:'white', padding:15, borderRadius:12, flex:1, marginRight:10, alignItems:'center'}}>
          <Text style={{fontSize:22, fontWeight:'bold'}}>12</Text>
          <Text style={{color:'#666', fontSize:12}}>Amici</Text>
        </View>
        <View style={{backgroundColor:'white', padding:15, borderRadius:12, flex:1, marginRight:10, alignItems:'center'}}>
          <Text style={{fontSize:22, fontWeight:'bold'}}>5</Text>
          <Text style={{color:'#666', fontSize:12}}>Passeggiate</Text>
        </View>
        <View style={{backgroundColor:'white', padding:15, borderRadius:12, flex:1, alignItems:'center'}}>
          <Text style={{fontSize:22, fontWeight:'bold'}}>28</Text>
          <Text style={{color:'#666', fontSize:12}}>Like</Text>
        </View>
      </View>

      <TouchableOpacity style={{marginTop:30, backgroundColor:'white', padding:18, borderRadius:12, borderWidth:1, borderColor:'#FF6B4A'}}>
        <Text style={{textAlign:'center', color:'#FF6B4A', fontWeight:'bold'}}>⚙️ Modifica profilo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:12, backgroundColor:'#FF6B4A', padding:18, borderRadius:12, alignItems:'center'}}>
        <Text style={{color:'white', fontWeight:'bold'}}>Esci</Text>
      </TouchableOpacity>

      <View style={{height:100}} />
    </ScrollView>
  );
}
