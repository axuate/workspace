import { Controller } from './Controller';
import { Injectable } from '@axuate/container';
import { CONTROLLER_PREFIX, CONTROLLER_VERSION } from '../constants/reflection';
import { Metadata } from '@axuate/reflection';

jest.mock('@axuate/container');

describe('Controller', () => {
  test('exports a function called Controller', () => {
    expect(Controller).toBeInstanceOf(Function);
  });

  test('returns a class decorator', () => {
    expect(Controller()).toBeInstanceOf(Function);
  });

  test('calls injectable decorator', () => {
    const target = jest.fn();
    Controller()(target);
    expect(Injectable).toHaveBeenCalledWith(target);
  });

  test('saves controller prefix', () => {
    const target = jest.fn();
    Controller({ prefix: '/api' })(target);
    expect(Metadata).toHaveBeenCalledWith(CONTROLLER_PREFIX, '/api');
  });

  test('saves controller version', () => {
    const target = jest.fn();
    Controller({ version: 1 })(target);
    expect(Metadata).toHaveBeenCalledWith(CONTROLLER_VERSION, 1);
  });
});
