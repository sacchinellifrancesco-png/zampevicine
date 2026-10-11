import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

type Msg = { id: string; text?: string; image?: string; audio?: string; duration?: number; fromMe: boolean; time: string; };

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Msg[]>([
    { id:'1', text:'Ciao! Andiamo al parco oggi con i cani? 🐶', fromMe:false, time:'10:24' },
    { id:'2', text:'Si! Alle 18 al parco di Villa Borghese?', fromMe:true, time:'10:25' },
  ]);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  // FOTO
  const sendPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!perm.granted) return Alert.alert('Serve permesso foto');
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.6 });
    if(res.canceled) return;
    const uri = res.assets[0].uri;
    setMessages(prev=>[...prev, { id: Date.now().toString(), image: uri, fromMe:true, time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}) }]);
  };

  // AUDIO - registra
  const startRecording = async () => {
    try{
      if(Platform.OS!=='web'){
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const rec = new Audio.Recording();
        await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await rec.startAsync();
        setRecording(rec);
        setIsRecording(true);
      } else {
        // Web: usa MediaRecorder
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new (window as any).MediaRecorder(stream);
        const chunks:any[] = [];
        mediaRecorder.ondataavailable = (e:any)=> chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, {type:'audio/ogg'});
          const url = URL.createObjectURL(blob);
          setMessages(prev=>[...prev, { id: Date.now().toString(), audio: url, duration: 5, fromMe:true, time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}) }]);
        };
        (window as any)._mr = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
      }
    } catch(e){ Alert.alert('Mic error',''+e); }
  };

  const stopRecording = async () => {
    try{
      if(Platform.OS!=='web' && recording){
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setMessages(prev=>[...prev, { id: Date.now().toString(), audio: uri || '', duration: 5, fromMe:true, time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}) }]);
        setRecording(null);
      } else {
        const mr = (window as any)._mr;
        if(mr) mr.stop();
      }
      setIsRecording(false);
    } catch(e){ setIsRecording(false); }
  };

  const sendText = () => {
    if(!text.trim()) return;
    setMessages(prev=>[...prev, { id: Date.now().toString(), text, fromMe:true, time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}) }]);
    setText('');
    setTimeout(()=>scrollRef.current?.scrollToEnd({animated:true}),100);
  };

  const playAudio = async (msg: Msg) => {
    if(!msg.audio) return;
    if(playingId===msg.id){
      await soundRef.current?.pauseAsync(); setPlayingId(null); return;
    }
    try{
      if(soundRef.current) await soundRef.current.unloadAsync();
      const { sound } = await Audio.Sound.createAsync({ uri: msg.audio });
      soundRef.current = sound;
      setPlayingId(msg.id);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(s=>{
        if((s as any).didJustFinish){ setPlayingId(null); }
      });
    } catch{
      // fallback web
      const a = new (window as any).Audio(msg.audio); a.play(); setPlayingId(msg.id);
      a.onended = ()=> setPlayingId(null);
    }
  };

  return (
    <View style={s.container}>
      {/* HEADER */}
      <View style={s.header}>
        <Text style={s.headerName}>Moka & Marco 🐶</Text>
        <Text style={s.headerSub}>Vicino a te • 200m</Text>
      </View>

      <ScrollView ref={scrollRef} style={s.messages} contentContainerStyle={{padding:16, paddingBottom:20}} onContentSizeChange={()=>scrollRef.current?.scrollToEnd()}>
        {messages.map(m=>(
          <View key={m.id} style={[s.bubble, m.fromMe? s.bubbleMe : s.bubbleOther]}>
            {m.text && <Text style={[s.bubbleText, m.fromMe && s.bubbleTextMe]}>{m.text}</Text>}
            {m.image && <Image source={{uri:m.image}} style={s.bubbleImage} />}
            {m.audio && (
              <Pressable style={s.audioRow} onPress={()=>playAudio(m)}>
                <View style={[s.playBtn, playingId===m.id && s.playBtnActive]}><Text style={s.playIcon}>{playingId===m.id?'⏸':'▶️'}</Text></View>
                <View style={s.wave}><View style={s.waveBar}/><View style={s.waveBar}/><View style={[s.waveBar,{height:14}]}/><View style={s.waveBar}/><View style={s.waveBar}/></View>
                <Text style={s.audioTime}>{m.duration || 5}"</Text>
              </Pressable>
            )}
            <Text style={s.time}>{m.time}</Text>
          </View>
        ))}
        {isRecording && <View style={s.recIndicator}><Text style={s.recText}>● Registrazione in corso... clicca stop per inviare</Text></View>}
      </ScrollView>

      {/* INPUT BAR */}
      <View style={s.inputBar}>
        <Pressable style={s.attachBtn} onPress={sendPhoto}><Text style={s.attachIcon}>📷</Text></Pressable>

        <TextInput style={s.input} placeholder="Scrivi un messaggio..." value={text} onChangeText={setText} multiline />

        {text.trim()? (
          <Pressable style={s.sendBtn} onPress={sendText}><Text style={s.sendText}>➤</Text></Pressable>
        ) : (
          <Pressable style={[s.micBtn, isRecording && s.micBtnActive]} onPress={isRecording? stopRecording : startRecording} onLongPress={startRecording}>
            <Text style={s.micIcon}>{isRecording?'⏹️':'🎙️'}</Text>
          </Pressable>
        )}
      </View>
      <Text style={s.hint}>Tieni premuto 🎙️ per vocale • Clicca 📷 per foto</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'},
  header:{paddingTop:50, paddingBottom:12, paddingHorizontal:16, backgroundColor:'white', borderBottomWidth:1, borderColor:'#FFE5D6'},
  headerName:{fontWeight:'900', fontSize:16}, headerSub:{fontSize:11, color:'#777'},
  messages:{flex:1},
  bubble:{maxWidth:'78%', borderRadius:18, padding:10, marginBottom:10},
  bubbleMe:{backgroundColor:'#FF6B2B', alignSelf:'flex-end', borderBottomRightRadius:4},
  bubbleOther:{backgroundColor:'white', alignSelf:'flex-start', borderBottomLeftRadius:4, borderWidth:1, borderColor:'#FFE5D6'},
  bubbleText:{fontSize:14, color:'#111'}, bubbleTextMe:{color:'white'},
  bubbleImage:{width:180, height:180, borderRadius:12, marginTop:4},
  audioRow:{flexDirection:'row', alignItems:'center', gap:8, minWidth:140},
  playBtn:{width:32, height:32, borderRadius:16, backgroundColor:'white', alignItems:'center', justifyContent:'center'}, playBtnActive:{backgroundColor:'#1F3D2B'},
  playIcon:{fontSize:12}, wave:{flexDirection:'row', gap:3, alignItems:'center'}, waveBar:{width:3, height:8, backgroundColor:'white', borderRadius:2},
  audioTime:{color:'white', fontSize:11, fontWeight:'700'},
  time:{fontSize:9, color:'#ffffffAA', marginTop:4, alignSelf:'flex-end'},
  recIndicator:{backgroundColor:'#FFE5D6', padding:8, borderRadius:10, marginBottom:8, alignSelf:'center'},
  recText:{fontSize:11, fontWeight:'700', color:'#FF6B2B'},
  inputBar:{flexDirection:'row', alignItems:'flex-end', padding:10, backgroundColor:'white', borderTopWidth:1, borderColor:'#FFE5D6', gap:8},
  attachBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#FFF0E0', alignItems:'center', justifyContent:'center'}, attachIcon:{fontSize:18},
  input:{flex:1, backgroundColor:'#F5F5F5', borderRadius:20, paddingHorizontal:14, paddingVertical:10, fontSize:14, maxHeight:100},
  sendBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#FF6B2B', alignItems:'center', justifyContent:'center'}, sendText:{color:'white', fontWeight:'900', fontSize:16},
  micBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#1F3D2B', alignItems:'center', justifyContent:'center'}, micBtnActive:{backgroundColor:'#C62828'}, micIcon:{fontSize:16},
  hint:{fontSize:9, color:'#AAA', textAlign:'center', paddingBottom:8, backgroundColor:'white'}
});
