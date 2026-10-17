import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function Home() {
  const router = useRouter();
  const [carico, setCarico] = useState(true);
  const [utente, setUtente] = useState<any>(null);

  useEffect(() => {
    const check = async () => {
      try {
        let dati = null;
        if (Platform.OS === 'web') {
          const salvato = localStorage.getItem('mioCane');
          if (salvato) dati = JSON.parse(salvato);
        } else {
          const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
          const salvato = await AsyncStorage.getItem('mioCane');
          if (salvato) dati = JSON.parse(salvato);
        }
        if (dati) {
          setUtente(dati);
          // SEI GIÀ ISCRITTO, ENTRA DA SOLO
          setTimeout(()=> router.replace('/(tabs)'), 800);
        }
      } catch {}
      setCarico(false);
    };
    check();
  }, []);

  if (carico) return <View style={{flex:1, backgroundColor:'#FFF8F0'}} />;

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F0', justifyContent:'center', alignItems:'center', padding:20}}>
      <View style={{maxWidth:400, width:'100%', alignItems:'center'}}>
        <Text style={{fontSize:36, fontWeight:'900'}}>LeashLove</Text>
        <Text style={{color:'#666', marginTop:6, marginBottom:30}}>Terni - Cani a 250m</Text>

        {utente ? (
          <>
            <Text style={{fontSize:18, fontWeight:'600', marginBottom:20}}>Bentornato {utente.nome} e {utente.nomeCane}! 🐶</Text>
            <Text style={{color:'#666', marginBottom:20}}>Ti sto portando dentro...</Text>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={()=>router.push('/entra')} style={{backgroundColor:'#000', padding:16, borderRadius:12, width:'100%', alignItems:'center', marginBottom:12}}>
              <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Entra</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>router.push('/intro')} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, width:'100%', alignItems:'center'}}>
              <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Iscriviti</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
