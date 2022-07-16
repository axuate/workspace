import { resolveControllers } from './resolveControllers';
import type { Container } from '@axuate/container';
import { resolveController } from './resolveController';
import { registerController } from './registerController';

jest.mock('./resolveController');
jest.mock('./registerController');

describe('resolveControllers', () => {
  beforeEach(() => {
    (resolveController as jest.Mock).mockReturnValueOnce(['{{ROUTES}}']);
  });

  test('exports a function called compileController', () => {
    expect(resolveControllers).toBeInstanceOf(Function);
  });

  test('returns an empty array if controllers is undefined', () => {
    expect(resolveControllers({} as Container)).toEqual([]);
  });

  test('calls registerController for each controller', () => {
    const controller = jest.fn();
    const container = {} as Container;
    resolveControllers(container, [controller]);
    expect(registerController).toHaveBeenCalledWith(container, controller);
  });

  test('calls resolveController for each controller', () => {
    const controller = jest.fn();
    const container = {} as Container;
    resolveControllers(container, [controller]);
    expect(resolveController).toHaveBeenCalledWith(container, controller);
  });

  test('returns concatenated return value of resolveController', () => {
    const controller = jest.fn();
    const container = {} as Container;
    expect(resolveControllers(container, [controller])).toEqual(['{{ROUTES}}']);
  });
});
