import { resolveController } from './resolveController';
import { getControllerConfig } from './getControllerConfig';
import { getControllerRoutes } from './getControllerRoutes';
import { getMiddlewares } from './getMiddlewares';
import { resolveRoute } from './resolveRoute';
import type { Container } from '@axuate/container';
import { MIDDLEWARE } from '../../../constants/tags';

jest.mock('./getControllerConfig');
jest.mock('./getControllerRoutes');
jest.mock('./getMiddlewares');
jest.mock('./resolveRoute');

describe('resolveController', () => {
  const controller = jest.fn();
  const container = {
    resolveTag: jest.fn(),
    resolve: jest.fn()
  } as any as Container;

  beforeEach(() => {
    (container.resolveTag as jest.Mock).mockReturnValueOnce([]);
    (container.resolve as jest.Mock).mockReturnValueOnce(controller);
    (getControllerConfig as jest.Mock).mockReturnValueOnce({});
    (getControllerRoutes as jest.Mock).mockReturnValueOnce(['getUsers']);
    (getMiddlewares as jest.Mock).mockReturnValueOnce([]);
    (resolveRoute as jest.Mock).mockReturnValueOnce({ path: '/', method: 'GET', middlewares: [] });
  });

  test('exports a function called resolveController', () => {
    expect(resolveController).toBeInstanceOf(Function);
  });

  test('gets module middlewares from container', () => {
    resolveController(container, controller);
    expect(container.resolveTag).toHaveBeenCalledWith(MIDDLEWARE);
  });

  test('creates a controller instance', () => {
    resolveController(container, controller);
    expect(container.resolve).toHaveBeenCalledWith(controller);
  });

  test('gets controller routes, config and middleware', () => {
    resolveController(container, controller);
    expect(getControllerConfig).toHaveBeenCalledWith(controller);
    expect(getControllerRoutes).toHaveBeenCalledWith(controller);
    expect(getMiddlewares).toHaveBeenCalledWith(container, controller);
  });

  test('resolves getUsers', () => {
    resolveController(container, controller);
    expect(resolveRoute).toHaveBeenCalledWith(container, controller, 'getUsers');
  });

  test('adds version and prefix to route config if defined', () => {
    (getControllerConfig as jest.Mock)
      .mockReset()
      .mockReturnValueOnce({ version: '1', prefix: '/users' });
    expect(resolveController(container, controller)).toEqual([
      { path: '/', method: 'GET', middlewares: [], version: '1', prefix: '/users' }
    ]);
  });

  test('adds middlewares in correct order', () => {
    (container.resolveTag as jest.Mock).mockReset().mockReturnValueOnce(['{{MODULE_MIDDLEWARE}}']);
    (getMiddlewares as jest.Mock).mockReset().mockReturnValueOnce(['{{CONTROLLER_MIDDLEWARE}}']);
    (resolveRoute as jest.Mock)
      .mockReset()
      .mockReturnValueOnce({ path: '/', method: 'GET', middlewares: ['{{ROUTE_MIDDLEWARE}}'] });
    expect(resolveController(container, controller)).toEqual([
      {
        path: '/',
        method: 'GET',
        middlewares: ['{{MODULE_MIDDLEWARE}}', '{{CONTROLLER_MIDDLEWARE}}', '{{ROUTE_MIDDLEWARE}}']
      }
    ]);
  });
});
