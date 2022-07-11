import type { Constructor } from './Constructor';

export type Token<T = unknown> = string | symbol | Constructor<T>;
