import { RequestCookie } from './RequestCookie';

describe('RequestCookie', () => {
  test('Exports a class called RequestCookie', () => {
    expect(RequestCookie).toBeInstanceOf(Function);
  });

  describe('parseCookies', () => {
    test('Has a static method called parseCookie', () => {
      expect(RequestCookie.parseCookies).toBeInstanceOf(Function);
    });

    test('Returns an empty array if the given string is empty', () => {
      expect(RequestCookie.parseCookies('')).toEqual([]);
    });

    test('Returns an empty array if the given string is undefined', () => {
      expect(RequestCookie.parseCookies(undefined)).toEqual([]);
    });

    test('Returns a single RequestCookie', () => {
      expect(RequestCookie.parseCookies('test=1234')).toEqual([{ name: 'test', value: '1234' }]);
    });

    test('Returns multiple instances of RequestCookie', () => {
      expect(RequestCookie.parseCookies('test=1234;a=b')).toEqual([
        { name: 'test', value: '1234' },
        { name: 'a', value: 'b' }
      ]);
    });
  });

  describe('toCookie', () => {
    test('Has a static method toCookie', () => {
      expect(RequestCookie.toCookie).toBeInstanceOf(Function);
    });

    test('Returns undefined if array is empty', () => {
      expect(RequestCookie.toCookie([])).toBeUndefined();
    });

    test('Returns a single cookie', () => {
      const cookie = new RequestCookie('a', 'b');
      expect(RequestCookie.toCookie([cookie])).toBe('a=b');
    });

    test('Joins multiple cookies', () => {
      expect(
        RequestCookie.toCookie([new RequestCookie('a', 'b'), new RequestCookie('b', 'c')])
      ).toBe('a=b;b=c');
    });
  });

  test('Returns a valid cookie when calling toString', () => {
    const cookie = new RequestCookie('a', 'b');
    expect(cookie.toString()).toBe('a=b');
  });
});
