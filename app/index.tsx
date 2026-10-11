import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState(''); const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  // Obbligatori
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [age, setAge] = useState(false);
  const [loc, setLoc] = useState(false);
  // Cookie - Garante 2021
  const [cookieAnalitici, setCookieAnalitici] = useState(false);
  const [cookieProfilazione, setCookieProfilazione] = useState(false);
  // Marketing / Merchandising
  const [marketing, setMarketing] = useState(false);
  const [profilazione, setProfilazione] = useState(false);
  const [terzi, setTerzi] = useState(false);
  const [cessioneMerch, setCessioneMerch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(Platform.OS==='web'){
      const u = localStorage.getItem('user');
      if(u) { router.replace('/(tabs)'); return; }
    }
    setLoading(false);
  },[]);

  const accettaTutti = () => {
    setPrivacy(true); setTerms(true); setAge(true); setLoc(true);
    setCookieAnalitici(true); setCookieProfilazione(true);
    setMarketing(true); setProfilazione(true); setTerzi(true); setCessioneMerch(true);
  };
  const rifiutaTutti = () => {
    setCookieAnalitici(false); setCookieProfilazione(false);
    setMarketing(false); setProfilazione(false); setTerzi(false); setCessioneMerch(false);
  };

  const iscriviti = () => {
    if(!nome || !email || !dogName) return Alert.alert('Dati mancanti','Nome, email e nome cane obbligatori *');
    if(!privacy || !terms || !age || !loc) return Alert.alert('Consensi obbligatori','Devi accettare Privacy, Termini, 18+ e Posizione per GDPR');
    const consensi = {
      privacy, terms, age, loc, cookieAnalitici, cookieProfilazione, marketing, profilazione, terzi, cessioneMerch,
      versione: '1.0 - 11/10/2026', data: new Date().toISOString(), ip: 'demo-device'
    };
    if(Platform.OS==='web'){
      localStorage.setItem('user', JSON.stringify({nome, email, dogName, consensi}));
      localStorage.setItem('cookie_consent', JSON.stringify(consensi));
      localStorage.setItem('myDog', JSON.stringify({name:dogName}));
    }
    router.replace('/(tabs)');
  };

  if(loading) return <View style={s.loading}><Text style={{fontWeight:'900', color:'#FF6B2B'}}>LeashLove 🐾</Text></View>;

  const Check = ({val, set, label, required, link, onLink}:any) => (
    <Pressable style={s.checkRow} onPress={()=>set(!val)}>
      <View style={[s.box, val && s.boxChecked]}><Text style={s.tick}>{val?'✓':''}</Text></View>
      <Text style={s.checkText}>{label}{required && <Text style={{color:'#FF6B2B'}}> *</Text>}{link && <Text style={s.link} onPress={onLink}> {link}</Text>}</Text>
    </Pressable>
  );

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{padding:20, paddingTop:40, paddingBottom:40}}>
        <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
        <Text style={s.title}>Iscrizione - A norma GDPR</Text>

        <Text style={s.label}>Nome e Cognome *</Text><TextInput style={s.input} placeholder="Marco Rossi" value={nome} onChangeText={setNome} />
        <Text style={s.label}>Email *</Text><TextInput style={s.input} placeholder="marco@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={s.label}>Nome cane *</Text><TextInput style={s.input} placeholder="Moka" value={dogName} onChangeText={setDogName} />

        <View style={s.bannerBtns}><Pressable style={s.smallBtn} onPress={accettaTutti}><Text style={s.smallBtnText}>Accetta tutti</Text></Pressable><Pressable style={[s.smallBtn, {backgroundColor:'white', borderWidth:1}]} onPress={rifiutaTutti}><Text style={[s.smallBtnText,{color:'#333'}]}>Rifiuta facoltativi</Text></Pressable></View>

        <Text style={s.sec}>🔒 OBBLIGATORI PER LEGGE (art.6 GDPR)</Text>
        <Check val={privacy} set={setPrivacy} label="Ho letto e accetto Privacy Policy ex art.13 Reg. UE 2016/679" required link="Leggi" onLink={()=>router.push('/privacy')} />
        <Check val={terms} set={setTerms} label="Accetto Termini e Condizioni del servizio" required link="Leggi" onLink={()=>router.push('/terms')} />
        <Check val={age} set={setAge} label="Dichiaro di avere 18+ anni (servizio vietato ai minori art.8 GDPR)" required />
        <Check val={loc} set={setLoc} label="Acconsento a geolocalizzazione per mappa 'cani vicino a te' - art.6.1.a - revocabile" required />

        <Text style={s.sec}>🍪 COOKIE - Linee Guida Garante 10/06/2021</Text>
        <View style={s.cookieInfo}><Text style={s.cookieText}>Cookie tecnici sempre attivi (necessari). Per analitici e profilazione serve consenso preventivo.</Text></View>
        <Check val={cookieAnalitici} set={setCookieAnalitici} label="Cookie analitici / misurazione (Google Analytics 4 anonimizzato) - facoltativo" link="Cookie Policy" onLink={()=>router.push('/cookie')} />
        <Check val={cookieProfilazione} set={setCookieProfilazione} label="Cookie di profilazione e marketing per annunci personalizzati - facoltativo" />

        <Text style={s.sec}>📧 MARKETING E MERCHANDISING - Art.130 Codice Privacy</Text>
        <Check val={marketing} set={setMarketing} label="Consenso marketing diretto LeashLove: newsletter, eventi cani a Roma, promo app - facoltativo" />
        <Check val={profilazione} set={setProfilazione} label="Consenso profilazione: offerte personalizzate in base a razza, zona, attività - art.22 GDPR - facoltativo" />
        <Check val={terzi} set={setTerzi} label="Consenso marketing di terzi selezionati (partner pet, veterinari) - cessione a terzi autonomi titolari - facoltativo" />
        <Check val={cessioneMerch} set={setCessioneMerch} label="Consenso cessione dati per merchandising LeashLove (collari, guinzagli, magliette) e prodotti partner - facoltativo" />

        <Pressable style={[s.btn, (!privacy||!terms||!age||!loc) && s.btnDis]} onPress={iscriviti}><Text style={s.btnText}>Iscriviti a LeashLove 🧡</Text></Pressable>
        <Text style={s.note}>Demo: consensi salvati con data/versione su dispositivo. In produzione: registro consensi, DPO, conservazione 24 mesi marketing / 60 min posizione, diritti art.15-22 scrivendo a privacy@leashlove.demo. Titolare: LeashLove Demo. Cookie banner e revoca consensi in Impostazioni → Privacy.</Text>
        <View style={{flexDirection:'row', gap:12, marginTop:12, justifyContent:'center'}}><Pressable onPress={()=>router.push('/privacy')}><Text style={s.link}>Privacy</Text></Pressable><Pressable onPress={()=>router.push('/cookie')}><Text style={s.link}>Cookie</Text></Pressable><Pressable onPress={()=>router.push('/terms')}><Text style={s.link}>Termini</Text></Pressable></View>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'}, loading:{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#FFFBF7'},
  logo:{fontSize:24, fontWeight:'900'}, title:{fontSize:20, fontWeight:'900', marginTop:10},
  label:{fontSize:11, fontWeight:'700', marginTop:12, marginBottom:4}, input:{backgroundColor:'white', borderRadius:10, padding:12, borderWidth:1, borderColor:'#FFE5D6', fontSize:14},
  bannerBtns:{flexDirection:'row', gap:8, marginTop:16}, smallBtn:{backgroundColor:'#1F3D2B', borderRadius:12, paddingHorizontal:12, paddingVertical:8}, smallBtnText:{color:'white', fontWeight:'700', fontSize:11},
  sec:{fontWeight:'900', fontSize:12, marginTop:20, marginBottom:6, color:'#1F3D2B'},
  cookieInfo:{backgroundColor:'#FFF0E0', padding:8, borderRadius:8}, cookieText:{fontSize:10, color:'#666'},
  checkRow:{flexDirection:'row', gap:8, marginTop:10, alignItems:'flex-start'}, box:{width:20, height:20, borderRadius:5, borderWidth:1.5, borderColor:'#FF6B2B', alignItems:'center', justifyContent:'center', marginTop:1},
  boxChecked:{backgroundColor:'#FF6B2B'}, tick:{color:'white', fontSize:10, fontWeight:'900'}, checkText:{flex:1, fontSize:11, lineHeight:15, color:'#333'},
  link:{color:'#007AFF', fontWeight:'700', fontSize:11}, btn:{backgroundColor:'#FF6B2B', borderRadius:20, padding:15, alignItems:'center', marginTop:20}, btnDis:{opacity:0.4}, btnText:{color:'white', fontWeight:'900'}, note:{fontSize:9, color:'#999', textAlign:'center', marginTop:10, lineHeight:12}
});
