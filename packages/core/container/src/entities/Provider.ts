import type { ClassProvider } from './ClassProvider';
import type { ValueProvider } from './ValueProvider';
import type { FactoryProvider } from './FactoryProvider';

export type Provider<T = unknown> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>;
