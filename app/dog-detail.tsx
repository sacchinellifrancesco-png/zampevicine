import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DOGS: any = {
  '1': { name: 'Hope', breed: 'Labrador', age: '2 anni', city: 'Terni', park: 'Villa Borghese', tag: 'Giocherellona', owner: 'Marco', desc: 'Hope adora correre e giocare con la palla. Cerca amici per passeggiate mattutine.' },
  '2': { name: 'Luna', breed: 'Beagle', age: '1 anno', city: 'Terni', park: 'Villa Ada', tag: 'Curiosa', owner: 'Giulia', desc: 'Curiosa e dolcissima, ama annusare tutto. Perfetta per lunghe passeggiate.' },
  '3': { name: 'Rocky', breed: 'Bulldog', age: '3 anni', city: 'Terni', park: 'Villa Pamphili', tag: 'Tranquillo', owner: 'Francesco', desc: 'Tranquillo e coccolone, ideale per parco e relax.' },
  '4': { name: 'Bella', breed: 'Barboncino', age: '2 anni', city: 'Terni', park: 'Parco Acquedotti', tag: 'Socievole', owner: 'Sara', desc: 'Socievole con tutti, cani e umani. Ama il laghetto.' },
};

export default function DogDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dog = DOGS[id as string] || DOGS['1'];

  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5', paddingTop:50}}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:20, paddingBottom:12}}>
        <TouchableOpacity onPress={()=>router.back()} style={{width:36, height:36, backgroundColor:'#fff', borderRadius:18, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:18}}>‹</Text>
        </TouchableOpacity>
        <Text style={{marginLeft:12, fontWeight:'800', fontSize:16}}>{dog.name} di {dog.city}</Text>
      </View>

      <ScrollView style={{paddingHorizontal:20}}>
        <View style={{backgroundColor:'#fff', borderRadius:28, padding:20, alignItems:'center', marginTop:10}}>
          <View style={{width:90, height:90, backgroundColor:'#FFF1E8', borderRadius:45, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:46}}>🐶</Text>
          </View>
          <Text style={{marginTop:14, fontSize:26, fontWeight:'900', color:'#111'}}>{dog.name} • {dog.age}</Text>
          <Text style={{marginTop:4, color:'#8E8E8E'}}>{dog.breed} • {dog.city} • {dog.park}</Text>
          <View style={{marginTop:12, backgroundColor:'#FFF1E8', paddingHorizontal:14, paddingVertical:6, borderRadius:14}}>
            <Text style={{color:'#FF0E6B', fontWeight:'700', fontSize:12}}>{dog.tag} • Padrone: {dog.owner}</Text>
          </View>
        </View>

        <View style={{backgroundColor:'#fff', borderRadius:22, padding:16, marginTop:16}}>
          <Text style={{fontWeight:'800', fontSize:14, color:'#111'}}>Su {dog.name}</Text>
          <Text style={{marginTop:8, color:'#6B6B6B', lineHeight:20, fontSize:14}}>{dog.desc} Base a Terni, passeggiamo spesso ai parchi di Roma: {dog.park}.</Text>
        </View>

        <TouchableOpacity onPress={()=>router.push(`/chat-detail?id=${id}`)} style={{marginTop:16, backgroundColor:'#FF0E6B', height:56, borderRadius:28, alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Chatta con {dog.owner}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push(`/chat-detail?id=${id}`)} style={{marginTop:12, backgroundColor:'#fff', height:56, borderRadius:28, borderWidth:1.5, borderColor:'#FF0E6B', alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'#FF0E6B', fontWeight:'800', fontSize:16}}>Proponi passeggiata a {dog.park}</Text>
        </TouchableOpacity>

        <View style={{height:100}}/>
      </ScrollView>
    </View>
  );
}
