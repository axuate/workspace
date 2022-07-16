import 'reflect-metadata';
import { Connect } from './Connect';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Connect', () => {
  test('exports a function called Connect', () => {
    expect(Connect).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Connect('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Connect('/test')(A, 'ConnectUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'ConnectUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(
      REQUEST_METHOD,
      'CONNECT',
      A,
      'ConnectUser'
    );
    expect(addRouteToReflection).toHaveBeenCalledWith('ConnectUser', A);
  });
});
