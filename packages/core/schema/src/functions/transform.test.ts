import { transform } from './transform';
import { getPropertyConfig } from './getPropertyConfig';
import { isPrimitive } from './isPrimitive';

jest.mock('./getPropertyConfig');
jest.mock('./isPrimitive');

describe('transform', () => {
  test('exports a function called transform', () => {
    expect(transform).toBeInstanceOf(Function);
  });

  test('copy primitive values', () => {
    (getPropertyConfig as jest.Mock).mockReturnValueOnce({
      type: String
    });
    (isPrimitive as jest.Mock).mockReturnValueOnce(true);

    class A {
      public declare name: string;
    }

    const instance = new A();
    instance.name = 'a';
    const pojo = {} as A;
    transform(A.prototype, instance, pojo, 'name', jest.fn());
    expect(pojo).toEqual(instance);
  });

  test('dereference primitive arrays', () => {
    (getPropertyConfig as jest.Mock).mockReturnValueOnce({
      type: String,
      isArray: true
    });
    (isPrimitive as jest.Mock).mockReturnValueOnce(true);

    class A {
      public declare names: string[];
    }

    const instance = new A();
    instance.names = ['A', 'B'];
    const pojo = {} as A;
    transform(A.prototype, instance, pojo, 'names', jest.fn());
    expect(pojo).toEqual(instance);
    expect(pojo.names).not.toBe(instance.names);
  });

  test('calls callback function for all sub entities', () => {
    class B {}

    class A {
      public declare b: B;
    }

    (getPropertyConfig as jest.Mock).mockReturnValueOnce({
      type: B
    });
    (isPrimitive as jest.Mock).mockReturnValueOnce(false);
    const instance = new A();
    instance.b = new B();
    const pojo = {} as A;
    const callback = jest.fn().mockReturnValueOnce({});
    transform(A.prototype, instance, pojo, 'b', callback);
    expect(pojo).toEqual(instance);
    expect(callback).toHaveBeenCalledWith(instance.b, { type: B });
  });

  test('calls callback function for all items of sub entity array', () => {
    class B {}

    class A {
      public declare b: B[];
    }

    (getPropertyConfig as jest.Mock).mockReturnValueOnce({
      type: B,
      isArray: true
    });
    (isPrimitive as jest.Mock).mockReturnValueOnce(false);
    const instance = new A();
    instance.b = [new B()];
    const pojo = {} as A;
    const callback = jest.fn().mockReturnValueOnce({});
    transform(A.prototype, instance, pojo, 'b', callback);
    expect(pojo).toEqual(instance);
    expect(callback).toHaveBeenCalledWith(instance.b[0], { type: B, isArray: true });
  });

  test('throws an error if from object does not contain required parameter', () => {
    class A {}

    (getPropertyConfig as jest.Mock).mockReturnValueOnce({
      type: String
    });
    const instance = new A();
    expect(() => {
      transform(A.prototype, instance, {}, 'b', jest.fn);
    }).toThrow('Missing property "b"');
  });
});
