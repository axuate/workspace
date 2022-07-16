import { getControllerRoutes } from './getControllerRoutes';
import { ROUTES } from '../../../constants/reflection';

describe('getControllerRoutes', () => {
  test('exports a function called getControllerRoutes', () => {
    expect(getControllerRoutes).toBeInstanceOf(Function);
  });

  test('returns routes from reflection data', () => {
    const controller = jest.fn();
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(['getUsers']);
    expect(getControllerRoutes(controller)).toEqual(['getUsers']);
    expect(Reflect.getMetadata).toHaveBeenCalledWith(ROUTES, controller);
  });
});
