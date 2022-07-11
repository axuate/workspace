import type { Token } from './Token';
import type { Constructor } from './Constructor';
import type { Scope } from './Scope';

export type ClassProvider<T = unknown> = {
  token: Token<T>;
  useClass: Constructor<T>;
  scope?: Scope;
};
