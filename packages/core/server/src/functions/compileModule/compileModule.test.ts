import { compileModule } from './compileModule';
import { Container } from '@axuate/container';
import { registerMiddlewares } from './functions/registerMiddlewares';
import { registerProviders } from './functions/registerProviders';
import { registerComponents } from './functions/registerComponents';
import { resolveModules } from './functions/resolveModules';
import { resolveControllers } from './functions/resolveControllers';

jest.mock('@axuate/container');
jest.mock('./functions/registerMiddlewares');
jest.mock('./functions/registerProviders');
jest.mock('./functions/registerComponents');
jest.mock('./functions/resolveModules');
jest.mock('./functions/resolveControllers');

describe('compileModule', () => {
  beforeEach(() => {
    (resolveModules as jest.Mock).mockReturnValueOnce(['{{MODULES_ROUTES}}']);
    (resolveControllers as jest.Mock).mockReturnValueOnce(['{{CONTROLLERS_ROUTES}}']);
  });

  test('exports a function called compileModule', () => {
    expect(compileModule).toBeInstanceOf(Function);
  });

  test('creates a new sub container', () => {
    const container = jest.fn() as any as Container;
    compileModule(container, {});
    expect(Container).toHaveBeenCalledWith(container);
  });

  test('calls registerMiddlewares', () => {
    const subContainer = jest.fn() as any as Container;
    (Container as any as jest.Mock).mockReturnValueOnce(subContainer);
    const container = jest.fn() as any as Container;
    const middlewares = [];
    compileModule(container, { middlewares });
    expect(registerMiddlewares).toHaveBeenCalledWith(subContainer, middlewares);
  });

  test('calls registerProviders', () => {
    const subContainer = jest.fn() as any as Container;
    (Container as any as jest.Mock).mockReturnValueOnce(subContainer);
    const container = jest.fn() as any as Container;
    const providers = [];
    compileModule(container, { providers });
    expect(registerProviders).toHaveBeenCalledWith(subContainer, providers);
  });

  test('calls registerComponents', () => {
    const subContainer = jest.fn() as any as Container;
    (Container as any as jest.Mock).mockReturnValueOnce(subContainer);
    const container = jest.fn() as any as Container;
    const components = [];
    compileModule(container, { components });
    expect(registerComponents).toHaveBeenCalledWith(subContainer, components);
  });

  test('returns concatenated value of resolveModules and resolveControllers', () => {
    const subContainer = jest.fn() as any as Container;
    (Container as any as jest.Mock).mockReturnValueOnce(subContainer);
    const container = jest.fn() as any as Container;
    const modules = [];
    const controllers = [];
    expect(compileModule(container, { modules, controllers })).toEqual([
      '{{MODULES_ROUTES}}',
      '{{CONTROLLERS_ROUTES}}'
    ]);
    expect(resolveModules).toHaveBeenCalledWith(subContainer, modules);
    expect(resolveControllers).toHaveBeenCalledWith(subContainer, controllers);
  });
});
