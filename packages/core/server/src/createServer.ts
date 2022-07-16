import { Container } from '@axuate/container';
import { createListener } from './functions/createListener';
import http from 'http';
import { Router } from '@axuate/router';
import type { RequestHandler } from './entities/RequestHandler';
import type { ModuleConfig } from './entities/ModuleConfig';
import { FallbackController } from './controllers/FallbackController';
import { consoleTransport, debugFormatter, Logger, LogLevel } from '@axuate/logger';
import { compileModule } from './functions/compileModule/compileModule';
import { compileRoute } from './functions/compileRoute';

export function createServer(module: ModuleConfig): http.Server {
  const container = new Container();

  container.register({
    token: FallbackController,
    useClass: FallbackController,
    scope: 'singleton'
  });

  container.register({
    token: Logger,
    useValue: new Logger({
      context: 'Server',
      formatter: debugFormatter,
      transports: [consoleTransport],
      level: LogLevel.DEBUG
    })
  });

  const routeConfigs = compileModule(container, module);
  const routes = routeConfigs.map((routeConfig) => compileRoute(container, routeConfig));
  const router = new Router<RequestHandler>(routes);

  const listener = createListener(router);

  return http.createServer(listener);
}
