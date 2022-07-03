import type { Route } from './entities/Route';
import type { RouteGraph } from './entities/RouteGraph';
import { compileRoutes } from './functions/compileRoutes';
import { segmentRoutes } from './functions/segmentRoutes';
import { validatePath } from './functions/validatePath';
import { extractPathSegments } from './functions/extractPathSegments';
import type { RouteMatch } from './entities/RouteMatch';

export class Router<T> {
  private readonly graph: RouteGraph<T>;

  public constructor(routes: Route<T>[]) {
    const segmentedRoutes = segmentRoutes(routes);
    this.graph = compileRoutes(segmentedRoutes);
  }

  public route(path: string): RouteMatch<T> | undefined {
    validatePath(path);
    const segments = extractPathSegments(path);
    const params = {};
    let graphPointer: RouteGraph<T> | undefined = this.graph;
    for (let i = 0; i < segments.length; i++) {
      if (graphPointer) {
        const segment = segments[i];
        const isLastSegment = i === segments.length - 1;
        if (graphPointer[segment]) {
          if (isLastSegment) {
            return { route: graphPointer[segment].route, params };
          } else {
            graphPointer = graphPointer[segment].children;
          }
        } else if (graphPointer['*']) {
          const variableName = graphPointer['*'].name;
          params[variableName] = segment;
          if (isLastSegment) {
            return { route: graphPointer['*'].route, params };
          }
          graphPointer = graphPointer['*'].children;
        }
      } else {
        break;
      }
    }
    return undefined;
  }
}
