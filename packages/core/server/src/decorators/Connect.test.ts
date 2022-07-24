import { Connect } from './Connect';
import { Metadata, Method } from '@axuate/reflection';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';

describe('Connect', () => {
  test('exports a function called Connect', () => {
    expect(Connect).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Connect('/test')).toBeInstanceOf(Function);
  });

  test('marks method with Method decorator', () => {
    const target = jest.fn();
    Connect('/test')(target, 'test', {});
    expect(Method()).toHaveBeenCalledWith(target, 'test', {});
  });

  test('saves request path', () => {
    const target = jest.fn();
    Connect('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_PATH, '/test');
  });

  test('saves request method', () => {
    const target = jest.fn();
    Connect('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_METHOD, 'CONNECT');
  });
});
