import { createListener } from './createListener';
import type { Router } from '@axuate/router';
import type { IncomingMessage, ServerResponse } from 'http';
import { HttpRequest, HttpResponse } from '@axuate/http';
import type { RequestHandler } from '../entities/RequestHandler';

jest.mock('@axuate/http');

describe('createListener', () => {
  const router = { route: jest.fn() } as any as Router<RequestHandler>;
  const req = { method: 'GET', url: '/test' } as IncomingMessage;
  const res = { end: jest.fn() } as any as ServerResponse;

  test('exports a function called createListener', () => {
    expect(createListener).toBeInstanceOf(Function);
  });

  test('returns a listener function', () => {
    expect(createListener(router)).toBeInstanceOf(Function);
  });

  test('creates a HttpRequest from IncomingMessage', () => {
    const listener = createListener(router);
    listener(req, res);
    expect(HttpRequest.fromIncomingMessage).toHaveBeenCalledWith(req);
  });

  test('calls router with request method and url', () => {
    const listener = createListener(router);
    listener(req, res);
    expect(router.route).toHaveBeenCalledWith('GET', '/test');
  });

  test('creates a 404 response when no match has been found', () => {
    const listener = createListener(router);
    listener(req, res);
    expect(HttpResponse).toHaveBeenCalledWith(404);
  });

  test('calls request handler', () => {
    const requestHandler = jest.fn().mockReturnValueOnce({ toServerResponse: jest.fn() });
    (router.route as jest.Mock).mockReturnValueOnce({
      route: { value: requestHandler },
      params: {}
    });
    const listener = createListener(router);
    listener(req, res);
    expect(requestHandler).toHaveBeenCalledWith(undefined, {});
  });

  test('calls response.end()', () => {
    const listener = createListener(router);
    listener(req, res);
    expect(res.end).toHaveBeenCalled();
  });
});
