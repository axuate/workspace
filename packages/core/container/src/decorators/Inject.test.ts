import { Inject } from './Inject';
import { CONSTRUCTOR_ARGS } from '../constants/reflection';

describe('Inject', () => {
  test('exports a function called Inject', () => {
    expect(Inject).toBeInstanceOf(Function);
  });

  test('saves the given identifier to the metadata', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);
    jest.spyOn(Reflect, 'defineMetadata');
    const identifier = Symbol('A');
    class A {}
    Inject(identifier)(A, undefined, 0);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, [identifier], A);
  });

  test('should append metadata to existing types array', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([Number]);
    jest.spyOn(Reflect, 'defineMetadata');
    const identifier = Symbol('A');
    class A {}
    Inject(identifier)(A, undefined, 1);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, [Number, identifier], A);
  });
});
