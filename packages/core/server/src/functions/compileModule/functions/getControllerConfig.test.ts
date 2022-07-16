import { CONTROLLER_CONFIG } from '../../../constants/reflection';
import { getControllerConfig } from './getControllerConfig';

describe('getControllerConfig', () => {
  test('exports a function called getControllerConfig', () => {
    expect(getControllerConfig).toBeInstanceOf(Function);
  });

  test('returns config from reflection data', () => {
    const controller = jest.fn();
    jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce('{{CONFIG}}');
    expect(getControllerConfig(controller)).toEqual('{{CONFIG}}');
    expect(Reflect.getMetadata).toHaveBeenCalledWith(CONTROLLER_CONFIG, controller);
  });
});
