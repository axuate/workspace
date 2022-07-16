import { ROUTES } from '../constants/reflection';

export function addRouteToReflection(propertyKey: string, controller: Object): void {
  const registeredRoutes: string[] = Reflect.getMetadata(ROUTES, controller) ?? [];
  registeredRoutes.push(propertyKey);
  Reflect.defineMetadata(ROUTES, registeredRoutes, controller);
}
