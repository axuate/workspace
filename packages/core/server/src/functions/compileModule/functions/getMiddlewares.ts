import type { Constructor, Container } from '@axuate/container';
import type { Middleware } from '../../../entities/Middleware';
import { MIDDLEWARES } from '../../../constants/reflection';

export function getMiddlewares(
  container: Container,
  controller: Function,
  propertyKey?: string
): Middleware[] {
  const target: Object = propertyKey ? controller.prototype : controller;
  const middlewares = Reflect.getMetadata(MIDDLEWARES, target, propertyKey);

  if (middlewares) {
    return container.resolveAll(middlewares as Constructor[]);
  }

  return [];
}
