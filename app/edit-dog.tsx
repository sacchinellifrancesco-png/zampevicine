import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, FieldError, Input, Label, Spinner, TextField } from 'heroui-native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore, saveLocal } from '@/lib/store';
import type { Badge, Character } from '@/lib/dogs';
import { goBackOrReplace } from '@/lib/navigation';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { ErrorNotice } from '@/components/leashlove/Feedback';

const characters: Character[] = ['Giocoso', 'Tranquillo', 'Energico', 'Socievole'];
const badgeOptions: Badge[] = ['Vaccinato', 'Socievole', 'Ama i bambini'];
export default function EditDogScreen() {
  const dog = useAppStore((s) => s.myDog);
  const ready = useAppStore((s) => s.ready);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(dog.name);
  const [ownerName, setOwnerName] = useState(dog.ownerName);
  const [breed, setBreed] = useState(dog.breed);
  const [age, setAge] = useState(String(dog.age));
  const [weight, setWeight] = useState(String(dog.weight));
  const [bio, setBio] = useState(dog.bio);
  const [character, setCharacter] = useState(dog.character);
  const [badges, setBadges] = useState(dog.badges);
  const [pending, setPending] = useState(false);
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const numericAge = Number(age.replace(',', '.'));
  const numericWeight = Number(weight.replace(',', '.'));
  const ageInvalid =
    !age.trim() || !Number.isFinite(numericAge) || numericAge < 0 || numericAge > 30;
  const weightInvalid =
    !weight.trim() || !Number.isFinite(numericWeight) || numericWeight <= 0 || numericWeight > 120;
  const save = async () => {
    setValidation(true);
    setError(null);
    if (!name.trim() || !ownerName.trim() || !breed.trim() || ageInvalid || weightInvalid) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setPending(true);
    try {
      await saveLocal({
        myDog: {
          ...useAppStore.getState().myDog,
          name: name.trim(),
          ownerName: ownerName.trim(),
          breed: breed.trim(),
          age: numericAge,
          weight: numericWeight,
          bio: bio.trim(),
          character,
          badges,
        },
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      goBackOrReplace('/my-dog');
    } catch {
      setError('Il profilo non è stato salvato. Riprova.');
    } finally {
      setPending(false);
    }
  };
  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 44 : 64}
    >
      <Stack.Screen options={{ title: 'Modifica profilo' }} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 24, gap: 20 }}
      >
        <Text weight="semibold" style={{ fontSize: 26, lineHeight: 36 }}>
          Raccontaci di {dog.name}
        </Text>
        <TextField isInvalid={validation && !name.trim()}>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Nome del cane</Label.Text>
          </Label>
          <Input
            value={name}
            onChangeText={setName}
            maxLength={40}
            style={{ fontFamily: fonts.regular }}
          />
          <FieldError>Inserisci il nome del cane.</FieldError>
        </TextField>
        <TextField isInvalid={validation && !ownerName.trim()}>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Il tuo nome</Label.Text>
          </Label>
          <Input
            value={ownerName}
            onChangeText={setOwnerName}
            maxLength={50}
            style={{ fontFamily: fonts.regular }}
          />
          <FieldError>Inserisci il tuo nome.</FieldError>
        </TextField>
        <TextField isInvalid={validation && !breed.trim()}>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Razza</Label.Text>
          </Label>
          <Input
            value={breed}
            onChangeText={setBreed}
            maxLength={70}
            style={{ fontFamily: fonts.regular }}
          />
          <FieldError>Inserisci la razza o “Meticcio”.</FieldError>
        </TextField>
        <TextField isInvalid={validation && ageInvalid}>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Età in anni</Label.Text>
          </Label>
          <Input
            value={age}
            onChangeText={setAge}
            keyboardType="decimal-pad"
            maxLength={5}
            style={{ fontFamily: fonts.regular }}
          />
          <FieldError>Inserisci un’età tra 0 e 30 anni.</FieldError>
        </TextField>
        <TextField isInvalid={validation && weightInvalid}>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Peso in kg</Label.Text>
          </Label>
          <Input
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            maxLength={5}
            style={{ fontFamily: fonts.regular }}
          />
          <FieldError>Inserisci un peso maggiore di 0 e fino a 120 kg.</FieldError>
        </TextField>
        <View>
          <Text weight="medium" style={{ marginBottom: 10 }}>
            Carattere
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {characters.map((c) => (
              <Button
                size="sm"
                key={c}
                variant="tertiary"
                style={{
                  backgroundColor: character === c ? colors.green : colors.paper,
                  borderRadius: 24,
                }}
                className={
                  character === c
                    ? 'bg-success rounded-full'
                    : 'border-border bg-surface rounded-full border'
                }
                accessibilityState={{ selected: character === c }}
                onPress={() => {
                  if (c !== character) {
                    setCharacter(c);
                    void Haptics.selectionAsync();
                  }
                }}
              >
                <Button.Label
                  numberOfLines={1}
                  style={{
                    fontFamily: fonts.medium,
                    color: character === c ? colors.paper : colors.ink,
                    fontSize: 12,
                  }}
                >
                  {c}
                </Button.Label>
              </Button>
            ))}
          </View>
        </View>
        <View>
          <Text weight="medium" style={{ marginBottom: 10 }}>
            Badge
          </Text>
          <View className="gap-2">
            {badgeOptions.map((b) => (
              <Button
                key={b}
                variant="tertiary"
                className="bg-surface justify-between rounded-2xl"
                accessibilityState={{ selected: badges.includes(b) }}
                onPress={() => {
                  setBadges((current) =>
                    current.includes(b) ? current.filter((item) => item !== b) : [...current, b],
                  );
                  void Haptics.selectionAsync();
                }}
              >
                <Button.Label style={{ fontFamily: fonts.regular }}>{b}</Button.Label>
                {badges.includes(b) ? <Check color={colors.green} size={18} /> : null}
              </Button>
            ))}
          </View>
        </View>
        <TextField>
          <Label>
            <Label.Text style={{ fontFamily: fonts.medium }}>Qualcosa su di voi</Label.Text>
          </Label>
          <Input
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={600}
            style={{ fontFamily: fonts.regular, minHeight: 120, textAlignVertical: 'top' }}
          />
        </TextField>
        {error ? <ErrorNotice message={error} retry={() => void save()} /> : null}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 16),
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <Button
          className="h-14 rounded-3xl"
          isDisabled={!ready || pending}
          onPress={() => void save()}
        >
          {pending ? <Spinner size="sm" color={colors.ink} /> : null}
          <Button.Label style={{ fontFamily: fonts.semibold }}>
            {pending ? 'Salvataggio…' : 'Salva profilo'}
          </Button.Label>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="mt-1"
          onPress={() => goBackOrReplace('/my-dog')}
        >
          <Button.Label>Annulla</Button.Label>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
