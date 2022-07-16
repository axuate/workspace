import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

export const Patch: (path: string) => MethodDecorator = (path) => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(REQUEST_PATH, path, target, propertyKey);
    Reflect.defineMetadata(REQUEST_METHOD, 'PATCH', target, propertyKey);
    addRouteToReflection(propertyKey as string, target);
  };
};
