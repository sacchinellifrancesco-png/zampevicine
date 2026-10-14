import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const CHATS = [
  { id: '1', dog: 'Hope', owner: 'Marco • Terni', last: 'Ci vediamo domani a Villa Borghese?', time: '10:42', park: 'Villa Borghese', unread: 2 },
  { id: '2', dog: 'Luna', owner: 'Giulia • Terni', last: 'Luna è super socievole!', time: 'Ieri', park: 'Villa Ada', unread: 0 },
  { id: '3', dog: 'Rocky', owner: 'Francesco • Terni', last: 'Porto anche la palla 🎾', time: 'Ieri', park: 'Villa Pamphili', unread: 1 },
  { id: '4', dog: 'Bella', owner: 'Sara • Terni', last: 'Perfetto per le 18:00 al laghetto', time: 'Lun', park: 'Parco Acquedotti', unread: 0 },
];

export default function ChatList() {
  const router = useRouter();
  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5', paddingTop:60}}>
      <View style={{paddingHorizontal:20, paddingBottom:16}}>
        <Text style={{fontSize:26, fontWeight:'900', color:'#111'}}>Messaggi</Text>
        <Text style={{marginTop:4, color:'#8E8E8E', fontSize:13}}>Padroni vicino a Terni • Parchi di Roma</Text>
      </View>

      <ScrollView style={{paddingHorizontal:20}}>
        {CHATS.map(c => (
          <TouchableOpacity key={c.id} onPress={()=>router.push(`/chat-detail?id=${c.id}`)} style={{
            backgroundColor:'#fff', borderRadius:22, padding:14, marginBottom:12,
            flexDirection:'row', alignItems:'center',
            shadowColor:'#000', shadowOpacity:0.05, shadowRadius:8
          }}>
            <View style={{width:52, height:52, backgroundColor:'#FFF1E8', borderRadius:26, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:24}}>🐾</Text>
            </View>
            <View style={{marginLeft:12, flex:1}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontWeight:'800', fontSize:15, color:'#111'}}>{c.dog} • {c.owner}</Text>
                <Text style={{color:'#8E8E8E', fontSize:11}}>{c.time}</Text>
              </View>
              <Text numberOfLines={1} style={{color:'#6B6B6B', fontSize:13, marginTop:3}}>{c.last}</Text>
              <View style={{flexDirection:'row', marginTop:6, gap:8}}>
                <View style={{backgroundColor:'#FFF1E8', paddingHorizontal:8, paddingVertical:3, borderRadius:10}}>
                  <Text style={{color:'#FF0E6B', fontSize:10, fontWeight:'600'}}>{c.park}</Text>
                </View>
                {c.unread > 0 && (
                  <View style={{backgroundColor:'#FF0E6B', width:20, height:20, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'#fff', fontSize:10, fontWeight:'800'}}>{c.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height:100}}/>
      </ScrollView>
    </View>
  );
}
