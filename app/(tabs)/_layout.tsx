import { Tabs } from 'expo-router';
import { MapPin, MessageCircle, PawPrint } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { colors, fonts } from '@/lib/theme';
import { useAppStore } from '@/lib/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const chats = useAppStore((s) => s.chats);
  const unread = chats.reduce((total, chat) => total + chat.unread, 0);
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object -- Expo StatusBar.style is a theme string, not a React Native style object. */}
      <StatusBar style="dark" />
      <Tabs
        screenListeners={({ navigation, route }) => ({
          tabPress: () => {
            const state = navigation.getState();
            if (state.routes[state.index]?.key !== route.key) void Haptics.selectionAsync();
          },
        })}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.cream },
          tabBarStyle: {
            backgroundColor: colors.cream,
            borderTopColor: colors.line,
            height: 72 + Math.max(insets.bottom, 16),
            paddingTop: 8,
            paddingBottom: Math.max(insets.bottom, 16),
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: colors.orangeInk,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11, marginTop: 4 },
          tabBarBadgeStyle: {
            backgroundColor: colors.orange,
            color: colors.ink,
            fontFamily: fonts.semibold,
            fontSize: 11,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Esplora',
            tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} strokeWidth={1.8} />,
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chat',
            tabBarBadge: unread || undefined,
            tabBarIcon: ({ color, size }) => (
              <MessageCircle color={color} size={size} strokeWidth={1.8} />
            ),
          }}
        />
        <Tabs.Screen
          name="my-dog"
          options={{
            title: 'Il mio cane',
            tabBarIcon: ({ color, size }) => (
              <PawPrint color={color} size={size} strokeWidth={1.8} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
