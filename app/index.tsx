import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Auth() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [savedUser, setSavedUser] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [password, setPassword] = useState('');
  const [privacy, setPrivacy] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(Platform.OS==='web'){
      const raw = localStorage.getItem('user');
      if(raw){
        try{
          const u = JSON.parse(raw);
          setSavedUser(u);
          setNome(u.nome||'');
          setEmail(u.email||'');
          setMode('login'); // Se sei già iscritto ti mostra ACCEDI
        }catch{}
      }
    }
    setLoading(false);
  },[]);

  const accedi = () => {
    if(!savedUser){
      // Nessun account salvato -> vai a iscrizione
      setMode('register');
      return;
    }
    // Login semplice con email (demo) - in prod con password vera
    if(email.toLowerCase().trim() === savedUser.email.toLowerCase().trim()){
      router.replace('/(tabs)');
    } else {
      Alert.alert('Email non trovata', `Ti sei iscritto con ${savedUser.email}. Usa quella email o clicca "Crea nuovo account"`);
    }
  };

  const iscriviti = () => {
    if(!nome || !email || !dogName){
      Alert.alert('Manca qualcosa','Metti nome, email e nome cane *');
      return;
    }
    if(!privacy) return Alert.alert('Privacy','Devi accettare Privacy');
    const user = { nome, email: email.toLowerCase().trim(), dogName, password, createdAt: new Date().toISOString(), consensi:{privacy, versione:'1.2'} };
    if(Platform.OS==='web'){
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('myDog', JSON.stringify({ name: dogName }));
    }
    router.replace('/(tabs)');
  };

  const cambiaAccount = () => {
    if(Platform.OS==='web' && confirm('Vuoi creare un altro account? Questo cancella quello vecchio.')){
      localStorage.clear();
      setSavedUser(null);
      setMode('register');
      setNome(''); setEmail(''); setDogName('');
    }
  };

  if(loading) return <View style={s.loading}><Text style={{fontWeight:'900', color:'#FF6B2B'}}>LeashLove 🐾</Text></View>;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{padding:20, paddingTop:60, paddingBottom:40}}>
        <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
        
        {mode==='login' ? (
          <>
            <Text style={s.title}>Bentornato! 🧡</Text>
            <Text style={s.sub}>Bentornato {savedUser?.nome} e {savedUser?.dogName || 'il tuo cane'}!</Text>
            <View style={s.avatarBox}><Text style={s.avatar}>🐶</Text></View>

            <Text style={s.label}>Email con cui ti sei iscritto *</Text>
            <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="marco@email.com" autoCapitalize="none" keyboardType="email-address" />

            <Text style={s.label}>Password (se l'hai messa)</Text>
            <TextInput style={s.input} value={password} onChangeText={setPassword} placeholder="••••••" secureTextEntry />

            <Pressable style={s.btn} onPress={accedi}><Text style={s.btnText}>Accedi →</Text></Pressable>

            <Pressable style={s.btn2} onPress={cambiaAccount}><Text style={s.btn2Text}>Non sei {savedUser?.nome}? Crea nuovo account</Text></Pressable>
            <Pressable onPress={()=>setMode('register')}><Text style={s.link}>Non hai account? Iscriviti</Text></Pressable>
          </>
        ) : (
          <>
            <Text style={s.title}>Crea account</Text>
            <Text style={s.sub}>Entra nella community di Roma 🐾</Text>

            <Text style={s.label}>Il tuo nome *</Text><TextInput style={s.input} value={nome} onChangeText={setNome} placeholder="Marco" />
            <Text style={s.label}>Email *</Text><TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="marco@email.com" autoCapitalize="none" keyboardType="email-address" />
            <Text style={s.label}>Nome cane *</Text><TextInput style={s.input} value={dogName} onChangeText={setDogName} placeholder="Moka" />
            <Text style={s.label}>Password</Text><TextInput style={s.input} value={password} onChangeText={setPassword} placeholder="Min. 6 caratteri" secureTextEntry />

            <Pressable style={s.checkRow} onPress={()=>setPrivacy(!privacy)}>
              <View style={[s.box, privacy && s.boxChecked]}><Text style={s.tick}>{privacy?'✓':''}</Text></View>
              <Text style={s.checkText}>Accetto Privacy e Termini *</Text>
            </Pressable>

            <Pressable style={s.btn} onPress={iscriviti}><Text style={s.btnText}>Iscriviti 🧡</Text></Pressable>

            <Pressable onPress={()=>setMode('login')}><Text style={s.link}>Hai già un account? Accedi</Text></Pressable>
          </>
        )}

        <View style={{flexDirection:'row', gap:12, justifyContent:'center', marginTop:20}}>
          <Pressable onPress={()=>router.push('/privacy')}><Text style={s.smallLink}>Privacy</Text></Pressable>
          <Pressable onPress={()=>router.push('/gestione-consensi')}><Text style={s.smallLink}>Consensi</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'}, loading:{flex:1, backgroundColor:'#FFFBF7', alignItems:'center', justifyContent:'center'},
  logo:{fontSize:26, fontWeight:'900'}, title:{fontSize:28, fontWeight:'900', marginTop:16}, sub:{color:'#777', marginTop:6, fontSize:13},
  avatarBox:{width:80, height:80, borderRadius:40, backgroundColor:'white', alignItems:'center', justifyContent:'center', alignSelf:'center', marginTop:16, borderWidth:1, borderColor:'#FFE5D6'},
  avatar:{fontSize:40},
  label:{fontSize:12, fontWeight:'700', marginTop:16, marginBottom:6}, input:{backgroundColor:'white', borderRadius:12, padding:14, borderWidth:1, borderColor:'#FFE5D6', fontSize:15},
  checkRow:{flexDirection:'row', gap:8, marginTop:14, alignItems:'center'}, box:{width:20, height:20, borderRadius:6, borderWidth:1.5, borderColor:'#FF6B2B', alignItems:'center', justifyContent:'center'},
  boxChecked:{backgroundColor:'#FF6B2B'}, tick:{color:'white', fontWeight:'900', fontSize:12}, checkText:{fontSize:12},
  btn:{backgroundColor:'#FF6B2B', borderRadius:20, padding:16, alignItems:'center', marginTop:22},
  btnText:{color:'white', fontWeight:'900', fontSize:16},
  btn2:{backgroundColor:'white', borderRadius:20, padding:14, alignItems:'center', marginTop:12, borderWidth:1, borderColor:'#FFE5D6'},
  btn2Text:{fontWeight:'600', fontSize:12, color:'#555'},
  link:{color:'#007AFF', fontWeight:'700', textAlign:'center', marginTop:16, fontSize:13}, smallLink:{color:'#999', fontSize:11, fontWeight:'600'}
});
