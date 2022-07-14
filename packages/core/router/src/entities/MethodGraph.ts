import type { RouteGraph } from './RouteGraph';
import type { HttpMethod } from '@axuate/http';

export type MethodGraph<T> = Partial<Record<HttpMethod, RouteGraph<T>>>;
