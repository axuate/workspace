import 'reflect-metadata';
import { resolveRoute } from './resolveRoute';
import { getRequestConfig } from './getRequestConfig';
import type { Container } from '@axuate/container';
import { getMiddlewares } from './getMiddlewares';

jest.mock('./getRequestConfig');
jest.mock('./getMiddlewares');

describe('resolveRoute', () => {
  test('exports a function called resolveRoute', () => {
    expect(resolveRoute).toBeInstanceOf(Function);
  });

  test('calls getRequestConfig', () => {
    (getRequestConfig as jest.Mock).mockReturnValueOnce({ method: 'GET', path: '/' });
    const container = { resolveAll: jest.fn().mockReturnValueOnce([]) } as any as Container;
    const controller = jest.fn();
    resolveRoute(container, controller, 'getUsers');
    expect(getRequestConfig).toHaveBeenCalledWith(controller.prototype, 'getUsers');
  });

  test('resolves middlewares using getMiddlewares', () => {
    (getRequestConfig as jest.Mock).mockReturnValueOnce({ method: 'GET', path: '/' });
    (getMiddlewares as jest.Mock).mockReturnValueOnce([]);
    const container = {} as Container;
    const controller = jest.fn();
    resolveRoute(container, controller, 'getUsers');
    expect(getMiddlewares).toHaveBeenCalledWith(container, controller, 'getUsers');
  });

  test('returns RouteConfig', () => {
    const middleware = jest.fn();
    const middlewares = [middleware];
    (getMiddlewares as jest.Mock).mockReturnValueOnce([]);
    (getRequestConfig as jest.Mock).mockReturnValueOnce({
      method: 'GET',
      path: '/',
      middlewares: middlewares
    });
    const container = { resolveAll: jest.fn().mockReturnValueOnce([]) } as any as Container;
    const controller = jest.fn();
    controller['getUsers'] = jest.fn();
    expect(resolveRoute(container, controller, 'getUsers')).toEqual({
      path: '/',
      method: 'GET',
      middlewares: [],
      requestHandler: controller['getUsers']
    });
  });
});
