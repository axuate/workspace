import type { Route } from '../entities/Route';
import type { SegmentedRoute } from '../entities/SegmentedRoute';
import { extractSegments } from './extractSegments';

export function segmentRoutes<T>(routes: Route<T>[]): SegmentedRoute<T>[] {
  return routes.map((route) => ({
    route,
    segments: extractSegments(route.path)
  }));
}
