import 'reflect-metadata';
import { getRequestConfig } from './getRequestConfig';
import { REQUEST_METHOD, REQUEST_PATH } from '../../../constants/reflection';

describe('getRequestConfig', () => {
  test('exports a function called getRequestConfig', () => {
    expect(getRequestConfig).toBeInstanceOf(Function);
  });

  test('get request meta information', () => {
    jest
      .spyOn(Reflect, 'getMetadata')
      .mockReturnValueOnce('/test')
      .mockReturnValueOnce('GET')
      .mockReturnValueOnce([]);
    const controller = jest.fn();
    getRequestConfig(controller, 'getUsers');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(REQUEST_PATH, controller, 'getUsers');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(REQUEST_METHOD, controller, 'getUsers');
  });
});
