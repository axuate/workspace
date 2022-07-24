import { Middlewares } from './Middlewares';
import { MIDDLEWARES } from '../constants/reflection';
import { Metadata } from '@axuate/reflection';

describe('Middlewares', () => {
  test('exports a function called Middlewares', () => {
    expect(Middlewares).toBeInstanceOf(Function);
  });

  test('returns a class or method decorator', () => {
    expect(Middlewares([])).toBeInstanceOf(Function);
  });

  test('calls Metadata decorator with middlewares', () => {
    const target = jest.fn();
    const middlewares = [];
    Middlewares(middlewares)(target);
    expect(Metadata).toHaveBeenCalledWith(MIDDLEWARES, middlewares);
  });
});
