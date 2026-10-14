import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const PARKS = ['Tutti', 'Villa Borghese', 'Villa Ada', 'Villa Pamphili', 'Parco Acquedotti'];

const DOGS = [
  { id: '1', name: 'Hope', breed: 'Labrador', age: '2 anni', city: 'Terni', distance: '0.8 km', park: 'Villa Borghese', tag: 'Giocherellona' },
  { id: '2', name: 'Luna', breed: 'Beagle', age: '1 anno', city: 'Terni', distance: '1.2 km', park: 'Villa Ada', tag: 'Curiosa' },
  { id: '3', name: 'Rocky', breed: 'Bulldog', age: '3 anni', city: 'Terni', distance: '1.5 km', park: 'Villa Pamphili', tag: 'Tranquillo' },
  { id: '4', name: 'Bella', breed: 'Barboncino', age: '2 anni', city: 'Terni', distance: '2.1 km', park: 'Parco Acquedotti', tag: 'Socievole' },
];

export default function VicinoATe() {
  const router = useRouter();
  const [filter, setFilter] = useState('Tutti');
  const filtered = filter === 'Tutti' ? DOGS : DOGS.filter(d => d.park === filter);

  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5', paddingTop:60}}>
      <View style={{paddingHorizontal:20}}>
        <Text style={{fontSize:26, fontWeight:'900', color:'#111'}}>Vicino a Terni</Text>
        <Text style={{marginTop:4, color:'#8E8E8E', fontSize:13}}>Passeggiate organizzate ai parchi di Roma</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:16, marginRight:-20}}>
          {PARKS.map(p => (
            <TouchableOpacity key={p} onPress={()=>setFilter(p)} style={{
              backgroundColor: filter===p ? '#FF0E6B' : '#fff',
              borderColor: filter===p ? '#FF0E6B' : '#FFD6E5',
              borderWidth:1.2, paddingHorizontal:16, paddingVertical:8,
              borderRadius:20, marginRight:10
            }}>
              <Text style={{color: filter===p ? '#fff' : '#FF0E6B', fontWeight:'600', fontSize:13}}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{marginTop:20, paddingHorizontal:20}}>
        {filtered.map(dog => (
          <TouchableOpacity key={dog.id} onPress={()=>router.push(`/dog-detail?id=${dog.id}`)} style={{
            backgroundColor:'#fff', borderRadius:22, padding:16, marginBottom:14,
            flexDirection:'row', alignItems:'center',
            shadowColor:'#000', shadowOpacity:0.05, shadowRadius:10
          }}>
            <View style={{width:56, height:56, backgroundColor:'#FFF1E8', borderRadius:28, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:28}}>🐶</Text>
            </View>
            <View style={{marginLeft:14, flex:1}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontWeight:'800', fontSize:16, color:'#111'}}>{dog.name} • {dog.age}</Text>
                <Text style={{color:'#FF0E6B', fontSize:12, fontWeight:'700'}}>{dog.distance}</Text>
              </View>
              <Text style={{color:'#8E8E8E', fontSize:13, marginTop:2}}>{dog.breed} • {dog.city} • {dog.park}</Text>
              <View style={{marginTop:6, backgroundColor:'#FFF1E8', alignSelf:'flex-start', paddingHorizontal:10, paddingVertical:4, borderRadius:12}}>
                <Text style={{color:'#FF0E6B', fontSize:11, fontWeight:'600'}}>{dog.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height:100}}/>
      </ScrollView>
    </View>
  );
}
