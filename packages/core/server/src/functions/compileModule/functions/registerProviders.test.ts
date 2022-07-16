import { registerProviders } from './registerProviders';
import type { Container, Provider } from '@axuate/container';

describe('registerProviders', () => {
  test('exports a function called registerProviders', () => {
    expect(registerProviders).toBeInstanceOf(Function);
  });

  test('ignores providers if they are not defined', () => {
    const container = { register: jest.fn() } as any as Container;
    const providers = undefined;
    registerProviders(container, providers);
    expect(container.register).not.toHaveBeenCalled();
  });

  test('calls register for every provider', () => {
    const container = { register: jest.fn() } as any as Container;
    const provider = jest.fn() as any as Provider;
    const providers = [provider] as Provider[];
    registerProviders(container, providers);
    expect(container.register).toHaveBeenCalledWith(provider);
  });
});
