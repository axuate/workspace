import 'reflect-metadata';
import { Patch } from './Patch';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Patch', () => {
  test('exports a function called Patch', () => {
    expect(Patch).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Patch('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Patch('/test')(A, 'PatchUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'PatchUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'PATCH', A, 'PatchUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('PatchUser', A);
  });
});
