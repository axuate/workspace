import { Put } from './Put';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { Metadata, Method } from '@axuate/reflection';

describe('Put', () => {
  test('exports a function called Put', () => {
    expect(Put).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Put('/test')).toBeInstanceOf(Function);
  });

  test('marks method with Method decorator', () => {
    const target = jest.fn();
    Put('/test')(target, 'test', {});
    expect(Method()).toHaveBeenCalledWith(target, 'test', {});
  });

  test('saves request path', () => {
    const target = jest.fn();
    Put('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_PATH, '/test');
  });

  test('saves request method', () => {
    const target = jest.fn();
    Put('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_METHOD, 'PUT');
  });
});
