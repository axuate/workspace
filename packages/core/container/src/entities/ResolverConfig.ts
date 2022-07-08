import type { Resolver } from './Resolver';

export type ResolverConfig = {
  resolver: Resolver;
  singleton?: boolean;
  value?: unknown;
  executed?: boolean;
};
