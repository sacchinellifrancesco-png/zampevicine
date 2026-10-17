import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ETA = ['3 mesi','6 mesi','9 mesi','12 mesi','1 anno','2 anni','3 anni','4 anni','5 anni','6 anni','7 anni','8 anni','9 anni','10 anni','11 anni','12 anni','13 anni','14 anni','15 anni','16 anni','17 anni','18 anni','19 anni','20 anni'];

export default function Iscrizione() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [nome, setNome] = useState('');
  const [nomeCane, setNomeCane] = useState('');
  const [email, setEmail] = useState('');

  // Step 2
  const [eta, setEta] = useState('2 anni');
  const [showEta, setShowEta] = useState(false);
  const [sesso, setSesso] = useState('Maschio');
  const [sicurezza, setSicurezza] = useState<'bianco'|'giallo'|'rosso'>('bianco');

  const continua = () => {
    if (!nome.trim() || !nomeCane.trim() || !email.trim()) {
      Alert.alert('Completa tutti i campi');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Email non valida');
      return;
    }
    setStep(2);
  };

  const salva = async () => {
    const dati = { nome, nomeCane, email, eta, sesso, sicurezza };
    await AsyncStorage.setItem('mioCane', JSON.stringify(dati));
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F0'}} contentContainerStyle={{padding:20, paddingTop:50, maxWidth:400, width:'100%', alignSelf:'center'}}>
      
      {step === 1 ? (
        <>
          <Text style={{fontSize:28, fontWeight:'800'}}>Crea account</Text>
          <Text style={{color:'#666', marginTop:6, marginBottom:20}}>LeashLove - Entra nella community</Text>

          <Text style={{fontWeight:'600', marginTop:14}}>Il tuo nome</Text>
          <TextInput value={nome} onChangeText={setNome} placeholder="Francesco" style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

          <Text style={{fontWeight:'600', marginTop:14}}>Nome del cane</Text>
          <TextInput value={nomeCane} onChangeText={setNomeCane} placeholder="Hope" style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

          <Text style={{fontWeight:'600', marginTop:14}}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="francesco@email.it" autoCapitalize='none' keyboardType='email-address' style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}} />

          <TouchableOpacity onPress={continua} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, alignItems:'center', marginTop:28}}>
            <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Continua</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{fontSize:28, fontWeight:'800'}}>Il tuo cane</Text>
          <Text style={{color:'#666', marginTop:6, marginBottom:20}}>Questo vedono gli altri a 250m</Text>

          <Text style={{fontWeight:'600'}}>Nome cane</Text>
          <View style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}}><Text style={{fontWeight:'600'}}>{nomeCane}</Text></View>

          <Text style={{fontWeight:'600', marginTop:14}}>Età</Text>
          <TouchableOpacity onPress={()=>setShowEta(!showEta)} style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:14, marginTop:6}}>
            <Text>{eta}  ▼</Text>
          </TouchableOpacity>
          {showEta && (
            <View style={{backgroundColor:'#fff', borderWidth:1, borderColor:'#ddd', borderRadius:12, marginTop:6, maxHeight:220}}>
              <ScrollView>
                {ETA.map(o=>(
                  <TouchableOpacity key={o} onPress={()=>{setEta(o); setShowEta(false)}} style={{padding:14, borderBottomWidth:1, borderColor:'#f2f2f2'}}>
                    <Text style={{fontWeight: eta===o? '800' : '400'}}>{o}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={{fontWeight:'600', marginTop:14}}>Sesso</Text>
          <View style={{flexDirection:'row', gap:10, marginTop:6}}>
            {['Maschio','Femmina'].map(s=>(
              <TouchableOpacity key={s} onPress={()=>setSesso(s)} style={{flex:1, backgroundColor: sesso===s? '#FF8C42' : '#fff', borderWidth:1, borderColor:sesso===s? '#FF8C42' : '#ddd', borderRadius:12, padding:14, alignItems:'center'}}>
                <Text style={{color: sesso===s? '#fff' : '#000', fontWeight:'600'}}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{fontWeight:'600', marginTop:14}}>Sicurezza</Text>
          <View style={{gap:10, marginTop:6}}>
            <TouchableOpacity onPress={()=>setSicurezza('bianco')} style={{backgroundColor: sicurezza==='bianco'? '#E8F5E9' : '#fff', borderWidth: sicurezza==='bianco'? 2 : 1, borderColor: sicurezza==='bianco'? '#4CAF50' : '#ddd', borderRadius:12, padding:14}}>
              <Text style={{fontWeight:'700'}}>⚪ BIANCO - Tranquillo</Text><Text style={{fontSize:12, color:'#666'}}>Si può avvicinare</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSicurezza('giallo')} style={{backgroundColor: sicurezza==='giallo'? '#FFFDE7' : '#fff', borderWidth: sicurezza==='giallo'? 2 : 1, borderColor: sicurezza==='giallo'? '#FFC107' : '#ddd', borderRadius:12, padding:14}}>
              <Text style={{fontWeight:'700'}}>🟡 GIALLO - Chiedere prima</Text><Text style={{fontSize:12, color:'#666'}}>Attenzione</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSicurezza('rosso')} style={{backgroundColor: sicurezza==='rosso'? '#FFEBEE' : '#fff', borderWidth: sicurezza==='rosso'? 2 : 1, borderColor: sicurezza==='rosso'? '#F44336' : '#ddd', borderRadius:12, padding:14}}>
              <Text style={{fontWeight:'700'}}>🔴 ROSSO - Non avvicinare</Text><Text style={{fontSize:12, color:'#666'}}>Non ama altri cani</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={salva} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, alignItems:'center', marginTop:28, marginBottom:40}}>
            <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Salva e inizia</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
