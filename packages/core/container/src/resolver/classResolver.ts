import 'reflect-metadata';
import type { Resolver } from '../entities/Resolver';
import type { Constructor } from '../entities/Constructor';
import { CONSTRUCTOR_ARGS } from '../constants/reflection';

type ClassResolver = (constructor: Constructor) => Resolver;

export const classResolver: ClassResolver = (constructor) => {
  const types: (Constructor | Symbol)[] = Reflect.getMetadata(CONSTRUCTOR_ARGS, constructor);
  return (container) => {
    const args = types.map((type) => container.resolve(type));
    return new constructor(...args);
  };
};
