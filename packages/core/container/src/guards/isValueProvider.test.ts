import { isValueProvider } from './isValueProvider';

describe('isValueProvider', () => {
  test('exports a function called isValueProvider', () => {
    expect(isValueProvider).toBeInstanceOf(Function);
  });

  test('returns true if provider is a value provider', () => {
    expect(isValueProvider({ token: 'Test', useValue: 'test' })).toBe(true);
  });

  test('returns false if provider is not a value provider', () => {
    expect(isValueProvider({ token: 'Test', useClass: jest.fn() })).toBe(false);
  });
});
