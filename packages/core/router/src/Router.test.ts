import { Router } from './Router';
import { compileRoutes } from './functions/compileRoutes';
import { segmentRoutes } from './functions/segmentRoutes';
import { validatePath } from './functions/validatePath';
import type { Route } from './entities/Route';
import type { MethodGraph } from './entities/MethodGraph';

jest.mock('./functions/compileRoutes');
jest.mock('./functions/segmentRoutes');
jest.mock('./functions/validatePath');

describe('Router', () => {
  test('exports a class called Router', () => {
    expect(Router).toBeInstanceOf(Function);
  });

  describe('constructor', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should call segmentRoutes', () => {
      const routes = [
        { method: 'GET', path: '/a', value: 'a' },
        { method: 'GET', path: '/b', value: 'b' }
      ] as Route<string>[];
      new Router<string>(routes);
      expect(segmentRoutes).toHaveBeenCalledWith(routes);
    });

    test('should call compile routes with all given routes', () => {
      (segmentRoutes as jest.Mock).mockReturnValue(['{{SEGMENTED_ROUTES}}']);
      new Router<string>([{ path: '/a', value: 'a', method: 'GET' }]);
      expect(compileRoutes).toHaveBeenCalledWith(['{{SEGMENTED_ROUTES}}']);
    });
  });

  describe('route', () => {
    test('has a public method called route', () => {
      expect(Router.prototype.route).toBeInstanceOf(Function);
    });

    test('executes validatePath functions', () => {
      (compileRoutes as jest.Mock).mockReturnValueOnce([]);
      new Router([]).route('GET', '/a/b');
      expect(validatePath).toHaveBeenCalledWith('/a/b');
    });

    test('returns undefined if no route matches', () => {
      (compileRoutes as jest.Mock).mockReturnValueOnce([]);
      const router = new Router([]);
      expect(router.route('GET', '/a/b/c')).toBeUndefined();
    });

    test('returns value of caught route', () => {
      const route: Route<string> = { path: '/a/b/c', value: 'a', method: 'GET' };
      (compileRoutes as jest.Mock).mockReturnValueOnce({
        GET: {
          a: {
            type: 'static',
            name: 'a',
            children: {
              b: {
                type: 'static',
                name: 'b',
                children: {
                  c: {
                    type: 'static',
                    name: 'c',
                    route
                  }
                }
              }
            }
          }
        }
      } as MethodGraph<string>);
      const router = new Router([route]);
      expect(router.route('GET', '/a/b/c')).toEqual({ route, params: {} });
    });

    test('returns value of caught route with variables', () => {
      const route: Route<string> = { path: '/a/{name}/c', value: 'a', method: 'GET' };
      (compileRoutes as jest.Mock).mockReturnValueOnce({
        GET: {
          a: {
            type: 'static',
            name: 'a',
            children: {
              '*': {
                type: 'variable',
                name: 'name',
                children: {
                  c: {
                    type: 'static',
                    name: 'c',
                    route
                  }
                }
              }
            }
          }
        }
      } as MethodGraph<string>);
      const router = new Router([route]);
      expect(router.route('GET', '/a/b/c')).toEqual({
        route,
        params: {
          name: 'b'
        }
      });
    });

    test('returns value of caught route with variable segement at the end', () => {
      const route: Route<string> = { path: '/a/{name}', value: 'a', method: 'GET' };
      (compileRoutes as jest.Mock).mockReturnValueOnce({
        GET: {
          a: {
            type: 'static',
            name: 'a',
            children: {
              '*': {
                type: 'variable',
                name: 'name',
                route
              }
            }
          }
        }
      } as MethodGraph<string>);
      const router = new Router([route]);
      expect(router.route('GET', '/a/b')).toEqual({
        route,
        params: {
          name: 'b'
        }
      });
    });
  });
});
