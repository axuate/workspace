import type { PropertyConfig } from '../entities/PropertyConfig';

export function getPropertyConfig(prototype: object, propertyName: string): PropertyConfig {
  return Reflect.getMetadata('config', prototype, propertyName) as PropertyConfig;
}
