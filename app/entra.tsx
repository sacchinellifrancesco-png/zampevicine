import { useState, Platform } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Entra() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const accedi = () => {
    let e = email.trim();
    if (Platform.OS === 'web') {
      try {
        const el = document.getElementById('emailEntra') as HTMLInputElement;
        if (el?.value) e = el.value.trim();
      } catch {}
    }
    if (!e.includes('@')) { alert('Metti email con @, ho letto: ' + e); return; }

    try {
      const utenti = JSON.parse(localStorage.getItem('utenti') || '[]');
      let trovato = utenti.find((u:any) => u.email.toLowerCase() === e.toLowerCase());
      if (!trovato) trovato = { nome: 'Utente', nomeCane: 'Cane', email: e, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
      localStorage.setItem('mioCane', JSON.stringify(trovato));
    } catch {}

    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F0'}} contentContainerStyle={{padding:24, maxWidth:400, width:'100%', alignSelf:'center', paddingTop:50}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Entra</Text>
      <Text style={{color:'#666', marginBottom:20}}>Ritrova profilo</Text>

      {/* @ts-ignore */}
      <input id="emailEntra" value={email} onChange={(e:any)=>setEmail(e.target.value)} placeholder="sacchinellifrancesco@gmail.com" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, width:'100%', fontSize:16}} />

      <TouchableOpacity onPress={accedi} style={{backgroundColor:'#000', padding:16, borderRadius:12, alignItems:'center', marginTop:20}}>
        <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Entra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
