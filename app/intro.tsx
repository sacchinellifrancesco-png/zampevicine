import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [nomeCane, setNomeCane] = useState('');
  const [email, setEmail] = useState('');

  const continua = () => {
    if (!nome.trim() || !nomeCane.trim() || !email.trim()) {
      alert('Completa tutti i campi');
      return;
    }
    // SALVA SUBITO
    try {
      const nuovo = { nome, nomeCane, email, eta: '2 anni', sesso: 'Maschio', sicurezza: 'bianco' };
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      const filtrati = vecchi.filter((u:any) => u.email.toLowerCase() !== email.toLowerCase());
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

      <Text style={{fontWeight:'600', marginTop:10}}>Il tuo nome</Text>
      <TextInput value={nome} onChangeText={setNome} placeholder="Francesco" style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

      <Text style={{fontWeight:'600', marginTop:12}}>Nome del cane</Text>
      <TextInput value={nomeCane} onChangeText={setNomeCane} placeholder="ans" style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

      <Text style={{fontWeight:'600', marginTop:12}}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="ptova123@gmail.com" autoCapitalize='none' style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

      <TouchableOpacity onPress={continua} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, alignItems:'center', marginTop:24}}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Iscriviti e entra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
