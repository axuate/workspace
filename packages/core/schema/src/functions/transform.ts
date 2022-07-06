import { getPropertyConfig } from './getPropertyConfig';
import { isPrimitive } from './isPrimitive';
import { ValidationError } from '../errors/ValidationError';
import type { PropertyConfig } from '../entities/PropertyConfig';

export function transform<T>(
  prototype: object,
  from: T,
  to: T,
  propertyName: string,
  callback: <T>(item: T, config: PropertyConfig) => T
): void {
  const config = getPropertyConfig(prototype, propertyName);
  const { isArray, isOptional, type } = config;
  if (Object.prototype.hasOwnProperty.call(from, propertyName)) {
    if (isPrimitive(type)) {
      if (isArray) {
        to[propertyName] = [...from[propertyName]];
      } else {
        to[propertyName] = from[propertyName];
      }
    } else {
      if (isArray) {
        to[propertyName] = (from[propertyName] as unknown[]).map((item) => callback(item, config));
      } else {
        to[propertyName] = callback(from[propertyName], config);
      }
    }
  } else {
    if (!isOptional) {
      throw new ValidationError(`Missing property "${propertyName}"`);
    }
  }
}
