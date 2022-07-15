import type { BaseProvider } from './BaseProvider';

export type ValueProvider<T = unknown> = BaseProvider<T> & {
  useValue: T;
};
