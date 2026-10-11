import { Typography } from 'heroui-native';
import type { TextProps } from 'react-native';
import { colors, fonts } from '@/lib/theme';

export function Text({
  style,
  weight = 'regular',
  ...props
}: TextProps & { className?: string; weight?: keyof typeof fonts }) {
  return (
    <Typography
      {...props}
      style={[
        { fontFamily: fonts[weight], color: colors.ink, fontSize: 14, lineHeight: 21 },
        style,
      ]}
    />
  );
}
