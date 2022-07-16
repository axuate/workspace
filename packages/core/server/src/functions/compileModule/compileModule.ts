import { Container } from '@axuate/container';
import type { ModuleConfig } from '../../entities/ModuleConfig';
import { registerMiddlewares } from './functions/registerMiddlewares';
import { registerProviders } from './functions/registerProviders';
import { registerComponents } from './functions/registerComponents';
import { resolveModules } from './functions/resolveModules';
import { resolveControllers } from './functions/resolveControllers';
import type { RouteConfig } from '../../entities/RouteConfig';

export function compileModule(container: Container, module: ModuleConfig): RouteConfig[] {
  const moduleContainer = new Container(container);
  registerMiddlewares(moduleContainer, module.middlewares);
  registerProviders(moduleContainer, module.providers);
  registerComponents(moduleContainer, module.components);
  return [
    ...resolveModules(moduleContainer, module.modules),
    ...resolveControllers(moduleContainer, module.controllers)
  ];
}
