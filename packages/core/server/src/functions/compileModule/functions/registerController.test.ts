import { registerController } from './registerController';
import type { Container } from '@axuate/container';
import { CONTROLLER } from '../../../constants/tags';

describe('registerController', () => {
  test('exports a function called registerController', () => {
    expect(registerController).toBeInstanceOf(Function);
  });

  test('registers the controller at the given container', () => {
    const container = { register: jest.fn() } as any as Container;
    const controller = jest.fn();
    registerController(container, controller);
    expect(container.register).toHaveBeenCalledWith({
      token: controller,
      useClass: controller,
      scope: 'singleton',
      tags: [CONTROLLER]
    });
  });
});
