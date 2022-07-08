import 'reflect-metadata';
import { registerProperty } from '../functions/registerProperty';
import type { PropertyConfig } from '../entities/PropertyConfig';
import { PROPERTY_CONFIG } from '../constants/reflection';

export const Property: (config: PropertyConfig) => PropertyDecorator =
  (config) => (target, propertyKey) => {
    registerProperty(target, propertyKey as string);
    Reflect.defineMetadata(PROPERTY_CONFIG, config, target, propertyKey);
  };
