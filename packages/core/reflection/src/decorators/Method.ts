import type { MethodConfig } from '../entities/MethodConfig';
import { IS_ARRAY, METHODS, TYPE } from '../constants/reflection';
import { Metadata } from './Metadata';

export const Method: (config?: MethodConfig) => MethodDecorator =
  (config) => (target, propertyKey: string) => {
    Metadata(METHODS, [propertyKey])(target.constructor);
    Metadata(IS_ARRAY, config?.isArray)(target, propertyKey);
    Metadata(TYPE, config?.type)(target, propertyKey);
  };
