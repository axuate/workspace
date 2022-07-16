import { registerComponents } from './registerComponents';
import type { Container } from '@axuate/container';

describe('registerComponents', () => {
  test('exports a function called registerComponents', () => {
    expect(registerComponents).toBeInstanceOf(Function);
  });

  test('ignores components if they are not defined', () => {
    const container = { register: jest.fn() } as any as Container;
    const components = undefined;
    registerComponents(container, components);
    expect(container.register).not.toHaveBeenCalled();
  });

  test('calls register for every component', () => {
    const container = { register: jest.fn() } as any as Container;
    const component = jest.fn();
    const components = [component];
    registerComponents(container, components);
    expect(container.register).toHaveBeenCalledWith({
      token: component,
      useClass: component,
      scope: 'singleton'
    });
  });
});
