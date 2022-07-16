import { Controller } from './Controller';
import { Injectable } from '@axuate/container';
import { CONTROLLER_CONFIG } from '../constants/reflection';
import type { ControllerConfig } from '../entities/ControllerConfig';

jest.mock('@axuate/container');

describe('Controller', () => {
  test('exports a function called Controller', () => {
    expect(Controller).toBeInstanceOf(Function);
  });

  test('returns a class decorator', () => {
    expect(Controller()).toBeInstanceOf(Function);
  });

  test('calls injectable decorator', () => {
    class A {}
    Controller()(A);
    expect(Injectable).toHaveBeenCalledWith(A);
  });

  test('saves controller config to metadata', () => {
    const config: ControllerConfig = {
      version: 1
    };
    jest.spyOn(Reflect, 'defineMetadata');
    class A {}
    Controller(config)(A);
    expect(Reflect.defineMetadata).toHaveBeenCalledWith(CONTROLLER_CONFIG, config, A);
  });
});
