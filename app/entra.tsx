import { useState, Platform } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';

export default function Entra() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const accedi = () => {
    if (!email.includes('@')) { alert('Metti email con @'); return; }
    try {
      const utenti = JSON.parse(localStorage.getItem('utenti') || '[]');
      let trovato = utenti.find((u:any) => u.email.toLowerCase() === email.toLowerCase());
      if (!trovato) {
        // se non ti trova crea al volo un profilo così non blocca più
        trovato = { nome: 'Utente', nomeCane: 'Cane', email, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
      }
      localStorage.setItem('mioCane', JSON.stringify(trovato));
    } catch {}
    router.replace('/(tabs)');
  };

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F0', padding:24, maxWidth:400, width:'100%', alignSelf:'center', paddingTop:50}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Entra</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="sacchinellifrancesco@gmail.com" autoCapitalize='none' style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:20}} />
      <TouchableOpacity onPress={accedi} style={{backgroundColor:'#000', padding:16, borderRadius:12, alignItems:'center', marginTop:20}}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Entra</Text>
      </TouchableOpacity>
    </View>
  );
}
