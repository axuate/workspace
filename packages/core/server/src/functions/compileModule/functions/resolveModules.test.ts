import { resolveModules } from './resolveModules';
import type { Container } from '@axuate/container';
import { compileModule } from '../compileModule';
import type { ModuleConfig } from '../../../entities/ModuleConfig';

jest.mock('../compileModule');

describe('registerModules', () => {
  test('exports a function called registerModules', () => {
    expect(resolveModules).toBeInstanceOf(Function);
  });

  test('ignores modules if they are not defined', () => {
    const container = { register: jest.fn() } as any as Container;
    const modules = undefined;
    expect(resolveModules(container, modules)).toEqual([]);
    expect(compileModule).not.toHaveBeenCalled();
  });

  test('calls compileModule for every sub module', () => {
    (compileModule as jest.Mock).mockReturnValueOnce(['{{ROUTE}}']);
    const container = { register: jest.fn() } as any as Container;
    const moduleConfig: ModuleConfig = {};
    const modules = [moduleConfig];
    expect(resolveModules(container, modules)).toEqual(['{{ROUTE}}']);
    expect(compileModule).toHaveBeenCalledWith(container, moduleConfig);
  });
});
