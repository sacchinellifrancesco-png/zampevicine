const salva = async () => {
  const nuovo = { nome, nomeCane, email, eta, sesso, sicurezza };
  try {
    if (Platform.OS === 'web') {
      const vecchi = JSON.parse(localStorage.getItem('utenti') || '[]');
      const filtrati = vecchi.filter((u:any)=> u.email !== email);
      filtrati.push(nuovo);
      localStorage.setItem('utenti', JSON.stringify(filtrati));
      localStorage.setItem('mioCane', JSON.stringify(nuovo));
    } else {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      const vecchi = JSON.parse((await AsyncStorage.getItem('utenti')) || '[]');
      const filtrati = vecchi.filter((u:any)=> u.email !== email);
      filtrati.push(nuovo);
      await AsyncStorage.setItem('utenti', JSON.stringify(filtrati));
      await AsyncStorage.setItem('mioCane', JSON.stringify(nuovo));
    }
  } catch {}
  router.replace('/(tabs)');
};
