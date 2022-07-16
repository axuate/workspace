import type { RouteConfig } from '../entities/RouteConfig';
import type { Route } from '@axuate/router';
import { compilePath } from './compilePath';
import type { RequestHandler } from '../entities/RequestHandler';
import { createRequestHandler } from './createRequestHandler';
import type { Container } from '@axuate/container';

export function compileRoute(
  container: Container,
  routeConfig: RouteConfig
): Route<RequestHandler> {
  const { requestHandler, middlewares } = routeConfig;
  return {
    path: compilePath(routeConfig),
    method: routeConfig.method,
    value: createRequestHandler(container, requestHandler, middlewares)
  };
}
