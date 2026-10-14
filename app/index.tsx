import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginFix() {
  const [email, setEmail] = useState('sacchinellifrancesco@gmail.com');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <View style={{flex:1, backgroundColor:'#FFF8F5', padding:25, paddingTop:80}}>
      <Text style={{fontSize:30, fontWeight:'900', color:'#FF6B4A'}}>LeashLove 🐾</Text>
      <Text style={{fontSize:22, fontWeight:'700', marginTop:10}}>Bentornato! ❤️</Text>

      <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize='none' style={{backgroundColor:'white', padding:16, borderRadius:12, marginTop:20, borderWidth:1, borderColor:'#ddd'}} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={{backgroundColor:'white', padding:16, borderRadius:12, marginTop:15, borderWidth:1, borderColor:'#ddd'}} />

      <TouchableOpacity 
        onPress={() => Alert.alert("Login saltato", "Supabase non è ancora collegato, entro come ospite")}
        style={{backgroundColor:'#FF6B4A', padding:18, borderRadius:12, marginTop:20, alignItems:'center'}}>
        <Text style={{color:'white', fontWeight:'800'}}>Accedi</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.replace('/(tabs)')}
        style={{backgroundColor:'white', padding:18, borderRadius:12, marginTop:15, alignItems:'center', borderWidth:1, borderColor:'#FF6B4A'}}>
        <Text style={{color:'#FF6B4A', fontWeight:'800'}}>ENTRA SENZA PASSWORD → Vedi l'app</Text>
      </TouchableOpacity>

      <Text style={{marginTop:20, color:'#999', textAlign:'center', fontSize:12}}>Clicca il bottone bianco per entrare subito</Text>
    </View>
  );
}
