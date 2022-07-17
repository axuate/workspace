import type { Constructor } from './Constructor';

export type PropertyConfig = {
  isArray?: boolean;
  isOptional?: boolean;
  type?: Constructor;
};
