import type { Container } from '@axuate/container';
import type { ModuleConfig } from '../../../entities/ModuleConfig';
import { compileModule } from '../compileModule';
import type { RouteConfig } from '../../../entities/RouteConfig';

export function resolveModules(container: Container, modules?: ModuleConfig[]): RouteConfig[] {
  if (modules) {
    const routes: RouteConfig[] = [];
    for (const module of modules) {
      const subModuleRoutes = compileModule(container, module);
      routes.push(...subModuleRoutes);
    }
    return routes;
  }
  return [];
}
