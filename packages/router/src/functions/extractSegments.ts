import type { Segment } from '../entities/Segment';
import { validateRoutePath } from './validateRoutePath';
import { extractPathSegments } from './extractPathSegments';

export function extractSegments(path: string): Segment[] {
  validateRoutePath(path);
  const pathSegments = extractPathSegments(path);
  const segments: Segment[] = [];
  const variables = new Set<string>();
  for (const pathSegment of pathSegments) {
    if (pathSegment.startsWith('{') && pathSegment.endsWith('}')) {
      const variableName = pathSegment.slice(1, -1);
      if (variables.has(variableName)) {
        throw new Error('Variables must have a unique name');
      }
      variables.add(variableName);
      segments.push({
        type: 'variable',
        name: variableName
      });
    } else {
      segments.push({
        type: 'static',
        name: pathSegment
      });
    }
  }
  return segments;
}
