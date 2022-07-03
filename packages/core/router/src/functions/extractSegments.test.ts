import { extractSegments } from './extractSegments';
import { validateRoutePath } from './validateRoutePath';

jest.mock('./validateRoutePath');

describe('extractSegments', () => {
  test('exports a function called extractSegments', () => {
    expect(extractSegments).toBeInstanceOf(Function);
  });

  test('should call validatePath', () => {
    extractSegments('/a');
    expect(validateRoutePath).toHaveBeenCalledWith('/a');
  });

  test('returns a single static segment for path /a', () => {
    expect(extractSegments('/a')).toEqual([
      {
        type: 'static',
        name: 'a'
      }
    ]);
  });

  test('returns multiple segments for path /a/b', () => {
    expect(extractSegments('/a/b')).toEqual([
      {
        type: 'static',
        name: 'a'
      },
      {
        type: 'static',
        name: 'b'
      }
    ]);
  });

  test('returns a static and a variable segment for path /a/{id}', () => {
    expect(extractSegments('/a/{id}')).toEqual([
      {
        type: 'static',
        name: 'a'
      },
      {
        type: 'variable',
        name: 'id'
      }
    ]);
  });

  test('throws an error if two variable segments have the same name', () => {
    expect(() => {
      extractSegments('/a/{id}/{id}');
    }).toThrowError('Variables must have a unique name');
  });
});
