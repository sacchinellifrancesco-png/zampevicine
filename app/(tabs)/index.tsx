import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NEARBY = [
  { id: '1', name: 'Moka', dist: '0,3 km', place: 'Villa Borghese', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200', dLat: 0.002, dLon: 0.001 },
  { id: '2', name: 'Toby', dist: '0,6 km', place: 'Pincio', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200', dLat: -0.0015, dLon: 0.002 },
  { id: '3', name: 'Luna', dist: '0,9 km', place: 'Flaminio', img: 'https://images.unsplash.com/photo-1583512603805-3cc6b8f48ebb?w=200', dLat: 0.001, dLon: -0.0025 },
];

function GoogleMapView({ lat, lon }: { lat: number, lon: number }) {
  const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed&hl=it`;
  if (Platform.OS === 'web') {
    // @ts-ignore - iframe funziona solo su web
    return React.createElement('iframe', {
      src: url,
      style: { width: '100%', height: '100%', border: 0, display: 'block' } as any,
      loading: 'lazy',
      referrerPolicy: 'no-referrer-when-downgrade',
      allowFullScreen: true,
    });
  }
  return <View style={{ flex: 1, backgroundColor: '#E8F1E6', alignItems: 'center', justifyContent: 'center' }}><Text>🗺️ Mappa</Text></View>;
}

export default function Esplora() {
  const router = useRouter();
  const [filter, setFilter] = useState('1,5 km');
  const [isOut, setIsOut] = useState(false);
  const [seconds, setSeconds] = useState(3600);
  const [myDogName, setMyDogName] = useState('Rocky');
  const [loc, setLoc] = useState({ lat: 41.9142, lon: 12.4922, loading: true, city: 'Roma, Lazio' });
  const filters = ['500 m', '1,5 km', '5 km', 'Città · 10 km'];

  useEffect(() => {
    AsyncStorage.getItem('myDog').then(v=>{ if(v){ try{ const d=JSON.parse(v); if(d.name) setMyDogName(d.name);}catch{}}});
    if (Platform.OS === 'web' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude, loading: false, city: 'Vicino a te 📍' }),
        () => setLoc(l => ({...l, loading: false})),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else setLoc(l => ({...l, loading:false}));
  }, []);

  useEffect(() => {
    if (!isOut) return;
    const t = setInterval(() => setSeconds(s=>{ if(s<=1){ setIsOut(false); return 3600;} return s-1;}),1000);
    return ()=>clearInterval(t);
  }, [isOut]);

  const fmt = (s:number)=> `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={s.header}>
          <View>
            <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
            <Text style={s.subHeader}>Incontra cani e padroni vicino a te</Text>
          </View>
          <Image source={{uri:'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100'}} style={s.avatar}/>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={s.title}>Vicino a te</Text>
          <View style={{flexDirection:'row', alignItems:'center', gap:6, marginTop:6}}>
            <Text>📍</Text><Text style={s.location}>{loc.loading? 'Localizzo...' : loc.city}</Text>
            <Pressable onPress={()=>{ if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>setLoc({lat:p.coords.latitude, lon:p.coords.longitude, loading:false, city:'Vicino a te 📍'}))}}>
              <Text style={s.demo}>Usa GPS</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:20, gap:8, marginTop:14}}>
          {filters.map(f=>(
            <Pressable key={f} onPress={()=>setFilter(f)} style={[s.filter, filter===f && s.filterActive]}>
              <Text style={[s.filterText, filter===f && s.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* GOOGLE MAPS VERA */}
        <View style={s.map}>
          <View style={s.mapInner}>
            <GoogleMapView lat={loc.lat} lon={loc.lon} />
          </View>

          <View style={s.badgeSpasso}><View style={s.greenDot}/><Text style={s.badgeText}>{isOut? NEARBY.length+1 : NEARBY.length} cani a spasso</Text></View>

          {/* Marker cani intorno a te */}
          {NEARBY.map(dog => {
            const x = 50 + dog.dLon * 2500;
            const y = 50 - dog.dLat * 2500;
            return (
              <Pressable key={dog.id} style={[s.marker, { left: `${x}%`, top: `${y}%` }]} onPress={()=>router.push(`/dog/${dog.id}`)}>
                <Image source={{uri: dog.img}} style={s.markerImg}/>
                <Text style={s.markerLabel}>{dog.name}</Text>
              </Pressable>
            );
          })}

          {/* TU */}
          <View style={[s.marker, { left: '50%', top: '50%' }]}>
            {isOut? (
              <>
                <View style={[s.markerActive, { borderColor: '#1F3D2B', backgroundColor: '#1F3D2B' }]}><Text style={{fontSize:20}}>🐶</Text></View>
                <View style={s.myBadge}><Text style={s.myBadgeText}>TU • {myDogName}</Text></View>
              </>
            ) : (
              <>
                <View style={s.youDot}><View style={s.youInner}/></View>
                <Text style={s.youLabel}>Tu sei qui</Text>
              </>
            )}
          </View>
        </View>

        <View style={s.cardWrap}>
          <Pressable style={s.card} onPress={()=>router.push('/dog/1')}>
            <Image source={{uri: NEARBY[0].img}} style={s.cardImg}/>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={s.cardName}>Moka</Text><Text style={{color:'#999', fontSize:20}}>›</Text></View>
              <Text style={s.cardBreed}>Golden Retriever · 3 anni</Text>
              <View style={{flexDirection:'row', gap:4, marginTop:4}}><Text style={{fontSize:12}}>📍</Text><Text style={s.cardDist}>{NEARBY[0].dist} · {NEARBY[0].place}</Text></View>
              <View style={{flexDirection:'row', gap:8, marginTop:8}}><View style={s.tagGreen}><Text style={s.tagGreenText}>Giocoso</Text></View><Text style={s.ownerText}>di Giulia</Text></View>
            </View>
          </Pressable>
        </View>

        <View style={{paddingHorizontal:20, marginTop:14}}>
          <Pressable style={[s.orangeBtn, isOut && s.greenBtn]} onPress={()=>{ setIsOut(!isOut); setSeconds(3600); }}>
            <Text style={s.orangeBtnTitle}>{isOut? `✅ Sei fuori! ${fmt(seconds)}` : 'Sto uscendo ora'}</Text>
            <Text style={s.orangeBtnSub}>{isOut? 'Tocca per tornare a casa 🏠' : '- visibile 60 min 🐾'}</Text>
          </Pressable>
          <Pressable style={{marginTop:10, alignItems:'center'}} onPress={()=>{ if(Platform.OS==='web') window.open(`https://www.google.com/maps/search/cani/@${loc.lat},${loc.lon},15z`,'_blank')}}>
            <Text style={{color:'#007AFF', fontSize:13, fontWeight:'600'}}>Apri in Google Maps ↗</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'},
  header:{paddingTop:60, paddingHorizontal:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'},
  logo:{fontSize:22, fontWeight:'900'},
  subHeader:{fontSize:12, color:'#777', marginTop:2},
  avatar:{width:36, height:36, borderRadius:18},
  title:{fontSize:32, fontWeight:'900', color:'#111'},
  location:{fontWeight:'600'},
  demo:{fontSize:11, color:'#FF6B2B', backgroundColor:'#FFF0E0', paddingHorizontal:8, paddingVertical:3, borderRadius:8, fontWeight:'700'},
  filter:{paddingHorizontal:16, paddingVertical:8, borderRadius:20, backgroundColor:'white', borderWidth:1, borderColor:'#E5E5E5'},
  filterActive:{backgroundColor:'#1F3D2B', borderColor:'#1F3D2B'},
  filterText:{fontSize:13, fontWeight:'600', color:'#555'},
  filterTextActive:{color:'white'},
  map:{height:380, marginTop:16, marginHorizontal:12, borderRadius:20, overflow:'hidden', backgroundColor:'#E8F1E6', borderWidth:1, borderColor:'#DDD'},
  mapInner:{...StyleSheet.absoluteFillObject},
  badgeSpasso:{position:'absolute', top:12, left:12, backgroundColor:'white', borderRadius:20, paddingHorizontal:12, paddingVertical:6, flexDirection:'row', gap:6, alignItems:'center', elevation:3, zIndex:10},
  greenDot:{width:8, height:8, borderRadius:4, backgroundColor:'#2E7D32'},
  badgeText:{fontSize:12, fontWeight:'700'},
  marker:{position:'absolute', alignItems:'center', zIndex:20, transform:[{translateX:-19},{translateY:-19}]},
  markerImg:{width:38, height:38, borderRadius:19, borderWidth:2, borderColor:'white'},
  markerActive:{width:50, height:50, borderRadius:25, borderWidth:3, borderColor:'#FF6B2B', backgroundColor:'white', alignItems:'center', justifyContent:'center'},
  markerLabel:{marginTop:3, fontSize:10, fontWeight:'700', backgroundColor:'white', paddingHorizontal:5, paddingVertical:2, borderRadius:6},
  myBadge:{marginTop:4, backgroundColor:'#1F3D2B', paddingHorizontal:6, paddingVertical:2, borderRadius:8},
  myBadgeText:{color:'white', fontSize:9, fontWeight:'800'},
  youDot:{width:20, height:20, borderRadius:10, backgroundColor:'rgba(0,122,255,0.25)', alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:'white'},
  youInner:{width:10, height:10, borderRadius:5, backgroundColor:'#007AFF'},
  youLabel:{marginTop:4, fontSize:10, fontWeight:'700', backgroundColor:'#007AFF', color:'white', paddingHorizontal:6, paddingVertical:2, borderRadius:8},
  cardWrap:{marginTop:-30, paddingHorizontal:20, zIndex:20},
  card:{backgroundColor:'white', borderRadius:20, padding:12, flexDirection:'row', gap:12, elevation:6},
  cardImg:{width:80, height:80, borderRadius:16},
  cardName:{fontSize:22, fontWeight:'900'},
  cardBreed:{fontSize:13, color:'#777'},
  cardDist:{fontSize:12, color:'#2E7D32', fontWeight:'600'},
  tagGreen:{backgroundColor:'#E8F5E9', paddingHorizontal:8, paddingVertical:3, borderRadius:10},
  tagGreenText:{fontSize:11, color:'#2E7D32', fontWeight:'600'},
  ownerText:{fontSize:12, color:'#777'},
  orangeBtn:{backgroundColor:'#FF6B2B', borderRadius:20, paddingVertical:14, alignItems:'center', elevation:4},
  greenBtn:{backgroundColor:'#1F3D2B'},
  orangeBtnTitle:{color:'white', fontWeight:'900', fontSize:16},
  orangeBtnSub:{color:'white', fontWeight:'700', fontSize:14, marginTop:2},
});
