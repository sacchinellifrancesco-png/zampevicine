import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

function InputWeb({ value, onChange, placeholder }: any) {
  if (Platform.OS === 'web') {
    return (
      // @ts-ignore - input html per far funzionare Vercel
      <input
        value={value}
        onChange={(e:any) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 14,
          marginTop: 6,
          width: '100%',
          fontSize: 16,
          outline: 'none'
        }}
      />
    );
  }
  return null;
}

import { TextInput } from 'react-native';

export default function Intro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [nomeCane, setNomeCane] = useState('');
  const [email, setEmail] = useState('');

  const continua = () => {
    const n = nome.trim();
    const c = nomeCane.trim();
    const e = email.trim();
    
    console.log('Dati:', n, c, e);

    if (n.length < 2) { alert('Metti il tuo nome (almeno 2 lettere)'); return; }
    if (c.length < 1) { alert('Metti il nome del cane'); return; }
    if (!e.includes('@')) { alert('Email deve avere la @'); return; }

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

  const Field = ({ label, value, onChange, ph }: any) => (
    <View style={{marginTop:14}}>
      <Text style={{fontWeight:'600'}}>{label}</Text>
      {Platform.OS === 'web' ? (
        <InputWeb value={value} onChange={onChange} placeholder={ph} />
      ) : (
        <TextInput value={value} onChangeText={onChange} placeholder={ph} style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />
      )}
    </View>
  );

  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F0'}} contentContainerStyle={{padding:24, maxWidth:400, width:'100%', alignSelf:'center', paddingTop:40}}>
      <Text style={{fontSize:28, fontWeight:'800'}}>Crea account</Text>
      <Text style={{color:'#666', marginBottom:10}}>LeashLove</Text>

      <Field label="Il tuo nome" value={nome} onChange={setNome} ph="Francesco" />
      <Field label="Nome del cane" value={nomeCane} onChange={setNomeCane} ph="Hope" />
      <Field label="Email" value={email} onChange={setEmail} ph="sacchinellifrancesco@gmail.com" />

      <TouchableOpacity onPress={continua} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, alignItems:'center', marginTop:24}}>
        <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Iscriviti e entra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
