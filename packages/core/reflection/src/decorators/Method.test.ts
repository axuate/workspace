import { Method } from './Method';
import { Metadata } from './Metadata';
import { IS_ARRAY, METHODS, TYPE } from '../constants/reflection';

jest.mock('./Metadata');

describe('Method', () => {
  test('exports a decorator called Method', () => {
    expect(Method).toBeInstanceOf(Function);
  });

  test('should call Metadata decorator', () => {
    (Metadata as jest.Mock).mockReturnValue(jest.fn());
    const target = jest.fn();
    Method({ isArray: true, type: Number })(target, 'getAge', {});
    expect(Metadata).toHaveBeenCalledWith(IS_ARRAY, true);
    expect(Metadata).toHaveBeenCalledWith(TYPE, Number);
    expect(Metadata).toHaveBeenCalledWith(METHODS, ['getAge']);
  });
});
