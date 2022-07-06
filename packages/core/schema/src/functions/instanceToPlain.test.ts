import { getProperties } from './getProperties';
import { transform } from './transform';
import * as target from './instanceToPlain';

jest.mock('./getProperties');
jest.mock('./transform');

describe('instanceToPlain', () => {
  test('exports a function called instanceToPlain', () => {
    expect(target.instanceToPlain).toBeInstanceOf(Function);
  });

  test('calls getProperties for prototype of instance', () => {
    (getProperties as jest.Mock).mockReturnValueOnce([]);

    class A {}

    const instance = new A();
    target.instanceToPlain(instance);
    expect(getProperties).toHaveBeenCalledWith(A.prototype);
  });

  test('calls transform for every property of instance', () => {
    (getProperties as jest.Mock).mockReturnValueOnce(['name', 'age']);

    class A {}

    const instance = new A();
    target.instanceToPlain(instance);
    expect(transform).toHaveBeenCalledWith(
      A.prototype,
      expect.any(Object),
      instance,
      'name',
      expect.any(Function)
    );
    expect(transform).toHaveBeenCalledWith(
      A.prototype,
      expect.any(Object),
      instance,
      'age',
      expect.any(Function)
    );
  });
});
