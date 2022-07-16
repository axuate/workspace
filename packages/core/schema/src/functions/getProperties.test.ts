import { getProperties } from './getProperties';

describe('getProperties', () => {
  test('exports a function called getProperties', () => {
    expect(getProperties).toBeInstanceOf(Function);
  });

  test('calls Reflect.getMetadata with properties key', () => {
    class A {}
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce('{{PROPERTIES}}');
    expect(getProperties(A.prototype)).toBe('{{PROPERTIES}}');
    expect(Reflect.getMetadata).toHaveBeenCalledWith('properties', A.prototype);
  });
});
