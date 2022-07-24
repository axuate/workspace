import { getControllerRoutes } from './getControllerRoutes';
import { getMetadata, METHODS } from '@axuate/reflection';

describe('getControllerRoutes', () => {
  test('exports a function called getControllerRoutes', () => {
    expect(getControllerRoutes).toBeInstanceOf(Function);
  });

  test('returns routes from reflection data', () => {
    const controller = jest.fn();
    (getMetadata as jest.Mock).mockReturnValueOnce(['getUsers']);
    expect(getControllerRoutes(controller)).toEqual(['getUsers']);
    expect(getMetadata).toHaveBeenCalledWith(METHODS, controller);
  });
});
