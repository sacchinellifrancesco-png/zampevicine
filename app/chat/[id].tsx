import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Msg = { id: string; text?: string; image?: string; audio?: string; duration?: number; fromMe: boolean; time: string; };

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const mediaRecorderRef = useRef<any>(null);
  const audioPlayRef = useRef<any>(null);

  const [messages, setMessages] = useState<Msg[]>([
    { id:'1', text:'Ciao! Andiamo al parco oggi con i cani? 🐶', fromMe:false, time:'10:24' },
    { id:'2', text:'Si! Alle 18 a Villa Borghese?', fromMe:true, time:'10:25' },
  ]);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const pushMessage = (m: Msg) => {
    setMessages(prev=>[...prev, m]);
    setTimeout(()=>scrollRef.current?.scrollToEnd({animated:true}), 100);
  };

  // 📷 FOTO - versione WEB che non rompe il build
  const sendPhoto = () => {
    if(Platform.OS!=='web') return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = (input.files as any)?.[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        pushMessage({
          id: Date.now().toString(),
          image: reader.result as string,
          fromMe: true,
          time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // 🎙️ VOCALE - versione WEB
  const startRecording = async () => {
    if(Platform.OS!=='web') return;
    try {
      const stream = await (navigator.mediaDevices as any).getUserMedia({ audio: true });
      const mr = new (window as any).MediaRecorder(stream);
      const chunks: Blob[] = [];
      mr.ondataavailable = (e:any) => { if(e.data.size>0) chunks.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        pushMessage({
          id: Date.now().toString(),
          audio: url,
          duration: Math.round(blob.size/1000),
          fromMe: true,
          time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})
        });
        stream.getTracks().forEach((t:any)=>t.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch (e) {
      alert('Serve permesso microfono');
    }
  };

  const stopRecording = () => {
    if(mediaRecorderRef.current){
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendText = () => {
    if(!text.trim()) return;
    pushMessage({
      id: Date.now().toString(),
      text: text.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})
    });
    setText('');
  };

  const playAudio = (msg: Msg) => {
    if(!msg.audio || Platform.OS!=='web') return;
    if(playingId===msg.id){
      if(audioPlayRef.current){ audioPlayRef.current.pause(); }
      setPlayingId(null);
      return;
    }
    if(audioPlayRef.current){ audioPlayRef.current.pause(); }
    const a = new (window as any).Audio(msg.audio);
    audioPlayRef.current = a;
    setPlayingId(msg.id);
    a.play();
    a.onended = () => setPlayingId(null);
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Pressable onPress={()=>router.back()}><Text style={s.back}>← Indietro</Text></Pressable>
        <Text style={s.headerName}>Moka & Marco 🐶</Text>
        <Text style={s.headerSub}>ID chat: {id} • 200m da te</Text>
      </View>

      <ScrollView ref={scrollRef} style={s.messages} contentContainerStyle={{padding:16, paddingBottom:20}} onContentSizeChange={()=>scrollRef.current?.scrollToEnd({animated:false})}>
        {messages.map(m=>(
          <View key={m.id} style={[s.bubble, m.fromMe? s.bubbleMe : s.bubbleOther]}>
            {m.text && <Text style={[s.bubbleText, m.fromMe && s.bubbleTextMe]}>{m.text}</Text>}
            {m.image && <Image source={{uri:m.image}} style={s.bubbleImage} />}
            {m.audio && (
              <Pressable style={s.audioRow} onPress={()=>playAudio(m)}>
                <View style={[s.playBtn, playingId===m.id && s.playBtnActive]}><Text style={s.playIcon}>{playingId===m.id?'⏸':'▶️'}</Text></View>
                <View style={s.wave}><View style={s.waveBar}/><View style={s.waveBar}/><View style={[s.waveBar,{height:14}]}/><View style={s.waveBar}/><View style={s.waveBar}/></View>
                <Text style={s.audioTime}>{m.duration || 3}"</Text>
              </Pressable>
            )}
            <Text style={[s.time, m.fromMe && {color:'#ffffffAA'}]}>{m.time}</Text>
          </View>
        ))}
        {isRecording && <View style={s.recIndicator}><Text style={s.recText}>● Registrazione... clicca ⏹️ per inviare</Text></View>}
      </ScrollView>

      <View style={s.inputBar}>
        <Pressable style={s.attachBtn} onPress={sendPhoto}><Text style={s.attachIcon}>📷</Text></Pressable>
        <TextInput style={s.input} placeholder="Scrivi un messaggio..." value={text} onChangeText={setText} multiline />
        {text.trim()? (
          <Pressable style={s.sendBtn} onPress={sendText}><Text style={s.sendText}>➤</Text></Pressable>
        ) : (
          <Pressable style={[s.micBtn, isRecording && s.micBtnActive]} onPress={isRecording? stopRecording : startRecording}>
            <Text style={s.micIcon}>{isRecording?'⏹️':'🎙️'}</Text>
          </Pressable>
        )}
      </View>
      <Text style={s.hint}>📷 foto dalla libreria • 🎙️ clicca per registrare, riclicca per inviare</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, backgroundColor:'#FFFBF7'},
  header:{paddingTop:50, paddingBottom:12, paddingHorizontal:16, backgroundColor:'white', borderBottomWidth:1, borderColor:'#FFE5D6'},
  back:{color:'#FF6B2B', fontWeight:'700', fontSize:12, marginBottom:6},
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
  time:{fontSize:9, color:'#999', marginTop:4, alignSelf:'flex-end'},
  recIndicator:{backgroundColor:'#FFE5D6', padding:8, borderRadius:10, marginBottom:8, alignSelf:'center'},
  recText:{fontSize:11, fontWeight:'700', color:'#FF6B2B'},
  inputBar:{flexDirection:'row', alignItems:'flex-end', padding:10, backgroundColor:'white', borderTopWidth:1, borderColor:'#FFE5D6', gap:8},
  attachBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#FFF0E0', alignItems:'center', justifyContent:'center'}, attachIcon:{fontSize:18},
  input:{flex:1, backgroundColor:'#F5F5F5', borderRadius:20, paddingHorizontal:14, paddingVertical:10, fontSize:14, maxHeight:100},
  sendBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#FF6B2B', alignItems:'center', justifyContent:'center'}, sendText:{color:'white', fontWeight:'900', fontSize:16},
  micBtn:{width:40, height:40, borderRadius:20, backgroundColor:'#1F3D2B', alignItems:'center', justifyContent:'center'}, micBtnActive:{backgroundColor:'#C62828'}, micIcon:{fontSize:16},
  hint:{fontSize:9, color:'#AAA', textAlign:'center', paddingBottom:10, backgroundColor:'white', paddingTop:4}
});
