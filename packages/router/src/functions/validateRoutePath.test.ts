import { validateRoutePath } from './validateRoutePath';
import { validatePath } from './validatePath';

jest.mock('./validatePath');

describe('validateRoutePath', () => {
  test('exports a function called validateRoutePath', () => {
    expect(validateRoutePath).toBeInstanceOf(Function);
  });

  test('executes validatePath function', () => {
    validateRoutePath('/a/b/c');
    expect(validatePath).toHaveBeenCalledWith('/a/b/c');
  });

  test('throws an error if star wildcard is used', () => {
    expect(() => {
      validateRoutePath('/a/*/b');
    }).toThrowError('All wildcard must be named');
  });
});
