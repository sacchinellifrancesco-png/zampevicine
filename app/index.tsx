import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState('Marco');
  const [email, setEmail] = useState('marco@email.com');
  const [dogName, setDogName] = useState('');
  const [privacy, setPrivacy] = useState(true); // già spuntati per farti entrare!
  const [terms, setTerms] = useState(true);
  const [loc, setLoc] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se sei già iscritto entra subito
    if (Platform.OS === 'web') {
      const saved = localStorage.getItem('user');
      if (saved) { router.replace('/(tabs)'); return; }
    }
    setLoading(false);
  }, []);

  const iscriviti = async () => {
    if (!dogName || !nome) {
      Alert.alert('Manca qualcosa', 'Inserisci almeno il tuo nome e il nome del cane 🐶');
      return;
    }

    try {
      const user = { nome, email, dogName, date: new Date().toISOString() };
      if (Platform.OS === 'web') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('myDog', JSON.stringify({ name: dogName }));
      }
      // Vai alla mappa
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Errore', 'Riprova: ' + e);
    }
  };

  if (loading) return <View style={s.loading}><Text style={{fontWeight:'900', color:'#FF6B2B'}}>LeashLove 🐾</Text></View>;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50, paddingBottom: 40 }}>
        <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
        <Text style={s.title}>Benvenuto!</Text>
        <Text style={s.sub}>Inserisci i dati per entrare nella mappa</Text>

        <Text style={s.label}>Il tuo nome *</Text>
        <TextInput style={s.input} placeholder="Marco" value={nome} onChangeText={setNome} />

        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="marco@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" />

        <Text style={s.label}>Nome del cane * (obbligatorio)</Text>
        <TextInput style={s.input} placeholder="Es. Moka" value={dogName} onChangeText={setDogName} autoFocus />

        <View style={s.checks}>
          <Pressable style={s.checkRow} onPress={()=>setPrivacy(!privacy)}>
            <View style={[s.box, privacy && s.boxChecked]}><Text style={s.tick}>{privacy?'✓':''}</Text></View>
            <Text style={s.checkText}>Accetto Privacy *</Text>
          </Pressable>
          <Pressable style={s.checkRow} onPress={()=>setTerms(!terms)}>
            <View style={[s.box, terms && s.boxChecked]}><Text style={s.tick}>{terms?'✓':''}</Text></View>
            <Text style={s.checkText}>Accetto Termini *</Text>
          </Pressable>
          <Pressable style={s.checkRow} onPress={()=>setLoc(!loc)}>
            <View style={[s.box, loc && s.boxChecked]}><Text style={s.tick}>{loc?'✓':''}</Text></View>
            <Text style={s.checkText}>Acconsento posizione GPS *</Text>
          </Pressable>
        </View>

        <Pressable style={s.btn} onPress={iscriviti}>
          <Text style={s.btnText}>Entra in LeashLove 🧡 →</Text>
        </Pressable>

        <Pressable style={s.skipBtn} onPress={()=>router.replace('/(tabs)')}>
          <Text style={s.skipText}>Salta ed entra come ospite →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'}, loading:{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#FFFBF7'},
  logo:{fontSize:26, fontWeight:'900'}, title:{fontSize:26, fontWeight:'900', marginTop:12}, sub:{color:'#777', marginTop:4},
  label:{fontSize:12, fontWeight:'700', marginTop:14, marginBottom:6}, input:{backgroundColor:'white', borderRadius:12, padding:14, borderWidth:1, borderColor:'#FFE5D6', fontSize:15},
  checks:{marginTop:20, gap:10}, checkRow:{flexDirection:'row', gap:10, alignItems:'center'},
  box:{width:22, height:22, borderRadius:6, borderWidth:1.5, borderColor:'#FF6B2B', alignItems:'center', justifyContent:'center'},
  boxChecked:{backgroundColor:'#FF6B2B'}, tick:{color:'white', fontWeight:'900', fontSize:12},
  checkText:{fontSize:12, color:'#333'},
  btn:{backgroundColor:'#FF6B2B', borderRadius:20, padding:16, alignItems:'center', marginTop:24, elevation:4},
  btnText:{color:'white', fontWeight:'900', fontSize:16},
  skipBtn:{marginTop:12, padding:12, alignItems:'center'}, skipText:{color:'#999', fontWeight:'600', fontSize:13}
});
