import type { PropertyConfig } from '../entities/PropertyConfig';
import { PROPERTY_CONFIG } from '../constants/reflection';

export function getPropertyConfig(prototype: object, propertyName: string): PropertyConfig {
  return Reflect.getMetadata(PROPERTY_CONFIG, prototype, propertyName) as PropertyConfig;
}
