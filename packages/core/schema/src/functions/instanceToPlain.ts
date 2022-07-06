import { getProperties } from './getProperties';
import { transform } from './transform';

export function instanceToPlain<T>(instance: T): T {
  const prototype = Object.getPrototypeOf(instance) as object;
  const properties = getProperties(prototype);
  const pojo = {} as T;

  for (const propertyName of properties) {
    /* istanbul ignore next */
    transform(prototype, pojo, instance, propertyName, (item) => {
      return instanceToPlain(item);
    });
  }

  return pojo;
}
