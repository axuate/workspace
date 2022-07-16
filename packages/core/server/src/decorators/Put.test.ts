import 'reflect-metadata';
import { Put } from './Put';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Put', () => {
  test('exports a function called Put', () => {
    expect(Put).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Put('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Put('/test')(A, 'PutUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'PutUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'PUT', A, 'PutUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('PutUser', A);
  });
});
