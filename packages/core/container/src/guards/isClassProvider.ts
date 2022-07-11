import type { Provider } from '../entities/Provider';
import type { ClassProvider } from '../entities/ClassProvider';

export function isClassProvider(provider: Provider): provider is ClassProvider {
  return (provider as ClassProvider).useClass !== undefined;
}
