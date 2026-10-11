import { View } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { colors } from '@/lib/theme';
import { Text } from './Text';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <View className="flex-row items-center gap-2">
      <Svg
        width={compact ? 46 : 55}
        height={38}
        viewBox="0 0 90 55"
        accessibilityLabel="Una mano e una zampa si incontrano"
      >
        <Path
          d="M2 40L16 34L26 31L39 20Q44 16 47 20Q48 23 43 26L34 33L42 32Q47 31 46 35L39 40Q35 43 27 44L17 49L2 51"
          fill={colors.orange}
        />
        <Path
          d="M33 34L25 36M19 41L27 39"
          stroke={colors.cream}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M88 6L73 12L64 21Q60 25 57 27Q52 30 54 35Q56 40 61 37L71 32Q76 29 79 23L88 19"
          fill={colors.green}
        />
        <Ellipse
          cx={54}
          cy={22}
          rx={3.4}
          ry={4.3}
          transform="rotate(35 54 22)"
          fill={colors.green}
        />
        <Ellipse
          cx={62}
          cy={15}
          rx={3.4}
          ry={4.3}
          transform="rotate(35 62 15)"
          fill={colors.green}
        />
        <Ellipse cx={71} cy={9} rx={3} ry={4} transform="rotate(35 71 9)" fill={colors.green} />
      </Svg>
      <Text
        weight="bold"
        style={{ fontSize: compact ? 22 : 25, lineHeight: 35, letterSpacing: -1 }}
      >
        <Text
          weight="bold"
          style={{ fontSize: compact ? 22 : 25, lineHeight: 35, color: colors.orangeInk }}
        >
          Leash
        </Text>
        Love
      </Text>
    </View>
  );
}
