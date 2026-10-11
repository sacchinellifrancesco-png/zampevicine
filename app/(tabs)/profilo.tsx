import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile(){
  const router = useRouter();
  const [nome,setNome]=useState(''); const [dogName,setDogName]=useState('');
  const [profilePic,setProfilePic]=useState<string|null>(null);
  const [gallery,setGallery]=useState<string[]>([]);

  useEffect(()=>{
    if(Platform.OS==='web'){
      const u=localStorage.getItem('user'); if(u){const j=JSON.parse(u); setNome(j.nome||''); setDogName(j.dogName||'');}
      const p=localStorage.getItem('profilePic'); if(p) setProfilePic(p);
      const g=localStorage.getItem('gallery'); if(g) setGallery(JSON.parse(g));
    }
  },[]);

  const pickOne = (cb:(uri:string)=>void) => {
    if(Platform.OS!=='web') return;
    const input=document.createElement('input'); input.type='file'; input.accept='image/*';
    input.onchange=()=>{const f=(input.files as any)?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>cb(r.result as string); r.readAsDataURL(f);};
    input.click();
  };
  const pickMany = () => {
    if(Platform.OS!=='web') return;
    const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.multiple=true;
    input.onchange=()=>{const files=Array.from(input.files||[]).slice(0,15-gallery.length); const readers=files.map(f=>new Promise<string>(res=>{const r=new FileReader(); r.onload=()=>res(r.result as string); r.readAsDataURL(f);})); Promise.all(readers).then(uris=>{const up=[...gallery,...uris].slice(0,15); setGallery(up); localStorage.setItem('gallery',JSON.stringify(up));});};
    input.click();
  };

  const salva=()=>{
    if(gallery.length<2) return Alert.alert('Metti almeno 2 foto per demo');
    if(Platform.OS==='web'){
      const raw=localStorage.getItem('user'); const old=raw?JSON.parse(raw):{};
      localStorage.setItem('user',JSON.stringify({...old,nome,dogName}));
      if(profilePic) localStorage.setItem('profilePic',profilePic);
    }
    Alert.alert('Salvato ✅'); router.replace('/(tabs)');
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{padding:20,paddingTop:50,paddingBottom:40}}>
        <Text style={s.logo}><Text style={{color:'#FF6B2B'}}>Leash</Text>Love 🐾</Text>
        <Text style={s.title}>Modifica profilo</Text>
        <Pressable style={s.bigCircle} onPress={()=>pickOne(uri=>{setProfilePic(uri); if(Platform.OS==='web') localStorage.setItem('profilePic',uri);})}>
          {profilePic? <Image source={{uri:profilePic}} style={s.bigImg}/> : <Text style={s.plus}>+ 📸{'\n'}Tu + cane</Text>}
        </Pressable>
        <Text style={s.label}>Nome</Text><TextInput style={s.input} value={nome} onChangeText={setNome}/>
        <Text style={s.label}>Nome cane</Text><TextInput style={s.input} value={dogName} onChangeText={setDogName}/>
        <Text style={s.label}>Galleria {gallery.length}/10</Text>
        <View style={s.grid}>{gallery.map((u,i)=><View key={i} style={s.cell}><Image source={{uri:u}} style={s.cellImg}/><Pressable style={s.del} onPress={()=>{const up=gallery.filter((_,k)=>k!==i); setGallery(up); localStorage.setItem('gallery',JSON.stringify(up));}}><Text style={{color:'white',fontSize:10}}>✕</Text></Pressable></View>)}
          <Pressable style={s.cellAdd} onPress={pickMany}><Text>＋</Text></Pressable>
        </View>
        <Pressable style={s.btn} onPress={pickMany}><Text style={s.btnT}>+ Aggiungi foto</Text></Pressable>
        <Pressable style={s.btn2} onPress={salva}><Text style={s.btn2T}>Salva modifiche ✅</Text></Pressable>
        <Pressable style={s.linkBtn} onPress={()=>router.push('/gestione-consensi')}><Text style={s.link}>🍪 Gestione Consensi</Text></Pressable>
      </ScrollView>
    </View>
  );
}
const s=StyleSheet.create({
  container:{flex:1,backgroundColor:'#FFFBF7'}, logo:{fontSize:22,fontWeight:'900'}, title:{fontSize:24,fontWeight:'900',marginTop:8},
  bigCircle:{width:150,height:150,borderRadius:75,backgroundColor:'white',borderWidth:2,borderColor:'#FFE5D6',borderStyle:'dashed',alignSelf:'center',marginTop:16,alignItems:'center',justifyContent:'center',overflow:'hidden'},
  bigImg:{width:'100%',height:'100%'}, plus:{textAlign:'center',color:'#999',fontSize:12},
  label:{fontSize:12,fontWeight:'700',marginTop:16,marginBottom:6}, input:{backgroundColor:'white',borderRadius:12,padding:14,borderWidth:1,borderColor:'#FFE5D6'},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:10}, cell:{width:100,height:100,borderRadius:12,overflow:'hidden'}, cellImg:{width:'100%',height:'100%'},
  cellAdd:{width:100,height:100,borderRadius:12,borderWidth:1,borderColor:'#FFE5D6',borderStyle:'dashed',alignItems:'center',justifyContent:'center',backgroundColor:'white'},
  del:{position:'absolute',top:4,right:4,backgroundColor:'black',borderRadius:10,width:20,height:20,alignItems:'center',justifyContent:'center'},
  btn:{backgroundColor:'white',borderRadius:12,padding:12,alignItems:'center',marginTop:12,borderWidth:1,borderColor:'#FF6B2B'}, btnT:{color:'#FF6B2B',fontWeight:'700'},
  btn2:{backgroundColor:'#FF6B2B',borderRadius:20,padding:16,alignItems:'center',marginTop:16}, btn2T:{color:'white',fontWeight:'900'},
  linkBtn:{marginTop:12,alignItems:'center'}, link:{color:'#007AFF',fontWeight:'700',fontSize:12}
});
