import { registerProperty } from './registerProperty';
import 'reflect-metadata';

describe('registerProperty', () => {
  test('exports a function called registerProperty', () => {
    expect(registerProperty).toBeInstanceOf(Function);
  });

  test('calls Reflect getMetadata on class prototype', () => {
    jest.spyOn(Reflect, 'getMetadata');

    class A {}

    registerProperty(A.prototype, 'name');
    expect(Reflect.getMetadata).toBeCalledWith('properties', A.prototype);
  });

  test('set properties metadata to a new array if it is the first property', () => {
    jest.spyOn(Reflect, 'getMetadata');
    jest.spyOn(Reflect, 'defineMetadata');

    class A {}

    (Reflect.getMetadata as jest.Mock).mockReturnValueOnce(undefined);
    registerProperty(A.prototype, 'name');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith('properties', ['name'], A.prototype);
  });

  test('add property of existing array of properties', () => {
    jest.spyOn(Reflect, 'getMetadata');
    jest.spyOn(Reflect, 'defineMetadata');

    class A {}

    (Reflect.getMetadata as jest.Mock).mockReturnValueOnce(['age']);
    registerProperty(A.prototype, 'name');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith('properties', ['age', 'name'], A.prototype);
  });
});
