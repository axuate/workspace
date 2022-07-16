import 'reflect-metadata';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

export const Post: (path: string) => MethodDecorator = (path) => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(REQUEST_PATH, path, target, propertyKey);
    Reflect.defineMetadata(REQUEST_METHOD, 'POST', target, propertyKey);
    addRouteToReflection(propertyKey as string, target);
  };
};
