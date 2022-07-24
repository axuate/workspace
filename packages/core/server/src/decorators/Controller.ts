import { Injectable } from '@axuate/container';
import type { ControllerConfig } from '../entities/ControllerConfig';
import { CONTROLLER_PREFIX, CONTROLLER_VERSION } from '../constants/reflection';
import { Metadata } from '@axuate/reflection';

export const Controller: (config?: ControllerConfig) => ClassDecorator = (config) => {
  return (target) => {
    Injectable(target);
    Metadata(CONTROLLER_PREFIX, config?.prefix)(target);
    Metadata(CONTROLLER_VERSION, config?.version)(target);
  };
};
