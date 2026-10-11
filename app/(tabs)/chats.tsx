import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Input, PressableFeedback } from 'heroui-native';
import { router } from 'expo-router';
import { Search, CheckCheck } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore, hydrateLocal } from '@/lib/store';
import { dogs, isOnline, timeText, type Chat } from '@/lib/dogs';
import { colors, fonts } from '@/lib/theme';
import { Text } from '@/components/leashlove/Text';
import { DogPhoto } from '@/components/leashlove/DogPhoto';
import { EmptyState, ErrorNotice, ListLoading } from '@/components/leashlove/Feedback';

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  const chats = useAppStore((s) => s.chats);
  const now = useAppStore((s) => s.now);
  const ready = useAppStore((s) => s.ready);
  const error = useAppStore((s) => s.storageError);
  const [search, setSearch] = useState('');
  const filtered = chats.filter((c) => {
    const dog = dogs.find((d) => d.id === c.dogId);
    return (
      dog &&
      `${dog.name} ${dog.ownerName}`
        .toLocaleLowerCase('it')
        .includes(search.toLocaleLowerCase('it'))
    );
  });
  const renderChat = ({ item }: { item: Chat }) => {
    const dog = dogs.find((d) => d.id === item.dogId);
    if (!dog) return null;
    const last = item.messages[item.messages.length - 1];
    return (
      <PressableFeedback
        className="border-border mx-6 flex-row gap-3 border-b py-5"
        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.dogId } })}
        accessibilityLabel={`Chat con ${dog.name}`}
      >
        <View>
          <DogPhoto uri={dog.photo} size={60} />
          {isOnline(dog, now) ? (
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: 15,
                height: 15,
                borderRadius: 8,
                borderWidth: 3,
                borderColor: colors.cream,
                backgroundColor: colors.green,
              }}
            />
          ) : null}
        </View>
        <View className="flex-1">
          <View className="mb-1 flex-row items-center justify-between gap-3">
            <Text weight="semibold" style={{ fontSize: 17 }}>
              {dog.name}
            </Text>
            <Text style={{ fontSize: 11, color: item.unread ? colors.green : colors.muted }}>
              {last ? timeText(last.createdAt) : ''}
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            {last?.senderId === 'me' ? (
              <CheckCheck size={15} color={colors.muted} strokeWidth={1.8} />
            ) : null}
            <Text
              numberOfLines={2}
              style={{ flex: 1, fontSize: 12, lineHeight: 19, color: colors.muted }}
            >
              {last?.text ?? 'Proponi una passeggiata'}
            </Text>
            {item.unread ? (
              <View className="bg-success h-5 min-w-5 items-center justify-center rounded-full px-1">
                <Text style={{ fontSize: 11, lineHeight: 16, color: colors.paper }}>
                  {item.unread}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </PressableFeedback>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.cream, paddingTop: insets.top }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View className="px-6 pt-6 pb-5">
        <Text weight="semibold" style={{ fontSize: 30, lineHeight: 42, letterSpacing: -0.8 }}>
          Le tue chat
        </Text>
        <View className="bg-surface mt-5 flex-row items-center gap-2 rounded-2xl px-3">
          <Search size={18} color={colors.muted} strokeWidth={1.8} />
          <Input
            accessibilityLabel="Cerca una conversazione"
            placeholder="Cerca un amico"
            value={search}
            onChangeText={setSearch}
            className="h-12 flex-1 border-0 bg-transparent shadow-none"
            style={{ fontFamily: fonts.regular, fontSize: 13 }}
          />
        </View>
      </View>
      {error ? (
        <View className="px-6">
          <ErrorNotice message={error} retry={() => void hydrateLocal()} />
        </View>
      ) : null}
      <View className="mx-6 mb-1 flex-row items-center gap-2">
        <View className="bg-success h-1.5 w-1.5 rounded-full" />
        <Text style={{ color: colors.green, fontSize: 11 }}>Chat demo · messaggi non inviati</Text>
      </View>
      {!ready ? (
        <ListLoading />
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderChat}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <EmptyState
              title={search ? 'Nessuna chat trovata' : 'Le nuove amicizie cominciano con un ciao'}
              action={search ? 'Cancella ricerca' : 'Trova un amico'}
              onPress={() => (search ? setSearch('') : router.navigate('/'))}
            />
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}
