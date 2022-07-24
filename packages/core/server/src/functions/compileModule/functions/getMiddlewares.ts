import type { Constructor, Container } from '@axuate/container';
import type { Middleware } from '../../../entities/Middleware';
import { MIDDLEWARES } from '../../../constants/reflection';
import { getMetadata } from '@axuate/reflection';

export function getMiddlewares(
  container: Container,
  controller: Function,
  propertyKey?: string
): Middleware[] {
  const target: Object = propertyKey ? Object.getPrototypeOf(controller) : controller;
  const middlewares = getMetadata<Constructor<Middleware>[]>(MIDDLEWARES, target, propertyKey);

  if (middlewares) {
    return container.resolveAll(middlewares as Constructor[]);
  }

  return [];
}
