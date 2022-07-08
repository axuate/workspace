import { Container } from './Container';

describe('Container', () => {
  test('exports a class called Container', () => {
    expect(Container).toBeInstanceOf(Function);
  });

  describe('register', () => {
    test('has a public method register', () => {
      expect(Container.prototype.register).toBeInstanceOf(Function);
    });

    test('returns the own instance', () => {
      const container = new Container();
      expect(container.register(Symbol('Test'), jest.fn())).toBe(container);
    });
  });

  describe('registerSingleton', () => {
    test('has a public method register', () => {
      expect(Container.prototype.register).toBeInstanceOf(Function);
    });

    test('returns the own instance', () => {
      const container = new Container();
      expect(container.register(Symbol('Test'), jest.fn())).toBe(container);
    });
  });

  describe('resolve', () => {
    test('has a public method resolve', () => {
      expect(Container.prototype.resolve).toBeInstanceOf(Function);
    });

    test('tries parent containers resolve method before throwing', () => {
      const container = new Container();
      const childContainer = new Container(container);
      jest.spyOn(container, 'resolve');
      const identifier = Symbol('identifier');
      expect(() => {
        childContainer.resolve(identifier);
      }).toThrow('Symbol identifier "identifier" is not registered.');
      expect(container.resolve).toHaveBeenCalledWith(identifier);
    });

    test('throws an error if symbol identifier is not registered', () => {
      const container = new Container();
      const identifier = Symbol('identifier');
      expect(() => {
        container.resolve(identifier);
      }).toThrow('Symbol identifier "identifier" is not registered.');
    });

    test('throws an error if constructor identifier is not registered', () => {
      const container = new Container();
      class A {}
      expect(() => {
        container.resolve(A);
      }).toThrow('Constructor identifier "A" is not registered.');
    });

    test('resolves a primitive value using a symbol identifier', () => {
      const container = new Container();
      const identifier = Symbol('identifier');
      container.register(identifier, () => 5);
      expect(container.resolve(identifier)).toBe(5);
    });

    test('resolves a class instance by constructor identifier', () => {
      const container = new Container();
      class A {}
      container.register(A, () => new A());
      expect(container.resolve(A)).toBeInstanceOf(A);
    });

    test('calls factory on every request when not using singleton', () => {
      const container = new Container();
      const identifier = Symbol('identifier');
      const resolver = jest.fn();
      container.register(identifier, resolver);
      container.resolve(identifier);
      container.resolve(identifier);
      expect(resolver).toHaveBeenCalledTimes(2);
    });

    test('calls factory only once when using singleton', () => {
      const container = new Container();
      const identifier = Symbol('identifier');
      const resolver = jest.fn();
      container.registerSingleton(identifier, resolver);
      container.resolve(identifier);
      container.resolve(identifier);
      expect(resolver).toHaveBeenCalledTimes(1);
    });
  });
});
