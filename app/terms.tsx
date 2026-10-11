import { ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
export default function Terms(){
  const r=useRouter();
  return (
  <ScrollView style={{flex:1, backgroundColor:'#FFFBF7'}} contentContainerStyle={{padding:20, paddingTop:60}}>
    <Pressable onPress={()=>r.back()}><Text style={{color:'#FF6B2B', fontWeight:'700'}}>← Indietro</Text></Pressable>
    <Text style={{fontSize:22, fontWeight:'900', marginTop:12}}>Termini e Merchandising</Text>
    <Text style={{marginTop:10, fontSize:12, lineHeight:18, color:'#444'}}>
      1. LeashLove demo per matching cani. 2. Utente responsabile cane e rispetto regolamento comunale Roma (guinzaglio, museruola, raccolta deiezioni). 3. Vietato spam/molestie. 4. Merchandising: vendiamo collari/magliette solo con consenso cessione dati. Partner terzi autonomi titolari. 5. Posizione 60 min. 6. Foro Roma. 7. 18+. 8. Diritto recesso merch 14gg ex D.Lgs 206/05.
    </Text>
  </ScrollView>);
}
