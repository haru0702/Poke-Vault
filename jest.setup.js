const { jest } = require('@jest/globals');
// Icons are visual assets; navigation and screen behavior remain real in integration tests.
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
