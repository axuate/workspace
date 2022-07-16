import { compileRoute } from './compileRoute';
import type { RouteConfig } from '../entities/RouteConfig';
import { compilePath } from './compilePath';
import type { Container } from '@axuate/container';
import { createRequestHandler } from './createRequestHandler';

jest.mock('./compilePath');
jest.mock('./createRequestHandler');

describe('compileRoute', () => {
  test('exports a function called compileRoute', () => {
    expect(compileRoute).toBeInstanceOf(Function);
  });

  test('calls compilePath to get the final path', () => {
    const routeConfig: RouteConfig = {
      path: '/test',
      method: 'GET',
      version: 1,
      requestHandler: jest.fn()
    };
    compileRoute({} as Container, routeConfig);
    expect(compilePath).toHaveBeenCalledWith(routeConfig);
  });

  test('calls createRequestHandler', () => {
    const container = {} as Container;
    const routeConfig: RouteConfig = {
      path: '/test',
      method: 'GET',
      version: 1,
      requestHandler: jest.fn()
    };
    compileRoute(container, routeConfig);
    expect(createRequestHandler).toHaveBeenCalledWith(
      container,
      routeConfig.requestHandler,
      undefined
    );
  });

  test('returns a Route', () => {
    const requestHandler = jest.fn();
    (compilePath as jest.Mock).mockReturnValueOnce('/v1/test');
    (createRequestHandler as jest.Mock).mockReturnValueOnce(requestHandler);
    const routeConfig: RouteConfig = {
      path: '/test',
      method: 'GET',
      version: 1,
      requestHandler: jest.fn()
    };
    expect(compileRoute({} as Container, routeConfig)).toEqual({
      path: '/v1/test',
      method: 'GET',
      value: requestHandler
    });
  });
});
