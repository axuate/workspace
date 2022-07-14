import { HttpRequest } from './HttpRequest';
import { Readable } from 'stream';
import type { IncomingHttpHeaders, IncomingMessage } from 'http';

describe('HttpRequest', () => {
  test('Exports a class called HttpRequest', () => {
    expect(HttpRequest).toBeInstanceOf(Function);
  });

  describe('fromIncomingMessage', () => {
    test('has a static method fromIncomingMessage', () => {
      expect(HttpRequest.fromIncomingMessage).toBeInstanceOf(Function);
    });

    test('creates a HttpRequest', () => {
      const req = {
        method: 'GET',
        url: '/test',
        headers: {
          'content-type': 'application/json'
        } as IncomingHttpHeaders
      } as IncomingMessage;
      expect(HttpRequest.fromIncomingMessage(req)).toBeInstanceOf(HttpRequest);
    });
  });

  describe('getQuery', () => {
    test('has a public method getQuery', () => {
      expect(HttpRequest.prototype.getQuery).toBeInstanceOf(Function);
    });

    test('returns an empty object if no query parameter exist', () => {
      const request = new HttpRequest('GET', '/test');
      expect(request.getQuery()).toEqual({});
    });

    test('returns a record with all query parameter', () => {
      const request = new HttpRequest('GET', '/test?a=b');
      expect(request.getQuery()).toEqual({
        a: 'b'
      });
    });
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
