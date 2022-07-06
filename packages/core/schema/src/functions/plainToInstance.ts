import type { Constructor } from '../entities/Constructor';
import { getProperties } from './getProperties';
import { transform } from './transform';

export function plainToInstance<T>(entity: Constructor<T>, pojo: Object): T {
  const instance = new entity();
  const prototype = entity.prototype as Object;
  const properties = getProperties(prototype);

  for (const propertyName of properties) {
    /* istanbul ignore next */
    transform(prototype, pojo, instance, propertyName, <T>(item, { type }) => {
      return plainToInstance<T>(type as Constructor<T>, item as T);
    });
  }

  return instance;
}
