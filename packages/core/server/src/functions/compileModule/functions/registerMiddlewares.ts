import type { Constructor, Container } from '@axuate/container';
import type { Middleware } from '../../../entities/Middleware';
import { MIDDLEWARE } from '../../../constants/tags';

export function registerMiddlewares(container: Container, middlewares?: Constructor<Middleware>[]) {
  if (middlewares) {
    for (const middleware of middlewares) {
      container.register({
        token: middleware,
        useClass: middleware,
        tags: [MIDDLEWARE],
        scope: 'singleton'
      });
    }
  }
}
