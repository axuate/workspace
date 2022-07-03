import type { Constructor } from '../entities/Constructor';
import type { PropertyConfig } from '../entities/PropertyConfig';
import { isPrimitive } from './isPrimitive';
import { ValidationError } from '../errors/ValidationError';

export function plainToInstance<T>(entity: Constructor<T>, pojo: Object): T {
  if (Object.getPrototypeOf(pojo) !== Object.prototype) {
    throw new Error('Plain object is already instance of a class.');
  }
  const instance = new entity();
  const prototype = entity.prototype as Object;
  const properties = Reflect.getMetadata('properties', prototype) as string[] | undefined;

  if (properties) {
    for (const propertyName of properties) {
      const { type, isArray, isOptional } = Reflect.getMetadata(
        'config',
        prototype,
        propertyName
      ) as PropertyConfig;

      if (Object.prototype.hasOwnProperty.call(pojo, propertyName)) {
        if (isPrimitive(type)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          instance[propertyName] = pojo[propertyName];
        } else {
          if (isArray) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            instance[propertyName] = pojo[propertyName].map((item) => plainToInstance(type, item));
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            instance[propertyName] = plainToInstance(type, pojo[propertyName]);
          }
        }
      } else {
        if (!isOptional) {
          throw new ValidationError(`Missing property "${propertyName}"`);
        }
      }
    }
  }

  return instance;
}
