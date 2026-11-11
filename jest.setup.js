jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (value) => ({ value }),
    useAnimatedStyle: (fn) => fn(),
    withTiming: (value) => value,
  };
});
jest.mock('expo-constants', () => ({ manifest: {} }));
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: View };
});
jest.mock('expo-linking', () => ({ createURL: jest.fn(() => 'exp://mock-url') }));
