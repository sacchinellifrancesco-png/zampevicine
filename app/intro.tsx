import { useState, Platform } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [nomeCane, setNomeCane] = useState('');
  const [email, setEmail] = useState('');

  const continua = () => {
    // LEGGE DIRETTO DALL'HTML COSI' NON SBAGLIA PIU'
    let n = nome.trim();
    let c = nomeCane.trim();
    let e = email.trim();

    if (Platform.OS === 'web') {
      try {
        const el1 = document.getElementById('nomeInput') as HTMLInputElement;
        const el2 = document.getElementById('caneInput') as HTMLInputElement;
        const el3 = document.getElementById('emailInput') as HTMLInputElement;
        if (el1?.value) n = el1.value.trim();
        if (el2?.value) c = el2.value.trim();
        if (el3?.value) e = el3.value.trim();
      } catch {}
    }

    if (n.length < 2) { alert('Metti nome, ho letto: ' + n); return; }
    if (c.length < 1) { alert('Metti nome cane, ho letto: ' + c); return; }
    if (!e.includes('@')) { alert('Email con @, ho letto: ' + e); return; }

    try {
      const nuovo = { nome: n, nomeCane: c, email: e, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      const filtrati = vecchi.filter((u:any) => u.email.toLowerCase() !== e.toLowerCase());
      filtrati.push(nuovo);
      localStorage.setItem('utenti', JSON.stringify(filtrati));
      localStorage.setItem('mioCane', JSON.stringify(nuovo));
    } catch {}

    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F0'}} contentContainerStyle={{padding:24, maxWidth:400, width:'100%', alignSelf:'center', paddingTop:40}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Crea account</Text>
      <Text style={{color:'#666', marginBottom:20}}>LeashLove</Text>

      <Text style={{fontWeight:'600', marginTop:12}}>Il tuo nome</Text>
      {/* @ts-ignore */}
      <input id="nomeInput" value={nome} onChange={(e:any)=>setNome(e.target.value)} placeholder="Francesco" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />

      <Text style={{fontWeight:'600', marginTop:12}}>Nome del cane</Text>
      {/* @ts-ignore */}
      <input id="caneInput" value={nomeCane} onChange={(e:any)=>setNomeCane(e.target.value)} placeholder="Hope" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />

      <Text style={{fontWeight:'600', marginTop:12}}>Email</Text>
      {/* @ts-ignore */}
      <input id="emailInput" value={email} onChange={(e:any)=>setEmail(e.target.value)} placeholder="sacchinellifrancesco@gmail.com" style={{backgroundColor:'#fff', border:'1px solid #ddd', borderRadius:12, padding:14, marginTop:6, width:'100%', fontSize:16}} />

      <TouchableOpacity onPress={continua} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, alignItems:'center', marginTop:24}}>
        <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Iscriviti e entra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
