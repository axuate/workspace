import type { Segment } from './Segment';
import type { Route } from './Route';
import type { HttpMethod } from '@axuate/http';

export type SegmentedRoute<T> = {
  segments: Segment[];
  route: Route<T>;
  method: HttpMethod;
};
