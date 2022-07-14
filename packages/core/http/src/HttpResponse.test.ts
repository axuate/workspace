import { HttpResponse } from './HttpResponse';
import { HttpStatusCode } from './entities/HttpStatusCode';
import { Readable } from 'stream';
import type { ServerResponse } from 'http';

describe('HttpResponse', () => {
  test('exports a class called HttpResponse', () => {
    expect(HttpResponse).toBeInstanceOf(Function);
  });

  describe('toServerResponse', () => {
    test('has a public method toServerResponse', () => {
      expect(HttpResponse.prototype.toServerResponse).toBeInstanceOf(Function);
    });

    test('adds all information to server response object', () => {
      const res = {
        setHeader: jest.fn(),
        write: jest.fn()
      } as any as ServerResponse;
      const response = new HttpResponse(200);
      response.setHeader('content-type', 'application/json');
      response.setBody(Readable.from('Test'));
      response.toServerResponse(res);
      expect(res.statusCode).toBe(200);
      expect(res.write).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith('content-type', 'application/json');
    });
  });

  describe('getStatus', () => {
    test('has a public method getStatus', () => {
      expect(HttpResponse.prototype.getStatus).toBeInstanceOf(Function);
    });

    test('returns the defined status code', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.getStatus()).toBe(HttpStatusCode.OK);
    });
  });

  describe('setBody', () => {
    test('has a public method setBody', () => {
      expect(HttpResponse.prototype.setBody).toBeInstanceOf(Function);
    });

    test('returns the own instance', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.setBody(Readable.from('Test'))).toBe(response);
    });
  });

  describe('getBody', () => {
    test('has a public method getBody', () => {
      expect(HttpResponse.prototype.getBody).toBeInstanceOf(Function);
    });

    test('returns undefined if no body has been set', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.getBody()).toBeUndefined();
    });

    test('returns the set body readable stream', () => {
      const response = new HttpResponse(HttpStatusCode.OK).setBody(Readable.from('Test'));
      expect(response.getBody()).toBeInstanceOf(Readable);
    });
  });

  describe('getHeader', () => {
    test('has a public method getHeader', () => {
      expect(HttpResponse.prototype.getHeader).toBeInstanceOf(Function);
    });

    test('returns undefined if header is not set', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.getHeader('Content-Type')).toBeUndefined();
    });

    test('returns the headers value if defined', () => {
      const response = new HttpResponse(HttpStatusCode.OK).setHeader(
        'Content-Type',
        'application/json'
      );
      expect(response.getHeader('Content-Type')).toBe('application/json');
    });
  });

  describe('setHeader', () => {
    test('has a public method setHeader', () => {
      expect(HttpResponse.prototype.setHeader).toBeInstanceOf(Function);
    });

    test('returns the own instance', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.setHeader('Content-Type', 'application/json')).toBe(response);
    });
  });

  describe('removeHeader', () => {
    test('has a public method removeHeader', () => {
      expect(HttpResponse.prototype.removeHeader).toBeInstanceOf(Function);
    });

    test('removes a header', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      response.setHeader('a', 'b');
      expect(response.getHeader('a')).toBe('b');
      response.removeHeader('a');
      expect(response.getHeader('a')).toBeUndefined();
    });

    test('returns the own instance', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.removeHeader('')).toBe(response);
    });
  });

  describe('getHeaders', () => {
    test('has a public method getHeaders', () => {
      expect(HttpResponse.prototype.getHeaders).toBeInstanceOf(Function);
    });

    test('returns an empty array if no headers are set', () => {
      const response = new HttpResponse(HttpStatusCode.OK);
      expect(response.getHeaders()).toStrictEqual({});
    });

    test('returns an object of all headers', () => {
      const response = new HttpResponse(HttpStatusCode.OK).setHeader('a', 'b').setHeader('b', 'c');
      expect(response.getHeaders()).toStrictEqual({
        a: 'b',
        b: 'c'
      });
    });
  });
});
