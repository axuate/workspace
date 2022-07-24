import type { Constructor } from '@axuate/container';
import { CONTROLLER_PREFIX, CONTROLLER_VERSION } from '../../../constants/reflection';
import type { ControllerConfig } from '../../../entities/ControllerConfig';
import { getMetadata } from '@axuate/reflection';

export function getControllerConfig(controller: Constructor): ControllerConfig {
  return {
    prefix: getMetadata(CONTROLLER_PREFIX, controller),
    version: getMetadata(CONTROLLER_VERSION, controller)
  };
}
