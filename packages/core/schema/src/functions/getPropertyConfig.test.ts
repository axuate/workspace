import { getPropertyConfig } from './getPropertyConfig';
import { PROPERTY_CONFIG } from '../constants/reflection';

describe('getPropertyConfig', () => {
  test('exports a function called getPropertyConfig', () => {
    expect(getPropertyConfig).toBeInstanceOf(Function);
  });

  test('calls Reflect.getMetadata with config key', () => {
    class A {}

    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce('{{CONFIG}}');
    expect(getPropertyConfig(A.prototype, 'name')).toBe('{{CONFIG}}');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(PROPERTY_CONFIG, A.prototype, 'name');
  });
});
