import { createRequestHandler } from './createRequestHandler';
import type { Middleware } from '../entities/Middleware';
import type { HttpRequest } from '@axuate/http';
import type { Container } from '@axuate/container';
import type { RequestParams } from '../entities/RequestParams';

describe('createRequestHandler', () => {
  const onError = jest.fn();
  const logError = jest.fn();
  const container = {
    resolve: jest.fn()
  } as any as Container;

  beforeEach(() => {
    (container.resolve as jest.Mock)
      .mockReturnValueOnce({ onError })
      .mockReturnValueOnce({ error: logError });
  });

  test('export a function called createRequestHandler', () => {
    expect(createRequestHandler).toBeInstanceOf(Function);
  });

  test('returns a request handler', () => {
    const requestHandler = jest.fn();
    expect(createRequestHandler(container, requestHandler, [])).toBeInstanceOf(Function);
  });

  test('use FallbackController if an exception has been thrown', async () => {
    const error = new Error('Test');
    const requestHandler = jest.fn().mockImplementation(() => {
      throw error;
    });
    const rh = createRequestHandler(container, requestHandler, []);
    const req = {} as HttpRequest;
    const params = {} as RequestParams;
    await rh(req, params);
    expect(requestHandler).toHaveBeenCalledWith(req, params);
    expect(onError).toHaveBeenCalledWith(error, req, params);
  });

  test('return 500 response if an uncatched error occurs', async () => {
    const error = new Error('Test');
    const requestHandler = jest.fn();
    const rh = createRequestHandler(container, requestHandler, [
      {
        onRequest: () => {
          throw error;
        }
      }
    ]);
    const req = {} as HttpRequest;
    const params = {} as RequestParams;
    const response = await rh(req, params);
    expect(response.getStatus()).toBe(500);
    expect(logError).toHaveBeenCalledWith(error.stack);
  });

  test('request handler calls all middlewares', async () => {
    const requestHandler = jest.fn();
    const middleware = { onRequest: jest.fn(), onResponse: jest.fn() } as Middleware;
    const rh = createRequestHandler(container, requestHandler, [middleware]);
    await rh({} as HttpRequest, {});
    expect(middleware.onRequest).toHaveBeenCalled();
    expect(middleware.onResponse).toHaveBeenCalled();
    expect(requestHandler).toHaveBeenCalled();
  });

  test('request handler does not call original request handler if middleware returns a response', async () => {
    const requestHandler = jest.fn();
    const middleware = {
      onRequest: jest.fn().mockReturnValueOnce({}),
      onResponse: jest.fn()
    } as Middleware;
    const rh = createRequestHandler(container, requestHandler, [middleware]);
    await rh({} as HttpRequest, {});
    expect(middleware.onRequest).toHaveBeenCalled();
    expect(middleware.onResponse).toHaveBeenCalled();
    expect(requestHandler).not.toHaveBeenCalled();
  });

  test('request handler does not call original request handler if middleware returns a response', async () => {
    const requestHandler = jest.fn();
    const response = {};
    const middleware = {
      onRequest: jest.fn(),
      onResponse: jest.fn().mockReturnValueOnce(response)
    } as Middleware;
    const rh = createRequestHandler(container, requestHandler, [middleware]);
    expect(await rh({} as HttpRequest, {})).toBe(response);
  });
});
