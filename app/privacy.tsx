import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
export default function Privacy(){
  const r=useRouter();
  return (
  <ScrollView style={{flex:1, backgroundColor:'#FFFBF7'}} contentContainerStyle={{padding:20, paddingTop:60}}>
    <Pressable onPress={()=>r.back()}><Text style={s.back}>← Indietro</Text></Pressable>
    <Text style={s.h1}>Privacy Policy GDPR - LeashLove</Text>
    <Text style={s.date}>Versione 1.0 - 11/10/2026 - Art.13 Reg. UE 2016/679 e D.Lgs 196/03 e 101/18</Text>
    <Text style={s.h2}>1. Titolare e DPO</Text><Text style={s.p}>Titolare demo: LeashLove - privacy@leashlove.demo. DPO: dpo@leashlove.demo. Demo su Vercel - in prod nominare titolare con P.IVA.</Text>
    <Text style={s.h2}>2. Dati trattati</Text><Text style={s.p}>• Anagrafici: nome, email • Cane: nome, razza • Tecnici: IP, device, log • Posizione: lat/lon solo con "Sto uscendo ora" • Chat • Consensi con timestamp/versione.</Text>
    <Text style={s.h2}>3. Finalità e basi giuridiche</Text><Text style={s.p}>a) Esecuzione contratto app matching (art.6.1.b) b) Geolocalizzazione consenso (6.1.a) - revocabile c) Cookie analitici consenso (6.1.a + linee guida 10/06/2021) d) Marketing consenso (6.1.a e art.130) e) Merchandising e cessione terzi consenso (6.1.a) f) Profilazione consenso (6.1.a + art.22) g) Obblighi legali (6.1.c).</Text>
    <Text style={s.h2}>4. Modalità e conservazione</Text><Text style={s.p}>Demo: AsyncStorage/localStorage sul dispositivo. Prod: server UE. Posizione: 60 min poi cancellata. Profilo: fino a cancellazione account + 12 mesi log. Marketing: 24 mesi. Consensi: 6 anni (prova). Chat: 12 mesi.</Text>
    <Text style={s.h2}>5. Destinatari e trasferimento</Text><Text style={s.p}>Nessun trasferimento extra-UE in demo. In prod: Vercel/AWS UE. Se consenso terzi/merch: partner pet shop autonomi titolari (lista su richiesta). No diffusione.</Text>
    <Text style={s.h2}>6. Diritti art.15-22</Text><Text style={s.p}>Accesso, rettifica, cancellazione (oblio), limitazione, portabilità, opposizione, revoca consenso senza pregiudicare liceità pre-revoca, reclamo Garante Privacy (garanteprivacy.it).</Text>
    <Text style={s.h2}>7. Minori</Text><Text style={s.p}>Vietato under 14 (art.8 GDPR e d.lgs 101/18 Italia = 14 anni). Noi chiediamo 18+ per sicurezza.</Text>
    <Text style={s.h2}>8. Revoca</Text><Text style={s.p}>Impostazioni → Gestione consensi o email privacy@leashlove.demo. Revoca geolocalizzazione disattiva mappa.</Text>
  </ScrollView>);
}
const s=StyleSheet.create({back:{color:'#FF6B2B', fontWeight:'700'}, h1:{fontSize:22, fontWeight:'900', marginTop:12}, date:{fontSize:10, color:'#999', marginTop:4}, h2:{fontWeight:'800', marginTop:16, fontSize:13}, p:{fontSize:12, color:'#444', marginTop:4, lineHeight:16}});
