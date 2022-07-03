import { ResponseCookie } from './ResponseCookie';

describe('ResponseCookie', () => {
  test('Exports a class called ResponseCookie', () => {
    expect(ResponseCookie).toBeInstanceOf(Function);
  });

  describe('toString', () => {
    test('has a method toString', () => {
      expect(ResponseCookie.prototype.toString).toBeInstanceOf(Function);
    });

    test('returns a simple cookie with name and value', () => {
      const cookie = new ResponseCookie('a', 'b');
      expect(cookie.toString()).toBe('a=b');
    });

    test('returns a cookie with Expire attribute set', () => {
      const cookie = new ResponseCookie('a', 'b', {
        expires: 1656848645335
      });
      expect(cookie.toString()).toBe('a=b;Expires=1656848645335');
    });

    test('returns a cookie with Max-Age set to 100', () => {
      const cookie = new ResponseCookie('a', 'b', {
        maxAge: 100
      });
      expect(cookie.toString()).toBe('a=b;Max-Age=100');
    });

    test('returns a cookie with Domain set to test.com', () => {
      const cookie = new ResponseCookie('a', 'b', {
        domain: 'test.com'
      });
      expect(cookie.toString()).toBe('a=b;Domain=test.com');
    });

    test('returns a cookie with Path set to /test', () => {
      const cookie = new ResponseCookie('a', 'b', {
        path: '/test'
      });
      expect(cookie.toString()).toBe('a=b;Path=/test');
    });

    test('returns a cookie with secure flag', () => {
      const cookie = new ResponseCookie('a', 'b', {
        secure: true
      });
      expect(cookie.toString()).toBe('a=b;Secure');
    });

    test('returns a cookie with HttpOnly flag', () => {
      const cookie = new ResponseCookie('a', 'b', {
        httpOnly: true
      });
      expect(cookie.toString()).toBe('a=b;HttpOnly');
    });

    test('returns a cookie with SameSite set to Strict', () => {
      const cookie = new ResponseCookie('a', 'b', {
        sameSite: 'Strict'
      });
      expect(cookie.toString()).toBe('a=b;SameSite=Strict');
    });
  });
});
