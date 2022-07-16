import type { PathConfig } from '../entities/PathConfig';

export function compilePath(routeConfig: PathConfig): string {
  const prefix = routeConfig.prefix ?? '';
  const version = routeConfig.version ? `/v${routeConfig.version}` : '';
  return version + prefix + routeConfig.path;
}
