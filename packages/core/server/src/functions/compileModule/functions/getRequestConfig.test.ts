import { getRequestConfig } from './getRequestConfig';
import { REQUEST_METHOD, REQUEST_PATH } from '../../../constants/reflection';
import { getMetadata } from '@axuate/reflection';

describe('getRequestConfig', () => {
  test('exports a function called getRequestConfig', () => {
    expect(getRequestConfig).toBeInstanceOf(Function);
  });

  test('get request meta information', () => {
    const controller = jest.fn();
    getRequestConfig(controller, 'getUsers');
    expect(getMetadata).toHaveBeenCalledWith(REQUEST_PATH, controller, 'getUsers');
    expect(getMetadata).toHaveBeenCalledWith(REQUEST_METHOD, controller, 'getUsers');
  });
});
