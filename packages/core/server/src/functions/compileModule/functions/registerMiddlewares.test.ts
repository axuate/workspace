import { registerMiddlewares } from './registerMiddlewares';
import { MIDDLEWARE } from '../../../constants/tags';
import type { Container } from '@axuate/container';

describe('registerMiddlewares', () => {
  test('exports a function called registerMiddlewares', () => {
    expect(registerMiddlewares).toBeInstanceOf(Function);
  });

  test('ignores middlewares if they are not defined', () => {
    const container = { register: jest.fn() } as any as Container;
    const middlewares = undefined;
    registerMiddlewares(container, middlewares);
    expect(container.register).not.toHaveBeenCalled();
  });

  test('calls register for every middleware', () => {
    const container = { register: jest.fn() } as any as Container;
    const middleware = jest.fn();
    const middlewares = [middleware];
    registerMiddlewares(container, middlewares);
    expect(container.register).toHaveBeenCalledWith({
      token: middleware,
      useClass: middleware,
      tags: [MIDDLEWARE],
      scope: 'singleton'
    });
  });
});
