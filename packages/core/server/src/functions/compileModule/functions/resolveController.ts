import type { Constructor, Container } from '@axuate/container';
import { MIDDLEWARE } from '../../../constants/tags';
import type { RouteConfig } from '../../../entities/RouteConfig';
import { resolveRoute } from './resolveRoute';
import { getMiddlewares } from './getMiddlewares';
import { getControllerRoutes } from './getControllerRoutes';
import { getControllerConfig } from './getControllerConfig';

export function resolveController(container: Container, controller: Constructor): RouteConfig[] {
  const routes: RouteConfig[] = [];

  const moduleMiddlewares = container.resolveTag(MIDDLEWARE);
  const controllerInstance = container.resolve(controller) as Function;
  const controllerConfig = getControllerConfig(controller);
  const controllerRoutes = getControllerRoutes(controller);
  const controllerMiddlewares = getMiddlewares(container, controller);

  for (const propertyKey of controllerRoutes) {
    const routeConfig = resolveRoute(container, controllerInstance, propertyKey);
    routeConfig.version = controllerConfig.version;
    routeConfig.prefix = controllerConfig.prefix;
    routeConfig.middlewares.unshift(...controllerMiddlewares);
    routeConfig.middlewares.unshift(...moduleMiddlewares);
    routes.push(routeConfig);
  }

  return routes;
}
