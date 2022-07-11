import { isFactoryProvider } from './isFactoryProvider';

describe('isFactoryProvider', () => {
  test('exports a function called isFactoryProvider', () => {
    expect(isFactoryProvider).toBeInstanceOf(Function);
  });

  test('returns true if provider is a factory provider', () => {
    expect(isFactoryProvider({ token: 'Test', useFactory: jest.fn() })).toBe(true);
  });

  test('returns false if provider is not a factory provider', () => {
    expect(isFactoryProvider({ token: 'Test', useValue: 'Test' })).toBe(false);
  });
});
