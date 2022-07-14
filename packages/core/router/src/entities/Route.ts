import type { HttpMethod } from '@axuate/http';

export type Route<T> = {
  method: HttpMethod;
  path: string;
  value: T;
};
