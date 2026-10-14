import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const CHAT_INFO: any = {
  '1': { dog: 'Hope', owner: 'Marco', city: 'Terni', park: 'Villa Borghese' },
  '2': { dog: 'Luna', owner: 'Giulia', city: 'Terni', park: 'Villa Ada' },
  '3': { dog: 'Rocky', owner: 'Francesco', city: 'Terni', park: 'Villa Pamphili' },
  '4': { dog: 'Bella', owner: 'Sara', city: 'Terni', park: 'Parco Acquedotti' },
};

const MESSAGES = [
  { from: 'them', text: 'Ciao! Siamo a Terni anche noi, andiamo spesso a Roma nei weekend!' },
  { from: 'me', text: 'Fantastico! Hope adora Villa Borghese 🐾' },
  { from: 'them', text: 'Ci vediamo domani alle 18:00 al laghetto?' },
  { from: 'me', text: 'Perfetto, porto la palla! 🎾' },
];

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const info = CHAT_INFO[id as string] || CHAT_INFO['1'];

  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5', paddingTop:50}}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingBottom:12, backgroundColor:'#fff'}}>
        <TouchableOpacity onPress={()=>router.back()} style={{width:36, height:36, backgroundColor:'#FFFBF5', borderRadius:18, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:18}}>‹</Text>
        </TouchableOpacity>
        <View style={{marginLeft:12}}>
          <Text style={{fontWeight:'800', fontSize:16}}>{info.dog} • {info.owner}</Text>
          <Text style={{color:'#FF0E6B', fontSize:11, fontWeight:'600'}}>{info.city} • {info.park}</Text>
        </View>
      </View>

      <ScrollView style={{flex:1, paddingHorizontal:16, paddingTop:16}}>
        <View style={{alignSelf:'center', backgroundColor:'#FFF1E8', paddingHorizontal:12, paddingVertical:6, borderRadius:14, marginBottom:16}}>
          <Text style={{color:'#8E8E8E', fontSize:11}}>Passeggiata proposta: {info.park} - Domani 18:00</Text>
        </View>
        {MESSAGES.map((m,i)=>(
          <View key={i} style={{
            alignSelf: m.from==='me' ? 'flex-end' : 'flex-start',
            backgroundColor: m.from==='me' ? '#FF0E6B' : '#fff',
            padding:12, borderRadius:18, borderBottomRightRadius: m.from==='me' ? 4 : 18,
            borderBottomLeftRadius: m.from==='me' ? 18 : 4,
            marginBottom:10, maxWidth:'80%'
          }}>
            <Text style={{color: m.from==='me' ? '#fff' : '#222', fontSize:14}}>{m.text}</Text>
          </View>
        ))}
        <View style={{height:20}}/>
      </ScrollView>

      <View style={{backgroundColor:'#fff', padding:12, paddingHorizontal:16, flexDirection:'row', gap:10, paddingBottom:30}}>
        <View style={{flex:1, backgroundColor:'#FFFBF5', height:44, borderRadius:22, justifyContent:'center', paddingHorizontal:16}}>
          <Text style={{color:'#AAA'}}>Scrivi un messaggio...</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:'#FF0E6B', width:44, height:44, borderRadius:22, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'#fff', fontWeight:'800'}}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
