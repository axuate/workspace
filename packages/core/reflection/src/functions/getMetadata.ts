import { METADATA } from '../constants/reflection';

export function getMetadata<T>(key: symbol, target: Object, propertyKey?: string): T {
  const metadata: Map<symbol, T> = Reflect.getMetadata(METADATA, target, propertyKey);
  if (!metadata) {
    return undefined;
  }
  return metadata.get(key);
}
