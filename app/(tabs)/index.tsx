import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const PARKS = ['Tutti', 'Villa Borghese', 'Villa Ada', 'Villa Pamphili', 'Parco Acquedotti'];

const DOGS = [
  { id: '1', name: 'Hope', breed: 'Labrador', age: '2 anni', city: 'Terni', distance: '0.8 km', park: 'Villa Borghese', tag: 'Giocherellona', lat: 41.9142, lng: 12.4922 },
  { id: '2', name: 'Luna', breed: 'Beagle', age: '1 anno', city: 'Terni', distance: '1.2 km', park: 'Villa Ada', tag: 'Curiosa', lat: 41.9327, lng: 12.5019 },
  { id: '3', name: 'Rocky', breed: 'Bulldog', age: '3 anni', city: 'Terni', distance: '1.5 km', park: 'Villa Pamphili', tag: 'Tranquillo', lat: 41.8842, lng: 12.4496 },
  { id: '4', name: 'Bella', breed: 'Barboncino', age: '2 anni', city: 'Terni', distance: '2.1 km', park: 'Parco Acquedotti', tag: 'Socievole', lat: 41.8487, lng: 12.5586 },
];

export default function VicinoATe() {
  const router = useRouter();
  const [filter, setFilter] = useState('Tutti');
  const filtered = filter === 'Tutti' ? DOGS : DOGS.filter(d => d.park === filter);

  return (
    <View style={{flex:1, backgroundColor:'#FFFBF5'}}>
      {/* MAPPA SOPRA */}
      <View style={{height: 280, marginTop: 50, marginHorizontal: 20, borderRadius: 24, overflow: 'hidden'}}>
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: 41.90,
            longitude: 12.50,
            latitudeDelta: 0.18,
            longitudeDelta: 0.18,
          }}
        >
          {filtered.map(dog => (
            <Marker
              key={dog.id}
              coordinate={{latitude: dog.lat, longitude: dog.lng}}
              title={`${dog.name} - ${dog.city}`}
              description={`${dog.park} • ${dog.tag}`}
              pinColor="#FF0E6B"
            />
          ))}
        </MapView>
      </View>

      <View style={{paddingHorizontal:20, paddingTop:16}}>
        <Text style={{fontSize:22, fontWeight:'900', color:'#111'}}>Vicino a Terni</Text>
        <Text style={{marginTop:2, color:'#8E8E8E', fontSize:12}}>Mappa cani • Parchi di Roma</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:12, marginRight:-20}}>
          {PARKS.map(p => (
            <TouchableOpacity key={p} onPress={()=>setFilter(p)} style={{
              backgroundColor: filter===p ? '#FF0E6B' : '#fff',
              borderColor: filter===p ? '#FF0E6B' : '#FFD6E5',
              borderWidth:1.2, paddingHorizontal:14, paddingVertical:7,
              borderRadius:20, marginRight:8
            }}>
              <Text style={{color: filter===p ? '#fff' : '#FF0E6B', fontWeight:'600', fontSize:12}}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{marginTop:14, paddingHorizontal:20}}>
        {filtered.map(dog => (
          <TouchableOpacity key={dog.id} onPress={()=>router.push(`/dog-detail?id=${dog.id}`)} style={{
            backgroundColor:'#fff', borderRadius:22, padding:14, marginBottom:12,
            flexDirection:'row', alignItems:'center',
            shadowColor:'#000', shadowOpacity:0.05, shadowRadius:10
          }}>
            <View style={{width:52, height:52, backgroundColor:'#FFF1E8', borderRadius:26, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:26}}>🐶</Text>
            </View>
            <View style={{marginLeft:12, flex:1}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontWeight:'800', fontSize:15, color:'#111'}}>{dog.name} • {dog.age}</Text>
                <Text style={{color:'#FF0E6B', fontSize:11, fontWeight:'700'}}>{dog.distance}</Text>
              </View>
              <Text style={{color:'#8E8E8E', fontSize:12, marginTop:2}}>{dog.breed} • {dog.city} • {dog.park}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height:100}}/>
      </ScrollView>
    </View>
  );
}
