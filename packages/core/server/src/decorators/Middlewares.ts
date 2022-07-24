import type { Middleware } from '../entities/Middleware';
import { MIDDLEWARES } from '../constants/reflection';
import type { Constructor } from '@axuate/container';
import { Metadata } from '@axuate/reflection';

export const Middlewares = (middlewares: Constructor<Middleware>[]) => {
  return (target: Function | Object, propertyKey?: string) => {
    Metadata(MIDDLEWARES, middlewares)(target, propertyKey);
  };
};
