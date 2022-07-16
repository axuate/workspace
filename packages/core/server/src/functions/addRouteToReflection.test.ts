import 'reflect-metadata';
import { addRouteToReflection } from './addRouteToReflection';
import { ROUTES } from '../constants/reflection';

describe('addRouteToReflection', () => {
  test('exports a function called addRouteToReflection', () => {
    expect(addRouteToReflection).toBeInstanceOf(Function);
  });

  test('adds route to class if no route is already registered', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(undefined);
    jest.spyOn(Reflect, 'defineMetadata');
    const controller = jest.fn();
    addRouteToReflection('getUser', controller);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(ROUTES, ['getUser'], controller);
  });

  test('adds route to class if routes are already registered', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(['getAccounts']);
    jest.spyOn(Reflect, 'defineMetadata');
    const controller = jest.fn();
    addRouteToReflection('getUser', controller);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(
      ROUTES,
      ['getAccounts', 'getUser'],
      controller
    );
  });
});
