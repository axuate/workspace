import { Middlewares } from './Middlewares';
import { MIDDLEWARES } from '../constants/reflection';
import type { Middleware } from '../entities/Middleware';
import type { Constructor } from '@axuate/container';

describe('Middlewares', () => {
  test('exports a function called Middlewares', () => {
    expect(Middlewares).toBeInstanceOf(Function);
  });

  test('returns a class or method decorator', () => {
    expect(Middlewares([])).toBeInstanceOf(Function);
  });

  test('saves middlewares to method', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    const mws: Constructor<Middleware>[] = [];
    class A {}
    (Middlewares(mws) as MethodDecorator)(A, 'getUsers', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(MIDDLEWARES, mws, A, 'getUsers');
  });

  test('saves middlewares to class', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    const mws = [];
    class A {}
    (Middlewares(mws) as ClassDecorator)(A);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(MIDDLEWARES, mws, A, undefined);
  });
});
