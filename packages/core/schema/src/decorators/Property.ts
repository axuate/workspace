import 'reflect-metadata';
import { registerProperty } from '../functions/registerProperty';
import type { PropertyConfig } from '../entities/PropertyConfig';

export const Property: (config: PropertyConfig) => PropertyDecorator =
  (config) => (target, propertyKey) => {
    registerProperty(target, propertyKey as string);
    Reflect.defineMetadata('config', config, target, propertyKey);
  };
