import { compileRoutes } from './compileRoutes';
import { extractSegments } from './extractSegments';
import type { MethodGraph } from '../entities/MethodGraph';

describe('compileRoutes', () => {
  test('exports a function called compileRoutes', () => {
    expect(compileRoutes).toBeInstanceOf(Function);
  });

  test('returns an empty graph if no paths are given', () => {
    expect(compileRoutes([])).toEqual({});
  });

  test('returns a graph with a single static node', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a'),
          method: 'GET',
          route: { method: 'GET', path: '/a', value: 'a' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          route: { method: 'GET', path: '/a', value: 'a' }
        }
      }
    } as MethodGraph<string>);
  });

  test('returns a graph with a single variable node', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/{name}'),
          method: 'GET',
          route: { method: 'GET', path: '/{name}', value: 'a' }
        }
      ])
    ).toEqual({
      GET: {
        '*': {
          type: 'variable',
          name: 'name',
          route: { method: 'GET', path: '/{name}', value: 'a' }
        }
      } as MethodGraph<string>
    });
  });

  test('returns a graph with two static nodes', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a/b'),
          method: 'GET',
          route: { method: 'GET', path: '/a/b', value: 'a' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          children: {
            b: {
              type: 'static',
              name: 'b',
              route: { method: 'GET', path: '/a/b', value: 'a' }
            }
          }
        }
      } as MethodGraph<string>
    });
  });

  test('returns a graph with three static nodes', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a/b/c'),
          method: 'GET',
          route: { method: 'GET', path: '/a/b/c', value: 'a' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          children: {
            b: {
              type: 'static',
              name: 'b',
              children: {
                c: {
                  type: 'static',
                  name: 'c',
                  route: { method: 'GET', path: '/a/b/c', value: 'a' }
                }
              }
            }
          }
        }
      }
    } as MethodGraph<string>);
  });

  test('returns a graph with two static nodes and a variable node', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a/{name}/c'),
          method: 'GET',
          route: { method: 'GET', value: 'a', path: '/a/{name}/c' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          children: {
            '*': {
              type: 'variable',
              name: 'name',
              children: {
                c: {
                  type: 'static',
                  name: 'c',
                  route: { method: 'GET', value: 'a', path: '/a/{name}/c' }
                }
              }
            }
          }
        }
      } as MethodGraph<string>
    });
  });

  test('returns a graph with two static nodes from two paths', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a'),
          method: 'GET',
          route: { method: 'GET', value: 'a', path: '/a' }
        },
        {
          segments: extractSegments('/b'),
          method: 'GET',
          route: { method: 'GET', value: 'b', path: '/b' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          route: { method: 'GET', value: 'a', path: '/a' }
        },
        b: {
          type: 'static',
          name: 'b',
          route: { method: 'GET', value: 'b', path: '/b' }
        }
      }
    } as MethodGraph<string>);
  });

  test('returns a graph that has two merging paths', () => {
    expect(
      compileRoutes([
        {
          segments: extractSegments('/a'),
          method: 'GET',
          route: { method: 'GET', value: 'a', path: '/a' }
        },
        {
          segments: extractSegments('/a/b'),
          method: 'GET',
          route: { method: 'GET', value: 'b', path: '/a/b' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          route: { method: 'GET', value: 'a', path: '/a' },
          children: {
            b: {
              type: 'static',
              name: 'b',
              route: { method: 'GET', value: 'b', path: '/a/b' }
            }
          }
        }
      }
    } as MethodGraph<string>);
  });

  test('returns a graph when a shorter route is added after a longer route', () => {
    expect(
      compileRoutes([
        {
          method: 'GET',
          segments: extractSegments('/a/b/c'),
          route: { method: 'GET', value: 'a', path: '/a/b/c' }
        },
        {
          method: 'GET',
          segments: extractSegments('/a/b'),
          route: { method: 'GET', value: 'b', path: '/a/b' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          children: {
            b: {
              type: 'static',
              name: 'b',
              route: { method: 'GET', value: 'b', path: '/a/b' },
              children: {
                c: {
                  type: 'static',
                  name: 'c',
                  route: { method: 'GET', value: 'a', path: '/a/b/c' }
                }
              }
            }
          }
        }
      }
    } as MethodGraph<string>);
  });

  test('throws an error if two paths are identical', () => {
    expect(() => {
      compileRoutes([
        {
          route: { method: 'GET', value: 'a', path: '/a/b' },
          method: 'GET',
          segments: extractSegments('/a/b')
        },
        {
          route: { method: 'GET', value: 'b', path: '/a/b' },
          method: 'GET',
          segments: extractSegments('/a/b')
        }
      ]);
    }).toThrowError('Route /a/b has already been defined.');
  });

  test('returns a graph that has two merging paths with variables', () => {
    expect(
      compileRoutes([
        {
          method: 'GET',
          segments: extractSegments('/a/{name}/b'),
          route: { method: 'GET', value: 'a', path: '/a/{name}/b' }
        },
        {
          method: 'GET',
          segments: extractSegments('/a/b/c'),
          route: { method: 'GET', value: 'b', path: '/a/b/c' }
        }
      ])
    ).toEqual({
      GET: {
        a: {
          type: 'static',
          name: 'a',
          children: {
            b: {
              type: 'static',
              name: 'b',
              children: {
                c: {
                  type: 'static',
                  name: 'c',
                  route: { method: 'GET', value: 'b', path: '/a/b/c' }
                }
              }
            },
            '*': {
              type: 'variable',
              name: 'name',
              children: {
                b: {
                  type: 'static',
                  name: 'b',
                  route: { method: 'GET', value: 'a', path: '/a/{name}/b' }
                }
              }
            }
          }
        }
      }
    });
  });
});
