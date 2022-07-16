import type { Container, Provider } from '@axuate/container';

export function registerProviders(container: Container, providers?: Provider[]) {
  if (providers) {
    for (const provider of providers) {
      container.register(provider);
    }
  }
}
