import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function Lista() {
  const [io, setIo] = useState<any>(null);
  const [altri, setAltri] = useState<any[]>([]);

  useEffect(() => {
    try {
      const mio = JSON.parse(localStorage.getItem('mioCane') || 'null');
      const tutti = JSON.parse(localStorage.getItem('utenti') || '[]');
      setIo(mio);
      setAltri(tutti.filter((u:any) => u.email !== mio?.email));
    } catch {}
  }, []);

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F0', padding:20, alignItems:'center'}}>
      <View style={{maxWidth:400, width:'100%'}}>
        <Text style={{fontSize:24, fontWeight:'800'}}>LeashLove - 250m</Text>
        {io && (
          <View style={{backgroundColor:'#fff', borderRadius:12, padding:16, marginTop:16, borderWidth:2, borderColor:'#FF8C42'}}>
            <Text style={{fontWeight:'800'}}>TU: {io.nome} con {io.nomeCane}</Text>
            <Text style={{color:'#666'}}>{io.email}</Text>
          </View>
        )}
        <Text style={{marginTop:20, fontWeight:'600'}}>Altri cani:</Text>
        {altri.map((u:any, i:number) => (
          <View key={i} style={{backgroundColor:'#fff', borderRadius:12, padding:12, marginTop:8}}>
            <Text>{u.nome} con {u.nomeCane} - {u.email}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
