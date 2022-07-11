import type { Container } from '../Container';

export type Factory<T = unknown> = (container: Container) => T;
