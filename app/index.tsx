import { useState } from 'react';
import IntroScreen from '../components/IntroScreen';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();
  
  return (
    <IntroScreen onFinish={() => router.replace('/(tabs)')} />
  );
}
