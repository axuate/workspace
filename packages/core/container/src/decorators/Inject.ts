import type { Constructor } from '../entities/Constructor';
import { CONSTRUCTOR_ARGS } from '../constants/reflection';

export const Inject: (identifier: Symbol | Constructor) => ParameterDecorator =
  (identifier) => (target, propertyKey, parameterIndex) => {
    const types: unknown[] = Reflect.getMetadata(CONSTRUCTOR_ARGS, target) ?? [];
    types[parameterIndex] = identifier;
    Reflect.defineMetadata(CONSTRUCTOR_ARGS, types, target);
  };
