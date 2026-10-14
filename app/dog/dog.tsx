import { View, Text, StyleSheet } from 'react-native';
export default function DogScreen() {
  return (
    <View style={s.c}>
      <Text style={s.e}>🐶</Text>
      <Text style={s.t}>Il tuo cane</Text>
      <Text style={s.d}>Profilo in costruzione</Text>
    </View>
  );
}
const s = StyleSheet.create({
  c:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FFF8F5'},
  e:{fontSize:60}, t:{fontSize:22,fontWeight:'bold',marginTop:10}, d:{color:'#888',marginTop:6}
});
