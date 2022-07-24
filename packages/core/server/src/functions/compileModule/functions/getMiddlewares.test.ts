import { getMiddlewares } from './getMiddlewares';
import type { Container } from '@axuate/container';
import { MIDDLEWARES } from '../../../constants/reflection';
import { getMetadata } from '@axuate/reflection';

describe('getMiddlewares', () => {
  test('exports a function called getMiddlewares', () => {
    expect(getMiddlewares).toBeInstanceOf(Function);
  });

  test('gets middleware from controller', () => {
    const container = {} as Container;
    const constructor = jest.fn();
    getMiddlewares(container, constructor);
    expect(getMetadata).toHaveBeenCalledWith(MIDDLEWARES, constructor, undefined);
  });

  test('gets middleware from method', () => {
    const container = {} as Container;
    const constructor = jest.fn();
    getMiddlewares(container, constructor, 'getUsers');
    expect(getMetadata).toHaveBeenCalledWith(
      MIDDLEWARES,
      Object.getPrototypeOf(constructor),
      'getUsers'
    );
  });

  test('return an empty array if no middlewares are registered', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const container = {} as Container;
    const constructor = jest.fn();
    expect(getMiddlewares(container, constructor, 'getUsers')).toEqual([]);
  });

  test('resolves all middlewares if they are defined', () => {
    (getMetadata as jest.Mock).mockReturnValueOnce([]);
    const container = {
      resolveAll: jest.fn().mockReturnValueOnce(['{{MIDDLEWARE}}'])
    } as any as Container;
    const constructor = jest.fn();
    expect(getMiddlewares(container, constructor, 'getUsers')).toEqual(['{{MIDDLEWARE}}']);
  });
});
