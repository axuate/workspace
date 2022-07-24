import { Options } from './Options';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { Metadata, Method } from '@axuate/reflection';

describe('Options', () => {
  test('exports a function called Options', () => {
    expect(Options).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Options('/test')).toBeInstanceOf(Function);
  });

  test('marks method with Method decorator', () => {
    const target = jest.fn();
    Options('/test')(target, 'test', {});
    expect(Method()).toHaveBeenCalledWith(target, 'test', {});
  });

  test('saves request path', () => {
    const target = jest.fn();
    Options('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_PATH, '/test');
  });

  test('saves request method', () => {
    const target = jest.fn();
    Options('/test')(target, 'test', {});
    expect(Metadata).toHaveBeenCalledWith(REQUEST_METHOD, 'OPTIONS');
  });
});
