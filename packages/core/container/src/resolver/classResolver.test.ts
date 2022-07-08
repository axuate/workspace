import 'reflect-metadata';
import { classResolver } from './classResolver';
import { CONSTRUCTOR_ARGS } from '../constants/reflection';
import type { Container } from '../Container';

describe('classResolver', () => {
  test('exports a function called classResolver', () => {
    expect(classResolver).toBeInstanceOf(Function);
  });

  test('returns a resolver function', () => {
    class A {}

    expect(classResolver(A)).toBeInstanceOf(Function);
  });

  test('class Reflect.getMetadata to get constructor types', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]);

    class A {}

    classResolver(A);
    expect(Reflect.getMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, A);
  });

  test('class container resolve for every constructor type', () => {
    class A {}

    class B {}

    const identifier = Symbol('A');
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([B, identifier]);
    const resolver = classResolver(A);
    const container = {
      resolve: jest.fn()
    } as any as Container;
    resolver(container);
    expect(container.resolve).toHaveBeenCalledWith(B);
    expect(container.resolve).toHaveBeenCalledWith(identifier);
  });

  test('returns a new instance of the constructor with all resolved types', () => {
    const A = jest.fn();

    class B {}

    const identifier = Symbol('A');
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([B, identifier]);
    const resolver = classResolver(A);
    const container = {
      resolve: jest.fn().mockReturnValue('{{RESOLVED_INSTANCE}}')
    } as any as Container;
    resolver(container);
    expect(A).toHaveBeenCalledWith('{{RESOLVED_INSTANCE}}', '{{RESOLVED_INSTANCE}}');
  });
});
