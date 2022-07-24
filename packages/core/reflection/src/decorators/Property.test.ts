import { Property } from './Property';
import { Metadata } from './Metadata';
import { IS_ARRAY, IS_OPTIONAL, PROPERTIES, TYPE } from '../constants/reflection';

jest.mock('./Metadata');

describe('Property', () => {
  test('exports a decorator called Property', () => {
    expect(Property).toBeInstanceOf(Function);
  });

  test('calls Metadata decorator', () => {
    (Metadata as jest.Mock).mockReturnValue(jest.fn());
    const target = jest.fn();
    Property({ isArray: true, isOptional: true, type: Number })(target, 'getAge');
    expect(Metadata).toHaveBeenCalledWith(IS_ARRAY, true);
    expect(Metadata).toHaveBeenCalledWith(IS_OPTIONAL, true);
    expect(Metadata).toHaveBeenCalledWith(TYPE, Number);
    expect(Metadata).toHaveBeenCalledWith(PROPERTIES, ['getAge']);
  });

  test('call with no config', () => {
    (Metadata as jest.Mock).mockReturnValue(jest.fn());
    const target = jest.fn();
    Property()(target, 'getAge');
    expect(Metadata).toHaveBeenCalledWith(IS_ARRAY, undefined);
    expect(Metadata).toHaveBeenCalledWith(IS_OPTIONAL, undefined);
    expect(Metadata).toHaveBeenCalledWith(TYPE, undefined);
    expect(Metadata).toHaveBeenCalledWith(PROPERTIES, ['getAge']);
  });
});
