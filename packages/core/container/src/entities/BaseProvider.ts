import type { Token } from './Token';

export type BaseProvider<T> = {
  token: Token<T>;
  tags?: symbol[];
};
