import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function Home() {
  const router = useRouter();
  const [carico, setCarico] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        if (Platform.OS === 'web') {
          const salvato = localStorage.getItem('mioCane');
          if (salvato) {
            router.replace('/(tabs)');
            return;
          }
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

        <TouchableOpacity onPress={()=>router.push('/entra')} style={{backgroundColor:'#000', padding:16, borderRadius:12, width:'100%', alignItems:'center', marginBottom:12}}>
          <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Entra</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push('/intro')} style={{backgroundColor:'#FF8C42', padding:16, borderRadius:12, width:'100%', alignItems:'center'}}>
          <Text style={{color:'#fff', fontWeight:'800', fontSize:16}}>Iscriviti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
