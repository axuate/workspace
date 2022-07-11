import type { Token } from './Token';

export type ValueProvider<T = unknown> = {
  token: Token<T>;
  useValue: T;
};
