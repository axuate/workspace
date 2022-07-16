import { Trace } from './Trace';
import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { addRouteToReflection } from '../functions/addRouteToReflection';

jest.mock('../functions/addRouteToReflection');

describe('Trace', () => {
  test('exports a function called Trace', () => {
    expect(Trace).toBeInstanceOf(Function);
  });

  test('returns a method decorator', () => {
    expect(Trace('/test')).toBeInstanceOf(Function);
  });

  test('saves path and method to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Trace('/test')(A, 'TraceUser', {});
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_PATH, '/test', A, 'TraceUser');
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(REQUEST_METHOD, 'TRACE', A, 'TraceUser');
    expect(addRouteToReflection).toHaveBeenCalledWith('TraceUser', A);
  });
});
