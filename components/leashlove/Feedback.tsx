import { View } from 'react-native';
import { Button, Skeleton } from 'heroui-native';
import { AlertCircle, PawPrint } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { colors } from '@/lib/theme';
import { Text } from './Text';

export function ErrorNotice({ message, retry }: { message: string; retry?: () => void }) {
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    // eslint-disable-next-line react/exhaustive-effect-dependencies -- Each new error message intentionally triggers haptic feedback.
  }, [message]);
  return (
    <View className="bg-surface gap-2 rounded-2xl p-4">
      <View className="flex-row items-start gap-2">
        <AlertCircle color={colors.danger} size={18} />
        <Text style={{ color: colors.danger, flex: 1 }}>{message}</Text>
      </View>
      {retry ? (
        <Button size="sm" variant="tertiary" onPress={retry}>
          <Button.Label>Riprova</Button.Label>
        </Button>
      ) : null}
    </View>
  );
}
export function EmptyState({
  title,
  action,
  onPress,
}: {
  title: string;
  action: string;
  onPress: () => void;
}) {
  return (
    <View className="items-center gap-4 px-6 py-8">
      <PawPrint size={36} strokeWidth={1.6} color={colors.green} />
      <Text weight="semibold" style={{ textAlign: 'center' }}>
        {title}
      </Text>
      <Button variant="secondary" onPress={onPress}>
        <Button.Label>{action}</Button.Label>
      </Button>
    </View>
  );
}
export function ListLoading() {
  return (
    <View className="gap-6 p-6">
      {[0, 1, 2].map((i) => (
        <View key={i} className="flex-row gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <View className="flex-1 gap-3">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
          </View>
        </View>
      ))}
    </View>
  );
}
