import { createServer } from './createServer';
import { Container } from '@axuate/container';
import { consoleTransport, debugFormatter, Logger, LogLevel } from '@axuate/logger';
import { createListener } from './functions/createListener';
import http from 'http';
import { Router } from '@axuate/router';
import { FallbackController } from './controllers/FallbackController';
import { compileModule } from './functions/compileModule/compileModule';
import type { RequestConfig } from './entities/RequestConfig';
import { compileRoute } from './functions/compileRoute';

jest.mock('http');
jest.mock('@axuate/container');
jest.mock('@axuate/logger');
jest.mock('@axuate/router');
jest.mock('./functions/createListener');
jest.mock('./functions/compileModule/compileModule');
jest.mock('./functions/compileRoute');

describe('startServer', () => {
  const requestConfig = {
    path: '/users',
    method: 'GET',
    requestHandler: jest.fn()
  } as RequestConfig;

  const route = { path: '/users', method: 'GET', value: jest.fn() };

  beforeEach(() => {
    (http.createServer as jest.Mock).mockReturnValue({
      listen: jest.fn()
    });
    (compileModule as jest.Mock).mockReturnValueOnce([requestConfig]);
    (compileRoute as jest.Mock).mockReturnValueOnce(route);
  });

  test('exports a function called startServer', () => {
    expect(createServer).toBeInstanceOf(Function);
  });

  test('creates a new dependency container', () => {
    createServer({});
    expect(Container).toHaveBeenCalled();
  });

  test('registers the default fallback controller', () => {
    jest.spyOn(Container.prototype, 'register');
    createServer({});
    expect(Container.prototype.register).toHaveBeenCalledWith({
      token: FallbackController,
      useClass: FallbackController,
      scope: 'singleton'
    });
  });

  test('creates a new logger with default options', () => {
    createServer({});
    expect(Logger).toHaveBeenCalledWith({
      context: 'Server',
      formatter: debugFormatter,
      transports: [consoleTransport],
      level: LogLevel.DEBUG
    });
  });

  test('adds logger to dependency container', () => {
    jest.spyOn(Container.prototype, 'register');
    createServer({});
    expect(Container.prototype.register).toHaveBeenCalledWith({
      token: Logger,
      useValue: expect.any(Logger)
    });
  });

  test('calls compileModule with container and module', () => {
    const module = {};
    createServer(module);
    expect(compileModule).toHaveBeenCalledWith(expect.any(Container), module);
  });

  test('calls compileRoute for all RouteConfigs', () => {
    const module = {};
    createServer(module);
    expect(compileRoute).toHaveBeenCalledWith(expect.any(Container), requestConfig);
  });

  test('creates a new router with all compiledRoutes', () => {
    const module = {};
    createServer(module);
    expect(Router).toHaveBeenCalledWith([route]);
  });

  test('creates request listener', () => {
    const router = {};
    (Router as jest.Mock).mockReturnValueOnce(router);
    createServer({});
    expect(createListener).toHaveBeenCalledWith(router);
  });

  test('starts a new server with created listener', () => {
    const listener = jest.fn();
    (createListener as jest.Mock).mockReturnValue(listener);
    createServer({});
    expect(http.createServer).toHaveBeenCalledWith(listener);
  });
});
