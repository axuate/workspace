import type { Constructor, Provider } from '@axuate/container';
import type { Middleware } from './Middleware';

export type ModuleConfig = {
  components?: Constructor[];
  controllers?: Constructor[];
  middlewares?: Constructor<Middleware>[];
  providers?: Provider[];
  modules?: ModuleConfig[];
};
