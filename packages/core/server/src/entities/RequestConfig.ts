import type { HttpMethod } from '@axuate/http';

export type RequestConfig = {
  method: HttpMethod;
  path: string;
};
