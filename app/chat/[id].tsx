import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Input, PressableFeedback, Spinner } from 'heroui-native';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { MapPin, Send, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { AnimatedView } from '@/components/ui/primitives/AnimatedView';
import { dogs, isOnline, distanceKm, formatDistance, timeText, type Message } from '@/lib/dogs';
import { useAppStore, sendMessage, saveLocal, hydrateLocal } from '@/lib/store';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { DogPhoto } from '@/components/leashlove/DogPhoto';
import { EmptyState, ErrorNotice, ListLoading } from '@/components/leashlove/Feedback';

function renderMessage({ item }: { item: Message }) {
  const mine = item.senderId === 'me';
  return (
    <AnimatedView
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(120)}
      style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '85%', marginBottom: 12 }}
    >
      <View
        style={{
          backgroundColor: mine ? colors.orange : colors.soft,
          borderRadius: 18,
          borderBottomRightRadius: mine ? 5 : 18,
          borderBottomLeftRadius: mine ? 18 : 5,
          paddingHorizontal: 15,
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        <Text style={{ fontSize: 13, lineHeight: 22 }}>{item.text}</Text>
        <View className="mt-1 flex-row items-center justify-end gap-1">
          <Text style={{ color: mine ? colors.ink : colors.muted, fontSize: 11, lineHeight: 16 }}>
            {timeText(item.createdAt)}
          </Text>
          {mine ? (
            <Check
              color={colors.ink}
              size={12}
              strokeWidth={1.8}
              accessibilityLabel="Salvato sul dispositivo"
            />
          ) : null}
        </View>
      </View>
    </AnimatedView>
  );
}

export default function ChatScreen() {
  const { id, propose } = useLocalSearchParams<{ id: string; propose?: string }>();
  const dog = dogs.find((d) => d.id === id);
  const chats = useAppStore((s) => s.chats);
  const myDog = useAppStore((s) => s.myDog);
  const position = useAppStore((s) => s.position);
  const now = useAppStore((s) => s.now);
  const ready = useAppStore((s) => s.ready);
  const storageError = useAppStore((s) => s.storageError);
  const chat = chats.find((c) => c.dogId === id);
  const [draft, setDraft] = useState(
    propose && dog ? `Ciao ${dog.ownerName}! Ti va una passeggiata con ${myDog.name}?` : '',
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const list = useRef<FlatList<Message>>(null);
  const insets = useSafeAreaInsets();
  const chatId = `chat-${id}`;

  useEffect(() => {
    if (!ready || !chat?.unread) return;
    void saveLocal({
      chats: useAppStore.getState().chats.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c)),
    }).catch(() => setError('Non riusciamo ad aggiornare la conversazione. Riprova.'));
  }, [ready, chat?.unread, chatId]);
  const send = async () => {
    if (!draft.trim() || sending || !dog) return;
    setSending(true);
    setError(null);
    try {
      await sendMessage(chatId, dog.id, draft);
      setDraft('');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      setError('Il messaggio non è stato salvato. Riprova.');
    } finally {
      setSending(false);
    }
  };
  if (!dog)
    return (
      <EmptyState
        title="Conversazione non disponibile"
        action="Torna alle chat"
        onPress={() => router.replace('/chats')}
      />
    );
  const online = isOnline(dog, now);
  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 44 : 64}
    >
      <Stack.Screen
        options={{
          title: dog.name,
          headerTitle: () => (
            <PressableFeedback
              className="flex-row items-center gap-2.5"
              onPress={() => router.push({ pathname: '/dog/[id]', params: { id: dog.id } })}
              accessibilityLabel={`Profilo di ${dog.name}`}
            >
              <DogPhoto uri={dog.photo} size={36} />
              <View>
                <Text weight="semibold" style={{ fontSize: 15, lineHeight: 22 }}>
                  {dog.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 16,
                    color: online ? colors.green : colors.muted,
                  }}
                >
                  {online ? 'Online' : 'Non a spasso'}
                </Text>
              </View>
            </PressableFeedback>
          ),
          headerRight: () => (
            <Button
              variant="ghost"
              isIconOnly
              size="sm"
              accessibilityLabel={`Vedi ${dog.name} sulla mappa`}
              onPress={() => router.navigate({ pathname: '/', params: { dogId: dog.id } })}
            >
              <MapPin size={21} color={colors.green} strokeWidth={1.8} />
            </Button>
          ),
        }}
      />
      <View className="border-border border-b px-5 pt-3 pb-3">
        <View className="flex-row items-center justify-center gap-1.5">
          <MapPin size={13} color={colors.green} strokeWidth={1.8} />
          <Text
            numberOfLines={2}
            style={{ fontSize: 11, color: colors.green, textAlign: 'center' }}
          >
            {dog.name} è a {formatDistance(distanceKm(position, dog))} da te · {dog.place}
          </Text>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 11, color: colors.muted, marginTop: 7 }}>
          Chat demo · messaggi non inviati
        </Text>
      </View>
      {!ready ? (
        <ListLoading />
      ) : (
        <FlatList
          ref={list}
          data={chat?.messages ?? []}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 28,
            paddingBottom: 20,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => list.current?.scrollToEnd({ animated: false })}
          ListHeaderComponent={
            chat?.messages.length ? (
              <Text
                style={{ textAlign: 'center', fontSize: 11, color: colors.muted, marginBottom: 22 }}
              >
                Conversazione di esempio
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              title={`Rompi il ghiaccio con ${dog.name}`}
              action="Proponi una passeggiata"
              onPress={() =>
                setDraft(`Ciao ${dog.ownerName}! Ti va una passeggiata con ${myDog.name}?`)
              }
            />
          }
        />
      )}
      {error ? (
        <View className="px-4 pb-2">
          <ErrorNotice message={error} retry={() => void send()} />
        </View>
      ) : storageError ? (
        <View className="px-4 pb-2">
          <ErrorNotice message={storageError} retry={() => void hydrateLocal()} />
        </View>
      ) : null}
      {!router.canGoBack() ? (
        <Link
          href="/chats"
          style={{ textAlign: 'center', color: colors.green, padding: 8, fontFamily: fonts.medium }}
        >
          Torna alle chat
        </Link>
      ) : null}
      <View
        style={{
          paddingBottom: Math.max(insets.bottom, 14),
          paddingTop: 12,
          paddingHorizontal: 16,
          borderTopWidth: 1,
          borderTopColor: colors.line,
        }}
      >
        <View className="flex-row items-end gap-2">
          <Input
            value={draft}
            onChangeText={setDraft}
            placeholder="Scrivi un messaggio…"
            accessibilityLabel="Messaggio"
            multiline
            maxLength={2000}
            className="border-border bg-surface min-h-12 flex-1 rounded-3xl border px-4"
            style={{ fontFamily: fonts.regular, fontSize: 13, maxHeight: 110 }}
            editable={!sending}
          />
          <Button
            isIconOnly
            className="h-12 w-12 rounded-full"
            accessibilityLabel="Salva messaggio demo"
            isDisabled={!ready || !draft.trim() || sending}
            onPress={() => void send()}
          >
            {sending ? (
              <Spinner size="sm" color={colors.ink} />
            ) : (
              <Send size={20} color={colors.ink} strokeWidth={1.8} />
            )}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
