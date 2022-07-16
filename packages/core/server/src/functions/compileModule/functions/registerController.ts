import type { Constructor, Container } from '@axuate/container';
import { CONTROLLER } from '../../../constants/tags';

export function registerController(container: Container, controller: Constructor): void {
  container.register({
    token: controller,
    useClass: controller,
    scope: 'singleton',
    tags: [CONTROLLER]
  });
}
