import type { Constructor } from './Constructor';
import type { Scope } from './Scope';
import type { BaseProvider } from './BaseProvider';

export type ClassProvider<T = unknown> = BaseProvider<T> & {
  useClass: Constructor<T>;
  scope?: Scope;
};
