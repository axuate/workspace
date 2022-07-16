import { getMiddlewares } from './getMiddlewares';
import type { Container } from '@axuate/container';
import { MIDDLEWARES } from '../../../constants/reflection';

describe('getMiddlewares', () => {
  test('exports a function called getMiddlewares', () => {
    expect(getMiddlewares).toBeInstanceOf(Function);
  });

  test('gets middleware from controller', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const container = {} as Container;
    const constructor = jest.fn();
    getMiddlewares(container, constructor);
    expect(Reflect.getMetadata).toHaveBeenCalledWith(MIDDLEWARES, constructor, undefined);
  });

  test('gets middleware from method', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const container = {} as Container;
    const constructor = jest.fn();
    getMiddlewares(container, constructor, 'getUsers');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(
      MIDDLEWARES,
      constructor.prototype,
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
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]);
    const container = {
      resolveAll: jest.fn().mockReturnValueOnce(['{{MIDDLEWARE}}'])
    } as any as Container;
    const constructor = jest.fn();
    expect(getMiddlewares(container, constructor, 'getUsers')).toEqual(['{{MIDDLEWARE}}']);
  });
});
