import { Post } from './Post';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { Metadata, Method } from '@axuate/reflection';

describe('Post', () => {
  test('exports a function called Post', () => {
    expect(Post).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Post('/test')).toBeInstanceOf(Function);
  });

  test('marks method with Method decorator', () => {
    const target = jest.fn();
    Post('/test')(target, 'test', {});
    expect(Method()).toHaveBeenCalledWith(target, 'test', {});
  });

  test('saves request path', () => {
    const target = jest.fn();
    Post('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_PATH, '/test');
  });

  test('saves request method', () => {
    const target = jest.fn();
    Post('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_METHOD, 'POST');
  });
});
