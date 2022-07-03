import { isPrimitive } from './isPrimitive';

describe('isPrimitive', () => {
  test('exports a function called isPrimitive', () => {
    expect(isPrimitive).toBeInstanceOf(Function);
  });

  test('returns true if type is String', () => {
    expect(isPrimitive(String)).toBe(true);
  });

  test('returns true if type is Number', () => {
    expect(isPrimitive(Number)).toBe(true);
  });

  test('returns true if type is Boolean', () => {
    expect(isPrimitive(Boolean)).toBe(true);
  });

  test('returns false if type is not primitive', () => {
    class A {}
    expect(isPrimitive(A)).toBe(false);
  });
});
