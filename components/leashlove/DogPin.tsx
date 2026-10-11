import { View } from 'react-native';
import { colors } from '@/lib/theme';
import { Text } from './Text';
import { DogPhoto } from './DogPhoto';

export function DogPin({
  photo,
  name,
  selected,
}: {
  photo: string;
  name: string;
  selected: boolean;
}) {
  return (
    <View style={{ alignItems: 'center', width: 78 }}>
      <View
        style={{
          padding: 3,
          borderRadius: 32,
          backgroundColor: selected ? colors.orange : colors.paper,
          borderWidth: 1,
          borderColor: selected ? colors.orange : colors.line,
        }}
      >
        <DogPhoto uri={photo} size={selected ? 50 : 42} />
      </View>
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: selected ? colors.orange : colors.paper,
          transform: [{ rotate: '45deg' }],
          marginTop: -6,
        }}
      />
      <View
        style={{
          backgroundColor: colors.paper,
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 10,
          marginTop: 3,
        }}
      >
        <Text weight="semibold" numberOfLines={1} style={{ fontSize: 11, lineHeight: 17 }}>
          {name}
        </Text>
      </View>
    </View>
  );
}
