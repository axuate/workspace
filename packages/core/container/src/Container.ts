import type { Constructor } from './entities/Constructor';
import type { Resolver } from './entities/Resolver';
import type { ResolverConfig } from './entities/ResolverConfig';

export class Container {
  private readonly identifier = new Map<Symbol | Constructor, ResolverConfig>();

  public register(identifier: Symbol | Constructor, resolver: Resolver): this {
    this.identifier.set(identifier, {
      resolver
    });
    return this;
  }

  public registerSingleton(identifier: Symbol | Constructor, resolver: Resolver): this {
    this.identifier.set(identifier, {
      resolver,
      singleton: true
    });
    return this;
  }

  public resolve<T>(identifier: Symbol | Constructor): T {
    if (!this.identifier.has(identifier)) {
      if (typeof identifier === 'symbol') {
        throw new Error(`Symbol identifier "${identifier.description}" is not registered.`);
      } else {
        throw new Error(
          `Constructor identifier "${(identifier as Constructor).name}" is not registered.`
        );
      }
    }
    const config = this.identifier.get(identifier);
    const { singleton, resolver, executed } = config;

    if (singleton) {
      if (!executed) {
        config.executed = true;
        config.value = resolver(this);
      }
      return config.value as T;
    } else {
      return resolver(this) as T;
    }
  }
}
