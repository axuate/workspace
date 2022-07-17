import { METADATA } from '../constants/reflection';
import { merge } from '../functions/merge';

export function Metadata(key: symbol, value: unknown) {
  return (target: Function | Object, propertyKey?: string) => {
    const metadata: Map<symbol, unknown> = Reflect.getMetadata(METADATA, target, propertyKey);
    const mergedMetadata = merge(metadata, key, value);
    Reflect.defineMetadata(METADATA, mergedMetadata, target, propertyKey);
  };
}
