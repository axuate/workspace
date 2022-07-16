import { Injectable } from '@axuate/container';
import type { ControllerConfig } from '../entities/ControllerConfig';
import { CONTROLLER_CONFIG } from '../constants/reflection';

export const Controller: (config?: ControllerConfig) => ClassDecorator = (config) => {
  return (target) => {
    Injectable(target);
    Reflect.defineMetadata(CONTROLLER_CONFIG, config ?? {}, target);
  };
};
