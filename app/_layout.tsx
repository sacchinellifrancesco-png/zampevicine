import { Stack } from 'expo-router';
import { useState } from 'react';
import IntroScreen from '../components/IntroScreen';

export default function RootLayout() {
  const [showIntro, setShowIntro] = useState(true);

  // Se è la prima volta, mostra la intro rosa di LeashLove
  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  // Dopo la intro, mostra la tua app normale
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="dog" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="edit-dog" options={{ presentation: 'modal', title: 'Modifica Cane' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
