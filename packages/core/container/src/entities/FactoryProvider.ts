import type { Factory } from './Factory';
import type { Scope } from './Scope';
import type { BaseProvider } from './BaseProvider';

export type FactoryProvider<T = unknown> = BaseProvider<T> & {
  useFactory: Factory<T>;
  scope?: Scope;
};
