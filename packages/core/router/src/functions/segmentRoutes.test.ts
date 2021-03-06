import { segmentRoutes } from './segmentRoutes';
import { extractSegments } from './extractSegments';

jest.mock('./extractSegments');

describe('segmentRoutes', () => {
  test('exports a function called segmentRoutes', () => {
    expect(segmentRoutes).toBeInstanceOf(Function);
  });

  test('calls extract segments for all routes', () => {
    segmentRoutes([
      { method: 'GET', path: '/a', value: 'a' },
      { method: 'GET', path: '/b', value: 'b' }
    ]);
    expect(extractSegments).toHaveBeenCalledWith('/a');
    expect(extractSegments).toHaveBeenCalledWith('/b');
  });

  test('returns a list of segmented routes', () => {
    (extractSegments as jest.Mock).mockReturnValue(['{{SEGMENT}}']);
    expect(
      segmentRoutes([
        { method: 'GET', path: '/a', value: 'a' },
        { method: 'GET', path: '/b', value: 'b' }
      ])
    ).toEqual([
      {
        route: {
          path: '/a',
          value: 'a',
          method: 'GET'
        },
        method: 'GET',
        segments: ['{{SEGMENT}}']
      },
      {
        route: {
          path: '/b',
          value: 'b',
          method: 'GET'
        },
        method: 'GET',
        segments: ['{{SEGMENT}}']
      }
    ]);
  });
});
