import type { Constructor } from '../entities/Constructor';

export function isPrimitive(type: Constructor): boolean {
  return type === String || type === Number || type === Boolean;
}
