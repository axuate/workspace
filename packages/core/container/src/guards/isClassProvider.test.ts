import { isClassProvider } from './isClassProvider';

describe('isClassProvider', () => {
  test('exports a function called isClassProvider', () => {
    expect(isClassProvider).toBeInstanceOf(Function);
  });

  test('returns true if provider is a class provider', () => {
    expect(isClassProvider({ token: 'Test', useClass: jest.fn() })).toBe(true);
  });

  test('returns false if provider is not a class provider', () => {
    expect(isClassProvider({ token: 'Test', useValue: 'Test' })).toBe(false);
  });
});
