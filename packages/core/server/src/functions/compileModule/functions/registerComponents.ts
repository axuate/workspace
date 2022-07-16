import type { Constructor, Container } from '@axuate/container';

export function registerComponents(container: Container, components?: Constructor[]) {
  if (components) {
    for (const component of components) {
      container.register({
        token: component,
        useClass: component,
        scope: 'singleton'
      });
    }
  }
}
