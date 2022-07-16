import { compilePath } from './compilePath';

describe('compilePath', () => {
  test('exports a function compilePath', () => {
    expect(compilePath).toBeInstanceOf(Function);
  });

  test('returns original path', () => {
    expect(compilePath({ path: '/test' })).toBe('/test');
  });

  test('add given prefix', () => {
    expect(compilePath({ path: '/test', prefix: '/user' })).toBe('/user/test');
  });

  test('add version before prefix', () => {
    expect(compilePath({ path: '/test', prefix: '/user', version: 1 })).toBe('/v1/user/test');
  });
});
