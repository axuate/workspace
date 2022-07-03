import type { Route } from './Route';

export interface RouteMatch<T> {
  route: Route<T>;
  params: Record<string, string>;
}
