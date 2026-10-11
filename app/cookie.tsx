import { ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
export default function Cookie(){
  const r=useRouter();
  return (
  <ScrollView style={{flex:1, backgroundColor:'#FFFBF7'}} contentContainerStyle={{padding:20, paddingTop:60}}>
    <Pressable onPress={()=>r.back()}><Text style={{color:'#FF6B2B', fontWeight:'700'}}>← Indietro</Text></Pressable>
    <Text style={{fontSize:22, fontWeight:'900', marginTop:12}}>Cookie Policy - Linee Guida 10/06/2021</Text>
    <Text style={{marginTop:10, fontSize:12, lineHeight:18, color:'#444'}}>
      1. Tecnici necessari: sempre attivi, no consenso (sessione, sicurezza, load balancing).{'\n\n'}
      2. Analitici: Google Analytics 4 anonimizzato IP, solo con consenso preventivo (banner). Finalità misurazione. 14 mesi.{'\n\n'}
      3. Profilazione/marketing: per annunci personalizzati e merchandising, solo con consenso. 12 mesi.{'\n\n'}
      Banner: al primo accesso compare con Accetta tutti / Rifiuta / Personalizza. Blocco script preventivo. Registro consensi con prova. Revoca in ogni momento in Gestione consensi.{'\n\n'}
      Terze parti: Google Maps (mappe) - policy google.com/policies. OpenStreetMap. Vercel hosting.{'\n\n'}
      Come disattivare: browser o nostro pannello Cookie. Se rifiuti, sito funziona ma senza personalizzazione.
    </Text>
  </ScrollView>);
}
