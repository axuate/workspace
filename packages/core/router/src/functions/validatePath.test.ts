import { validatePath } from './validatePath';

describe('validatePath', () => {
  test('exports a function called validatePath', () => {
    expect(validatePath).toBeInstanceOf(Function);
  });

  test('throws an error if path is only a slash', () => {
    expect(() => {
      validatePath('/');
    }).toThrowError('A single slash is not a valid route');
  });

  test('throws an error if path does not start with a slash', () => {
    expect(() => {
      validatePath('a/b');
    }).toThrowError('All routes should start with a slash');
  });

  test('throws an error if path ends with a slash', () => {
    expect(() => {
      validatePath('/a/b/');
    }).toThrowError('Routes must not end with a slash');
  });

  test('throws an error if path contains dots', () => {
    expect(() => {
      validatePath('/a/b.js');
    }).toThrowError('Dots are not allowed in routes');
  });

  test('throws an error if path segment is empty', () => {
    expect(() => {
      validatePath('/a//b');
    }).toThrowError('Path segments must not be empty');
  });
});
