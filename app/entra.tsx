import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Entra() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const accedi = async () => {
    if (!email.includes('@')) { setMsg('Metti una email valida'); return; }
    try {
      let utenti:any[] = [];
      if (Platform.OS === 'web') {
        utenti = JSON.parse(localStorage.getItem('utenti') || '[]');
      } else {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        utenti = JSON.parse((await AsyncStorage.getItem('utenti')) || '[]');
      }
      const trovato = utenti.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (trovato) {
        if (Platform.OS === 'web') localStorage.setItem('mioCane', JSON.stringify(trovato));
        else {
          const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
          await AsyncStorage.setItem('mioCane', JSON.stringify(trovato));
        }
        router.replace('/(tabs)');
      } else {
        setMsg('Email non trovata, devi prima Iscriverti');
      }
    } catch { setMsg('Errore, riprova'); }
  };

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F0', padding:20, paddingTop:50, maxWidth:420, width:'100%', alignSelf:'center'}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Entra</Text>
      <Text style={{color:'#666', marginTop:6, marginBottom:20}}>Ritrova il tuo profilo</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="ptova123@gmail.com" autoCapitalize='none' style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14}} />
      {msg ? <Text style={{color:'red', marginTop:10}}>{msg}</Text> : null}
      <TouchableOpacity onPress={accedi} style={{backgroundColor:'#000', padding:16, borderRadius:12, alignItems:'center', marginTop:20}}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Entra</Text>
      </TouchableOpacity>
    </View>
  );
}
