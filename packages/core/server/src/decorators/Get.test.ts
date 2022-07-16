import { Get } from './Get';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Get', () => {
  test('exports a function called Get', () => {
    expect(Get).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Get('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Get('/test')(A, 'getUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'getUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'GET', A, 'getUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('getUser', A);
  });
});
