import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Entra() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const accedi = () => {
    try {
      const utenti = JSON.parse(localStorage.getItem('utenti') || '[]');
      const mioCane = JSON.parse(localStorage.getItem('mioCane') || 'null');
      
      let trovato = utenti.find((u:any) => u.email.toLowerCase() === email.toLowerCase());
      if (!trovato && mioCane && mioCane.email.toLowerCase() === email.toLowerCase()) {
        trovato = mioCane;
      }

      if (trovato) {
        localStorage.setItem('mioCane', JSON.stringify(trovato));
        router.replace('/(tabs)');
      } else {
        setMsg('Email non trovata. Fai Iscriviti prima. Email salvate: ' + utenti.map((u:any)=>u.email).join(', '));
      }
    } catch {
      setMsg('Errore, apri da Chrome non da anteprima');
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F0', padding:24, maxWidth:400, width:'100%', alignSelf:'center', paddingTop:50}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Entra</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="ptova123@gmail.com" autoCapitalize='none' style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:20}} />
      {msg ? <Text style={{color:'red', marginTop:10}}>{msg}</Text> : null}
      <TouchableOpacity onPress={accedi} style={{backgroundColor:'#000', padding:16, borderRadius:12, alignItems:'center', marginTop:20}}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Entra</Text>
      </TouchableOpacity>
    </View>
  );
}
