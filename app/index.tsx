import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5', paddingHorizontal:24, paddingBottom:30}}>
      {/* Centro */}
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <View style={{
          width:96, height:96, backgroundColor:'#FFF1E8', borderRadius:26,
          alignItems:'center', justifyContent:'center',
          shadowColor:'#000', shadowOpacity:0.06, shadowRadius:12
        }}>
          <Text style={{fontSize:42}}>🐾</Text>
        </View>
        <Text style={{marginTop:22, fontSize:30, fontWeight:'900', letterSpacing:2.5, color:'#111'}}>LEASHLOVE</Text>
        <Text style={{marginTop:8, color:'#8E8E8E', fontSize:14}}>Dove ogni coda trova un amico</Text>
      </View>

      {/* Bottoni */}
      <TouchableOpacity onPress={()=>router.replace('/(tabs)')} style={{backgroundColor:'#FF0E6B', height:56, borderRadius:28, alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#fff', fontWeight:'700', fontSize:17}}>Iscriviti</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.replace('/(tabs)')} style={{marginTop:12, height:56, borderRadius:28, borderWidth:1.5, borderColor:'#FF0E6B', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
        <Text style={{color:'#FF0E6B', fontWeight:'700', fontSize:17}}>Entra</Text>
      </TouchableOpacity>
    </View>
  )
}
