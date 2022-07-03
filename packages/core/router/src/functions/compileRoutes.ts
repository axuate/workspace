import type { SegmentedRoute } from '../entities/SegmentedRoute';
import type { RouteGraph } from '../entities/RouteGraph';

export function compileRoutes<T = unknown>(segmentedRoutes: SegmentedRoute<T>[]): RouteGraph<T> {
  const graph: RouteGraph<T> = {};

  for (const segmentedRoute of segmentedRoutes) {
    let graphPointer = graph;
    for (let i = 0; i < segmentedRoute.segments.length; i++) {
      const segment = segmentedRoute.segments[i];
      const segmentIdentifier = segment.type === 'variable' ? '*' : segment.name;
      const isLastSegment = i === segmentedRoute.segments.length - 1;
      const existingSegment = graphPointer[segmentIdentifier];

      if (existingSegment) {
        if (isLastSegment) {
          if (typeof existingSegment.route !== 'undefined') {
            throw new Error(`Route ${segmentedRoute.route.path} has already been defined.`);
          }
          existingSegment.route = segmentedRoute.route;
        } else {
          existingSegment.children = existingSegment.children ?? {};
          graphPointer = existingSegment.children;
        }
      } else {
        graphPointer[segmentIdentifier] = segment;
        if (isLastSegment) {
          graphPointer[segmentIdentifier].route = segmentedRoute.route;
        } else {
          graphPointer[segmentIdentifier].children = {};
          graphPointer = graphPointer[segmentIdentifier].children;
        }
      }
    }
  }

  return graph;
}
