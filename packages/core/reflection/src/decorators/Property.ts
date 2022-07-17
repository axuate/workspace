import type { PropertyConfig } from '../entities/PropertyConfig';
import { IS_ARRAY, IS_OPTIONAL, PROPERTIES, TYPE } from '../constants/reflection';
import { Metadata } from './Metadata';

export const Property: (config?: PropertyConfig) => PropertyDecorator =
  (config) => (target: Object, propertyKey: string) => {
    Metadata(PROPERTIES, [propertyKey])(target.constructor);
    Metadata(IS_ARRAY, config?.isArray)(target, propertyKey);
    Metadata(IS_OPTIONAL, config?.isOptional)(target, propertyKey);
    Metadata(TYPE, config?.type)(target, propertyKey);
  };
