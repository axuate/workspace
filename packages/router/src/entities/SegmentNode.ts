import type { RouteGraph } from './RouteGraph';
import type { Route } from './Route';

export type SegmentNode<T> = {
  type: 'static' | 'variable';
  name: string;
  children?: RouteGraph<T>;
  route?: Route<T>;
};
