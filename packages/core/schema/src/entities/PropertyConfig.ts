import type { Constructor } from './Constructor';

export type PropertyConfig = {
  type: Constructor;
  isArray?: boolean;
  isOptional?: boolean;
};
