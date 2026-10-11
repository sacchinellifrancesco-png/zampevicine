import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/lib/theme';

export function UserPin({ visible }: { visible: boolean }) {
  const reducedMotion = useReducedMotion();
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (visible && !reducedMotion)
      pulse.set(
        withRepeat(withTiming(1, { duration: 1600, easing: Easing.out(Easing.quad) }), -1, false),
      );
    else {
      cancelAnimation(pulse);
      pulse.set(0);
    }
    return () => cancelAnimation(pulse);
  }, [visible, reducedMotion, pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: (1 - pulse.value) * 0.6,
    transform: [{ scale: 1 + pulse.value * 0.55 }],
  }));
  return (
    <View style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
      {visible ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: colors.orange,
            },
            pulseStyle,
          ]}
        />
      ) : null}
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.blue,
          borderWidth: visible ? 4 : 3,
          borderColor: visible ? colors.orange : colors.paper,
        }}
      />
    </View>
  );
}
