import type { Constructor, Container } from '@axuate/container';
import { resolveController } from './resolveController';
import { registerController } from './registerController';
import type { RouteConfig } from '../../../entities/RouteConfig';

export function resolveControllers(
  container: Container,
  controllers?: Constructor[]
): RouteConfig[] {
  const routes: RouteConfig[] = [];

  if (controllers) {
    for (const controller of controllers) {
      registerController(container, controller);
      routes.push(...resolveController(container, controller));
    }
  }

  return routes;
}
