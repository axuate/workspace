import type { Constructor } from '@axuate/container';
import { getMetadata, METHODS } from '@axuate/reflection';

export function getControllerRoutes(controller: Constructor): string[] {
  return getMetadata(METHODS, controller);
}
