import type { Provider } from '../entities/Provider';
import type { ValueProvider } from '../entities/ValueProvider';

export function isValueProvider(provider: Provider): provider is ValueProvider {
  return (provider as ValueProvider).useValue !== undefined;
}
