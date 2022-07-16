import type { Middleware } from '../entities/Middleware';
import { MIDDLEWARES } from '../constants/reflection';
import type { Constructor } from '@axuate/container';

export const Middlewares: (
  middlewares: Constructor<Middleware>[]
) => ClassDecorator | MethodDecorator = (middlewares) => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(MIDDLEWARES, middlewares, target, propertyKey);
  };
};
