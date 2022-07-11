import { getTokenName } from './getTokenName';

describe('getTokenName', () => {
  test('exports a function called getTokenName', () => {
    expect(getTokenName).toBeInstanceOf(Function);
  });

  test('returns name of string token', () => {
    expect(getTokenName('Test')).toBe('Test');
  });

  test('returns name of symbol token', () => {
    expect(getTokenName(Symbol('Test'))).toBe('Test');
  });

  test('returns name of constructor token', () => {
    class Test {}
    expect(getTokenName(Test)).toBe('Test');
  });
});
