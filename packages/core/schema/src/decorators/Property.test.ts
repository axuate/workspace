import { Property } from './Property';
import { registerProperty } from '../functions/registerProperty';
import { PROPERTY_CONFIG } from '../constants/reflection';

jest.mock('../functions/registerProperty');

describe('Property', () => {
  test('exports a function called Property', () => {
    expect(Property).toBeInstanceOf(Function);
  });

  test('class registerProperty with class prototype and propertyKey', () => {
    class A {
      @Property({ type: String })
      public declare name: string;
    }

    expect(registerProperty).toHaveBeenCalledWith(A.prototype, 'name');
  });

  test('registers property config to metadata', () => {
    jest.spyOn(Reflect, 'defineMetadata');

    class A {
      @Property({ isArray: true, type: String })
      public declare name: string;
    }

    expect(Reflect.defineMetadata).toHaveBeenCalledWith(
      PROPERTY_CONFIG,
      { isArray: true, type: String },
      A.prototype,
      'name'
    );
  });
});
