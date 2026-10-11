IntroScreen.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';

type Props = { onFinish: () => void };

const SLIDES = [
  { emoji: '🐾', title: 'Benvenuto su\nLeashLove', text: 'La community per chi ama i cani. Trova amici a 4 zampe vicino a te.' },
  { emoji: '🗺️', title: 'Vicino a Te', text: 'Vedi sulla mappa i cani nel tuo quartiere. Luna, Brando e tanti altri ti aspettano!' },
  { emoji: '💬', title: 'Chatta e Incontra', text: 'Manda un messaggio al padrone e organizza una passeggiata al parco.' },
];

export default function IntroScreen({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: Math.min(width - 40, 360) }]}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>

        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>

        <Pressable style={styles.button} onPress={() => isLast? onFinish() : setIndex(index + 1)}>
          <Text style={styles.buttonText}>{isLast? 'Inizia 🐶' : 'Avanti'}</Text>
        </Pressable>

        {!isLast && (
          <Pressable onPress={onFinish} style={styles.skip}>
            <Text style={styles.skipText}>Salta</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 12, color: '#222' },
  text: { fontSize: 16, textAlign: 'center', color: '#666', lineHeight: 22, marginBottom: 24 },
  dots: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFD1DC' },
  dotActive: { backgroundColor: '#FF6B9D', width: 20 },
  button: { backgroundColor: '#FF6B9D', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  skip: { marginTop: 16 },
  skipText: { color: '#999', fontSize: 14 },
});
