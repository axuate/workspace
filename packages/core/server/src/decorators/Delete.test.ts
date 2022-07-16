import { Delete } from './Delete';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Delete', () => {
  test('exports a function called Delete', () => {
    expect(Delete).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Delete('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Delete('/test')(A, 'DeleteUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'DeleteUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'DELETE', A, 'DeleteUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('DeleteUser', A);
  });
});
