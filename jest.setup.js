require('@testing-library/jest-native/extend-expect');

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('expo-constants', () => ({ manifest: {} }));
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: View };
});
jest.mock('expo-linking', () => ({ createURL: jest.fn(() => 'exp://mock-url') }));
