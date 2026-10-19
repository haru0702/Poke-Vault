const { jest } = require('@jest/globals');
// Icons are visual assets; navigation and screen behavior remain real in integration tests.
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('expo-crypto', () => {
  let count = 0;
  return { randomUUID: () => `11111111-1111-4111-8111-${(++count).toString(16).padStart(12, '0')}` };
});
global.fetch = jest.fn().mockRejectedValue(new Error('No network in automated tests'));
