import { CONSTRUCTOR_ARGS } from '../constants/reflection';

export const Injectable: ClassDecorator = (target) => {
  const types: unknown[] = Reflect.getMetadata('design:paramtypes', target) ?? [];
  const constructorArgs: unknown[] | undefined = Reflect.getMetadata(CONSTRUCTOR_ARGS, target);
  if (constructorArgs) {
    for (let i = 0; i < constructorArgs.length; i++) {
      const constructorType = constructorArgs[i];
      if (constructorType !== undefined) {
        types[i] = constructorType;
      }
    }
  }
  Reflect.defineMetadata(CONSTRUCTOR_ARGS, types, target);
};
