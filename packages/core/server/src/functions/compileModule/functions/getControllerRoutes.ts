import type { Constructor } from '@axuate/container';
import { ROUTES } from '../../../constants/reflection';

export function getControllerRoutes(controller: Constructor): string[] {
  return Reflect.getMetadata(ROUTES, controller) as string[];
}
