import { extractPathSegments } from './extractPathSegments';

describe('extractPathSegments', () => {
  test('exports a function called extractPathSegments', () => {
    expect(extractPathSegments).toBeInstanceOf(Function);
  });

  test('returns a list of path segments', () => {
    expect(extractPathSegments('/a/b/c')).toEqual(['a', 'b', 'c']);
  });
});
