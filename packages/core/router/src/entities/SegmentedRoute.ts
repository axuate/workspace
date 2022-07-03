import type { Segment } from './Segment';
import type { Route } from './Route';

export type SegmentedRoute<T> = {
  segments: Segment[];
  route: Route<T>;
};
