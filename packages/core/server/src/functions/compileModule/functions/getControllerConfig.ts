import type { Constructor } from '@axuate/container';
import { CONTROLLER_CONFIG } from '../../../constants/reflection';
import type { ControllerConfig } from '../../../entities/ControllerConfig';

export function getControllerConfig(controller: Constructor): ControllerConfig {
  return Reflect.getMetadata(CONTROLLER_CONFIG, controller) as ControllerConfig;
}
