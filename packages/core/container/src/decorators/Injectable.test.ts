import 'reflect-metadata';
import { Injectable } from './Injectable';
import { CONSTRUCTOR_ARGS } from '../constants/reflection';

describe('Injectable', () => {
  test('exports a function called Injectable', () => {
    expect(Injectable).toBeInstanceOf(Function);
  });

  test('calls Reflect.getMetadata to get constructor parameters', () => {
    jest.spyOn(Reflect, 'getMetadata');
    class A {}
    Injectable(A);
    expect(Reflect.getMetadata).toHaveBeenCalledWith('design:paramtypes', A);
  });

  test('class Reflect.defineMetadata with all constructor types', () => {
    const types = [];
    jest.spyOn(Reflect, 'defineMetadata');
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(types);
    class A {}
    Injectable(A);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, types, A);
  });

  test('does not override existing constructor arg definitions', () => {
    const identifier = Symbol('a');
    jest
      .spyOn(Reflect, 'getMetadata')
      .mockReturnValueOnce([Array, Number])
      .mockReturnValueOnce([identifier]);
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Injectable(A);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, [identifier, Number], A);
  });
});
