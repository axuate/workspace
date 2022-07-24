import { Patch } from './Patch';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { Metadata, Method } from '@axuate/reflection';

describe('Patch', () => {
  test('exports a function called Patch', () => {
    expect(Patch).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Patch('/test')).toBeInstanceOf(Function);
  });

  test('marks method with Method decorator', () => {
    const target = jest.fn();
    Patch('/test')(target, 'test', {});
    expect(Method()).toHaveBeenCalledWith(target, 'test', {});
  });

  test('saves request path', () => {
    const target = jest.fn();
    Patch('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_PATH, '/test');
  });

  test('saves request method', () => {
    const target = jest.fn();
    Patch('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_METHOD, 'PATCH');
  });
});
