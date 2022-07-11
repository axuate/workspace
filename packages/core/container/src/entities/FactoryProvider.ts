import type { Token } from './Token';
import type { Factory } from './Factory';
import type { Scope } from './Scope';

export type FactoryProvider<T = unknown> = {
  token: Token<T>;
  useFactory: Factory<T>;
  scope?: Scope;
};
