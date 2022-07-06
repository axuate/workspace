import { plainToInstance } from './plainToInstance';
import { getProperties } from './getProperties';

jest.mock('./getProperties');
jest.mock('./getPropertyConfig');

describe('plainToInstance', () => {
  test('exports a function plainToInstance', () => {
    expect(plainToInstance).toBeInstanceOf(Function);
  });

  test('calls getProperties to get all marked properties of the class', () => {
    (getProperties as jest.Mock).mockReturnValueOnce([]);

    class A {}

    plainToInstance(A, {});
    expect(getProperties).toHaveBeenCalledWith(A.prototype);
  });
});
