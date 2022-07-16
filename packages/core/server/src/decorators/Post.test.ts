import { Post } from './Post';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Post', () => {
  test('exports a function called Post', () => {
    expect(Post).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Post('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Post('/test')(A, 'PostUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'PostUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'POST', A, 'PostUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('PostUser', A);
  });
});
