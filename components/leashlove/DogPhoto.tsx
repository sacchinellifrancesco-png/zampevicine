import { useState } from 'react';
import { Image, View } from 'react-native';
import { Dog as DogIcon } from 'lucide-react-native';
import { colors } from '@/lib/theme';

export function DogPhoto({
  uri,
  size = 56,
  rounded = true,
}: {
  uri: string;
  size?: number;
  rounded?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? size / 2 : 12,
        overflow: 'hidden',
        backgroundColor: colors.greenSoft,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {failed ? (
        <DogIcon size={size * 0.45} color={colors.green} strokeWidth={1.8} />
      ) : (
        <Image
          resizeMode="cover"
          source={{ uri }}
          accessibilityLabel="Foto del cane"
          onError={() => setFailed(true)}
          style={{ width: size, height: size, resizeMode: 'cover' }}
        />
      )}
    </View>
  );
}
