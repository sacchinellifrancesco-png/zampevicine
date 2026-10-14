import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    if(!email || !password) return Alert.alert("Compila email e password");
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
        if (error) {
          // SE è già registrato, fa il login automatico
          if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists")) {
            const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            if (loginError) throw loginError;
          } else {
            throw error;
          }
        }
      }
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Errore", e.message);
    }
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:'#FFF8F5'}} contentContainerStyle={{padding:25, paddingTop:80}}>
      <Text style={{fontSize:32, fontWeight:'900', color:'#FF6B4A'}}>LeashLove 🐾</Text>
      <Text style={{fontSize:24, fontWeight:'700', marginTop:10}}>{isLogin ? "Bentornato! ❤️" : "Crea account ✨"}</Text>
      <Text style={{color:'#666', marginTop:5}}>{isLogin ? "Accedi per rivedere Hope" : "Unisciti alla community di Marcianise"}</Text>

      {!isLogin && (
        <TextInput placeholder="Il tuo nome" value={name} onChangeText={setName} style={{backgroundColor:'white', padding:16, borderRadius:12, marginTop:25, borderWidth:1, borderColor:'#FFE0D6'}} />
      )}
      <TextInput placeholder="Email" autoCapitalize='none' value={email} onChangeText={setEmail} style={{backgroundColor:'white', padding:16, borderRadius:12, marginTop:15, borderWidth:1, borderColor:'#FFE0D6'}} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{backgroundColor:'white', padding:16, borderRadius:12, marginTop:15, borderWidth:1, borderColor:'#FFE0D6'}} />

      <TouchableOpacity onPress={handleAuth} style={{backgroundColor:'#FF6B4A', padding:18, borderRadius:12, marginTop:25, alignItems:'center'}}>
        <Text style={{color:'white', fontWeight:'800', fontSize:16}}>{isLogin ? "Accedi" : "Iscriviti"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setIsLogin(!isLogin)} style={{marginTop:20, alignItems:'center'}}>
        <Text style={{color:'#FF6B4A', fontWeight:'600'}}>{isLogin ? "Non hai account? Iscriviti" : "Hai già account? Accedi"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
