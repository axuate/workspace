import type { Provider } from './entities/Provider';
import type { Token } from './entities/Token';
import { getTokenName } from './functions/getTokenName';
import { isValueProvider } from './guards/isValueProvider';
import { isFactoryProvider } from './guards/isFactoryProvider';
import { isClassProvider } from './guards/isClassProvider';
import { CONSTRUCTOR_ARGS } from './constants/reflection';
import type { FactoryProvider } from './entities/FactoryProvider';
import type { ClassProvider } from './entities/ClassProvider';

export class Container {
  private readonly providers = new Map<Token, Provider>();
  private readonly values = new Map<Token, unknown>();
  private readonly parent: Container | undefined;
  private static readonly tags = new Map<symbol, Set<Token>>();

  public constructor(parent?: Container) {
    this.parent = parent;
  }

  public register<T>(provider: Provider<T>): this {
    if (this.providers.has(provider.token)) {
      const tokenName = getTokenName(provider.token);
      throw new Error(`Token "${tokenName}" already registered.`);
    }

    if (isClassProvider(provider)) {
      const tokens: Token[] = Reflect.getMetadata(CONSTRUCTOR_ARGS, provider.useClass);
      if (typeof tokens === 'undefined') {
        throw new Error(`Class "${provider.useClass.name}" is not marked as injectable.`);
      }
    }

    if (provider.tags) {
      for (const tag of provider.tags) {
        const tokenSet = Container.tags.get(tag);
        if (tokenSet) {
          tokenSet.add(provider.token);
        } else {
          const set = new Set<Token>();
          set.add(provider.token);
          Container.tags.set(tag, set);
        }
      }
    }
    this.providers.set(provider.token, provider);
    return this;
  }

  public hasToken(token: Token): boolean {
    if (this.providers.has(token)) {
      return true;
    }
    if (this.parent) {
      return this.parent.hasToken(token);
    }
    return false;
  }

  public resolveTag<T>(tag: symbol): T[] {
    const tokens = Container.tags.get(tag);
    if (tokens) {
      return this.resolveAll(Array.from(tokens)) as T[];
    }
    return [];
  }

  public resolveAll<T>(tokens: Token<T>[]): T[] {
    return tokens.map((token) => this.resolve(token));
  }

  public resolve<T>(token: Token<T>): T {
    const provider = this.providers.get(token);
    if (!provider) {
      if (this.parent && this.parent.hasToken(token)) {
        return this.parent.resolve(token);
      }
      const tokenName = getTokenName(token);
      throw new Error(`Token "${tokenName}" is not registered.`);
    }

    if (isValueProvider(provider)) {
      return provider.useValue as T;
    } else if (isFactoryProvider(provider)) {
      return this.resolveFactoryProvider(provider) as T;
    } else if (isClassProvider(provider)) {
      return this.resolveClassProvider(provider) as T;
    }
  }

  private cacheValue<T>(provider: ClassProvider | FactoryProvider, factory: () => T): T {
    const { token, scope } = provider;
    if (scope === 'transient') {
      return factory();
    }
    if (this.values.has(token)) {
      return this.values.get(token) as T;
    }
    const value = factory();
    this.values.set(token, value);
    return value;
  }

  private resolveClassProvider<T>(provider: ClassProvider<T>): T {
    return this.cacheValue(provider, () => {
      const constructor = provider.useClass;
      const tokens: Token[] = Reflect.getMetadata(CONSTRUCTOR_ARGS, constructor);
      const args = tokens.map((token) => this.resolve(token));
      return new constructor(...args);
    });
  }

  private resolveFactoryProvider<T>(provider: FactoryProvider<T>): T {
    return this.cacheValue(provider, () => {
      const factory = provider.useFactory;
      return factory(this);
    });
  }
}
