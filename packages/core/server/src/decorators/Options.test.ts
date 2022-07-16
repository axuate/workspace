import { Options } from './Options';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Options', () => {
  test('exports a function called Options', () => {
    expect(Options).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Options('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Options('/test')(A, 'OptionsUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'OptionsUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(
      REQUEST_METHOD,
      'OPTIONS',
      A,
      'OptionsUser'
    );
    expect(addRouteToReflection).toHaveBeenCalledWith('OptionsUser', A);
  });
});
