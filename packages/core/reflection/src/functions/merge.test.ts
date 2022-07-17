import { merge } from './merge';

describe('merge', () => {
  const a = Symbol('a');
  const b = Symbol('b');

  test('exports a function called merge', () => {
    expect(merge).toBeInstanceOf(Function);
  });

  test('returns a new object if the current is undefined', () => {
    const result = new Map();
    result.set(a, 1);
    expect(merge(undefined, a, 1)).toEqual(result);
  });

  test('should merge two objects with only primitive values', () => {
    const map = new Map();
    map.set(a, 1);
    const result = new Map();
    result.set(a, 1);
    result.set(b, 2);
    expect(merge(map, b, 2)).toEqual(result);
  });

  test('should override existing keys', () => {
    const map = new Map();
    map.set(a, 1);
    const result = new Map();
    result.set(a, 2);
    expect(merge(map, a, 2)).toEqual(result);
  });

  test('should merge two arrays', () => {
    const map = new Map();
    map.set(a, [1]);
    const result = new Map();
    result.set(a, [1, 2]);
    expect(merge(map, a, [2])).toEqual(result);
  });

  test('should override existing value if it is not also an array', () => {
    const map = new Map();
    map.set(a, 1);
    const result = new Map();
    result.set(a, [2]);
    expect(merge(map, a, [2])).toEqual(result);
  });
});
