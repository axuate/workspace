import type { Provider } from '../entities/Provider';
import type { FactoryProvider } from '../entities/FactoryProvider';

export function isFactoryProvider(provider: Provider): provider is FactoryProvider {
  return (provider as FactoryProvider).useFactory !== undefined;
}
