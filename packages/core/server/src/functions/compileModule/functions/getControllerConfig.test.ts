import { getControllerConfig } from './getControllerConfig';
import { getMetadata } from '@axuate/reflection';

describe('getControllerConfig', () => {
  test('exports a function called getControllerConfig', () => {
    expect(getControllerConfig).toBeInstanceOf(Function);
  });

  test('returns prefix and version', () => {
    const controller = jest.fn();
    (getMetadata as jest.Mock).mockReturnValueOnce('/api').mockReturnValueOnce(1);
    expect(getControllerConfig(controller)).toEqual({
      prefix: '/api',
      version: 1
    });
  });
});
