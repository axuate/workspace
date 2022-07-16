import type { Constructor, Container } from '@axuate/container';
import { getRequestConfig } from './getRequestConfig';
import type { RequestHandler } from '../../../entities/RequestHandler';
import type { RouteConfig } from '../../../entities/RouteConfig';
import { getMiddlewares } from './getMiddlewares';

export function resolveRoute(
  container: Container,
  controller: Function,
  propertyKey: string
): RouteConfig {
  const { method, path } = getRequestConfig(controller.prototype as Constructor, propertyKey);
  const middlewares = getMiddlewares(container, controller, propertyKey);
  const requestHandler: RequestHandler = controller[propertyKey];

  return {
    path,
    method,
    requestHandler,
    middlewares
  };
}
