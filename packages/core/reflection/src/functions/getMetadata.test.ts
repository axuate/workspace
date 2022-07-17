import { getMetadata } from './getMetadata';
import { METADATA } from '../constants/reflection';

describe('getMetadata', () => {
  const key = Symbol('a');

  test('exports a function called getMetadata', () => {
    expect(getMetadata).toBeInstanceOf(Function);
  });

  test('calls Reflect.getMetadata to get the metadata object', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const constructor = jest.fn();
    getMetadata(key, constructor);
    expect(Reflect.getMetadata).toHaveBeenCalledWith(METADATA, constructor, undefined);
  });

  test('calls Reflect.getMetadata for property', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const constructor = jest.fn();
    getMetadata(key, constructor, 'getUser');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(METADATA, constructor, 'getUser');
  });

  test('returns undefined if the metadata object does not exist', () => {
    jest.spyOn(Reflect, 'getMetadata');
    const constructor = jest.fn();
    expect(getMetadata(key, constructor)).toBeUndefined();
  });

  test('returns undefined if the key does not exist', () => {
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(new Map());
    const constructor = jest.fn();
    expect(getMetadata(key, constructor)).toBeUndefined();
  });

  test('returns the value', () => {
    const metadata = new Map();
    metadata.set(key, 'Test');
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce(metadata);
    const constructor = jest.fn();
    expect(getMetadata(key, constructor)).toBe('Test');
  });
});
