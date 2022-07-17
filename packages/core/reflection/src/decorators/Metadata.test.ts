import { Metadata } from './Metadata';
import { METADATA } from '../constants/reflection';
import { merge } from '../functions/merge';

jest.mock('../functions/merge');

describe('Metadata', () => {
  test('exports a decorator called Data', () => {
    expect(Metadata).toBeInstanceOf(Function);
  });

  test('returns a decorator function', () => {
    expect(Metadata(Symbol('test'), 1)).toBeInstanceOf(Function);
  });

  test('gets existing metadata from Reflection', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const constructor = jest.fn();
    Metadata(Symbol('test'), 1)(constructor);
    expect(Reflect.getMetadata).toHaveBeenCalledWith(METADATA, constructor, undefined);
  });

  test('calls merge to merge existing metadata with new one', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const constructor = jest.fn();
    const key = Symbol('test');
    Metadata(key, 1)(constructor);
    expect(merge).toHaveBeenCalledWith(undefined, key, 1);
  });

  test('saves the new metadata', () => {
    jest.spyOn(Reflect, 'getMetadata');
    jest.spyOn(Reflect, 'defineMetadata');
    (merge as jest.Mock).mockReturnValueOnce('{{METADATA}}');
    const constructor = jest.fn();
    const key = Symbol('test');
    Metadata(key, 1)(constructor);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(
      METADATA,
      '{{METADATA}}',
      constructor,
      undefined
    );
  });
});
