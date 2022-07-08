import type { Container } from '../Container';

export type FactoryResolver = {
  type: 'factory';
  factory: (container: Container) => unknown;
};
