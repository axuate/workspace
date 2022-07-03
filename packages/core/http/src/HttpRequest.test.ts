import { HttpRequest } from './HttpRequest';
import { Readable } from 'stream';

describe('HttpRequest', () => {
  test('Exports a class called HttpRequest', () => {
    expect(HttpRequest).toBeInstanceOf(Function);
  });

  describe('getHeader', () => {
    test('has a public method getHeader', () => {
      expect(HttpRequest.prototype.getHeader).toBeInstanceOf(Function);
    });

    test('returns undefined if header is not set', () => {
      const request = new HttpRequest('GET', '/');
      expect(request.getHeader('Content-Type')).toBeUndefined();
    });

    test('returns the headers value if it is defined', () => {
      const request = new HttpRequest('GET', '/', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(request.getHeader('Content-Type')).toBe('application/json');
    });
  });

  describe('hasHeader', () => {
    test('has a public method hasHeader', () => {
      expect(HttpRequest.prototype.hasHeader).toBeInstanceOf(Function);
    });

    test('returns false if header does not exist', () => {
      const request = new HttpRequest('GET', '/');
      expect(request.hasHeader('Content-Type')).toBe(false);
    });

    test('returns true if header exists', () => {
      const request = new HttpRequest('GET', '/', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(request.hasHeader('Content-Type')).toBe(true);
    });
  });

  describe('getHeaders', () => {
    test('has a public method getHeaders', () => {
      expect(HttpRequest.prototype.getHeaders).toBeInstanceOf(Function);
    });

    test('returns an empty array if no headers are set', () => {
      const request = new HttpRequest('GET', '/');
      expect(request.getHeaders()).toStrictEqual({});
    });

    test('returns an object of all headers', () => {
      const request = new HttpRequest('GET', '/', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(request.getHeaders()).toEqual({
        'Content-Type': 'application/json'
      });
    });
  });

  describe('getMethod', () => {
    test('has a public method getMethod', () => {
      expect(HttpRequest.prototype.getMethod).toBeInstanceOf(Function);
    });

    test('returns the request method', () => {
      const request = new HttpRequest('GET', '/');
      expect(request.getMethod()).toBe('GET');
    });
  });

  describe('getPath', () => {
    test('has a public method getPath', () => {
      expect(HttpRequest.prototype.getPath).toBeInstanceOf(Function);
    });

    test('returns the request path', () => {
      const request = new HttpRequest('GET', '/abc');
      expect(request.getPath()).toBe('/abc');
    });
  });

  describe('getBody', () => {
    test('has a public method getBody', () => {
      expect(HttpRequest.prototype.getBody).toBeInstanceOf(Function);
    });

    test('returns a readable stream', () => {
      const request = new HttpRequest('POST', '/user', {
        body: Readable.from('a')
      });
      expect(request.getBody()).toBeInstanceOf(Readable);
    });

    test('returns undefined if no body is set', () => {
      const request = new HttpRequest('GET', '/user');
      expect(request.getBody()).toBeUndefined();
    });
  });
});
