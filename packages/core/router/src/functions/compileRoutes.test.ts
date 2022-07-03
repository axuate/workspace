import { compileRoutes } from './compileRoutes';
import { extractSegments } from './extractSegments';
import type { RouteGraph } from '../entities/RouteGraph';

describe('compileRoutes', () => {
  test('exports a function called compileRoutes', () => {
    expect(compileRoutes).toBeInstanceOf(Function);
  });

  test('returns an empty graph if no paths are given', () => {
    expect(compileRoutes([])).toEqual({});
  });

  test('returns a graph with a single static node', () => {
    expect(
      compileRoutes([{ segments: extractSegments('/a'), route: { path: '/a', value: 'a' } }])
    ).toEqual({
      a: {
        type: 'static',
        name: 'a',
        route: { path: '/a', value: 'a' }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph with a single variable node', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/{name}'), route: { path: '/{name}', value: 'a' } }
      ])
    ).toEqual({
      '*': {
        type: 'variable',
        name: 'name',
        route: { path: '/{name}', value: 'a' }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph with two static nodes', () => {
    expect(
      compileRoutes([{ segments: extractSegments('/a/b'), route: { path: '/a/b', value: 'a' } }])
    ).toEqual({
      a: {
        type: 'static',
        name: 'a',
        children: {
          b: {
            type: 'static',
            name: 'b',
            route: { path: '/a/b', value: 'a' }
          }
        }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph with three static nodes', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a/b/c'), route: { path: '/a/b/c', value: 'a' } }
      ])
    ).toEqual({
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
                route: { path: '/a/b/c', value: 'a' }
              }
            }
          }
        }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph with two static nodes and a variable node', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a/{name}/c'), route: { value: 'a', path: '/a/{name}/c' } }
      ])
    ).toEqual({
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
                route: { value: 'a', path: '/a/{name}/c' }
              }
            }
          }
        }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph with two static nodes from two paths', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a'), route: { value: 'a', path: '/a' } },
        { segments: extractSegments('/b'), route: { value: 'b', path: '/b' } }
      ])
    ).toEqual({
      a: {
        type: 'static',
        name: 'a',
        route: { value: 'a', path: '/a' }
      },
      b: {
        type: 'static',
        name: 'b',
        route: { value: 'b', path: '/b' }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph that has two merging paths', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a'), route: { value: 'a', path: '/a' } },
        { segments: extractSegments('/a/b'), route: { value: 'b', path: '/a/b' } }
      ])
    ).toEqual({
      a: {
        type: 'static',
        name: 'a',
        route: { value: 'a', path: '/a' },
        children: {
          b: {
            type: 'static',
            name: 'b',
            route: { value: 'b', path: '/a/b' }
          }
        }
      }
    } as RouteGraph<string>);
  });

  test('returns a graph when a shorter route is added after a longer route', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a/b/c'), route: { value: 'a', path: '/a/b/c' } },
        { segments: extractSegments('/a/b'), route: { value: 'b', path: '/a/b' } }
      ])
    ).toEqual({
      a: {
        type: 'static',
        name: 'a',
        children: {
          b: {
            type: 'static',
            name: 'b',
            route: { value: 'b', path: '/a/b' },
            children: {
              c: {
                type: 'static',
                name: 'c',
                route: { value: 'a', path: '/a/b/c' }
              }
            }
          }
        }
      }
    } as RouteGraph<string>);
  });

  test('throws an error if two paths are identical', () => {
    expect(() => {
      compileRoutes([
        { route: { value: 'a', path: '/a/b' }, segments: extractSegments('/a/b') },
        { route: { value: 'b', path: '/a/b' }, segments: extractSegments('/a/b') }
      ]);
    }).toThrowError('Route /a/b has already been defined.');
  });

  test('returns a graph that has two merging paths with variables', () => {
    expect(
      compileRoutes([
        { segments: extractSegments('/a/{name}/b'), route: { value: 'a', path: '/a/{name}/b' } },
        { segments: extractSegments('/a/b/c'), route: { value: 'b', path: '/a/b/c' } }
      ])
    ).toEqual({
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
                route: { value: 'b', path: '/a/b/c' }
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
                route: { value: 'a', path: '/a/{name}/b' }
              }
            }
          }
        }
      }
    } as RouteGraph<string>);
  });
});
