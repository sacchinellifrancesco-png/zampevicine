import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');

  useEffect(()=>{
    if(Platform.OS==='web'){
      const raw = localStorage.getItem('user');
      if(raw){
        try{
          const u = JSON.parse(raw);
          setNome(u.nome || '');
          setEmail(u.email || '');
          setDogName(u.dogName || '');
          const md = localStorage.getItem('myDog');
          if(md){ const d = JSON.parse(md); setDogBreed(d.breed || ''); }
        }catch{}
      }
    }
  },[]);

  const salva = () => {
    if(!nome || !dogName) return Alert.alert('Manca nome');
    if(Platform.OS==='web'){
      const raw = localStorage.getItem('user');
      const old = raw? JSON.parse(raw) : {};
      const nuovo = { ...old, nome, email, dogName };
      localStorage.setItem('user', JSON.stringify(nuovo));
      localStorage.setItem('myDog', JSON.stringify({ name: dogName, breed: dogBreed || 'Metincio' }));
    }
    Alert.alert('Salvato ✅', `Ora sei ${nome} con ${dogName}`);
    router.replace('/(tabs)');
  };

  const logout = () => {
    if(Platform.OS==='web'){
      if(confirm('Vuoi uscire e cancellare i dati? Poi puoi re-iscriverti da zero.')){
        localStorage.clear();
        router.replace('/');
      }
    }
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{padding:20, paddingTop:60, paddingBottom:40}}>
        <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
        <Text style={s.title}>Modifica profilo</Text>
        <Text style={s.sub}>Art.16 GDPR - Diritto di rettifica</Text>

        <Text style={s.label}>Nome e Cognome *</Text>
        <TextInput style={s.input} value={nome} onChangeText={setNome} placeholder="Marco Rossi" />

        <Text style={s.label}>Email *</Text>
        <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="marco@email.com" autoCapitalize="none" />

        <Text style={s.label}>Nome cane *</Text>
        <TextInput style={s.input} value={dogName} onChangeText={setDogName} placeholder="Moka" />

        <Text style={s.label}>Razza</Text>
        <TextInput style={s.input} value={dogBreed} onChangeText={setDogBreed} placeholder="Golden Retriever" />

        <Pressable style={s.btn} onPress={salva}><Text style={s.btnText}>Salva modifiche ✅</Text></Pressable>

        <Pressable style={s.btn2} onPress={()=>router.push('/gestione-consensi')}><Text style={s.btn2Text}>🍪 Gestisci Consensi GDPR</Text></Pressable>

        <Pressable style={s.btnOut} onPress={logout}><Text style={s.btnOutText}>Esci e cancella dati (oblio) 🗑️</Text></Pressable>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'},
  logo:{fontSize:22, fontWeight:'900'}, title:{fontSize:24, fontWeight:'900', marginTop:10}, sub:{fontSize:11, color:'#777', marginTop:2},
  label:{fontSize:12, fontWeight:'700', marginTop:16, marginBottom:6}, input:{backgroundColor:'white', borderRadius:12, padding:14, borderWidth:1, borderColor:'#FFE5D6', fontSize:15},
  btn:{backgroundColor:'#FF6B2B', borderRadius:20, padding:16, alignItems:'center', marginTop:22},
  btnText:{color:'white', fontWeight:'900', fontSize:15},
  btn2:{backgroundColor:'white', borderRadius:20, padding:14, alignItems:'center', marginTop:12, borderWidth:1, borderColor:'#FFE5D6'},
  btn2Text:{fontWeight:'700', color:'#333'},
  btnOut:{backgroundColor:'#FFF0F0', borderRadius:20, padding:14, alignItems:'center', marginTop:12, borderWidth:1, borderColor:'#FFCDD2'},
  btnOutText:{fontWeight:'700', color:'#C62828', fontSize:12}
});
