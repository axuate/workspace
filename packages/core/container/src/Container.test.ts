import 'reflect-metadata';
import { Container } from './Container';
import { getTokenName } from './functions/getTokenName';
import { CONSTRUCTOR_ARGS } from './constants/reflection';

jest.mock('./functions/getTokenName');

describe('Container', () => {
  test('exports a class called Container', () => {
    expect(Container).toBeInstanceOf(Function);
  });

  describe('register', () => {
    test('has a public method register', () => {
      expect(Container.prototype.register).toBeInstanceOf(Function);
    });

    test('returns itself', () => {
      const container = new Container();
      expect(
        container.register({
          token: 'Test',
          useValue: 'Test'
        })
      ).toBe(container);
    });

    test('throws an error if string token is already defined', () => {
      (getTokenName as jest.Mock).mockReturnValueOnce('Test');
      const container = new Container();
      container.register({ token: 'Test', useValue: 'Test' });
      expect(() => {
        container.register({ token: 'Test', useValue: 'Test' });
      }).toThrow(`Token "Test" already registered`);
    });

    test('throws an error if symbol token is already defined', () => {
      (getTokenName as jest.Mock).mockReturnValueOnce('Test');
      const container = new Container();
      const symbol = Symbol('Test');
      container.register({ token: symbol, useValue: 'Test' });
      expect(() => {
        container.register({ token: symbol, useValue: 'Test' });
      }).toThrow(`Token "Test" already registered`);
    });

    test('throws an error if constructor token is already defined', () => {
      (getTokenName as jest.Mock).mockReturnValueOnce('Test');
      const container = new Container();

      class A {}

      container.register({ token: A, useValue: 'Test' });
      expect(() => {
        container.register({ token: A, useValue: 'Test' });
      }).toThrow(`Token "Test" already registered`);
    });
  });

  describe('resolve', () => {
    test('has a public method resolve', () => {
      expect(Container.prototype.resolve).toBeInstanceOf(Function);
    });

    test('throws an error if token is not defined', () => {
      (getTokenName as jest.Mock).mockReturnValueOnce('Test');
      const container = new Container();
      expect(() => {
        container.resolve('Test');
      }).toThrowError('Token "Test" is not registered.');
    });

    test('return constructor instance if token is not defined', () => {
      const container = new Container();
      const constructor = jest.fn();
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]);
      expect(container.resolve(constructor)).toBeInstanceOf(constructor);
    });

    test('throws an error if constructor is not marked is injectable', () => {
      const container = new Container();

      class Test {}

      expect(() => {
        container.resolve(Test);
      }).toThrowError('Class "Test" is not marked as injectable.');
    });

    test('returns value of value provider', () => {
      const container = new Container();
      container.register({ token: 'Test', useValue: 'Test' });
      expect(container.resolve('Test')).toBe('Test');
    });

    test('returns return value of factory provider', () => {
      const container = new Container();
      const factory = jest.fn().mockReturnValue('Test');
      container.register({ token: 'Test', useFactory: factory });
      expect(container.resolve('Test')).toBe('Test');
      expect(factory).toHaveBeenCalledWith(container);
    });

    test('returns new instance of class', () => {
      const container = new Container();
      const constructor = jest.fn();
      container.register({ token: 'Test', useClass: constructor });
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]);
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(constructor).toHaveBeenCalled();
    });

    test('resolves all constructor parameter', () => {
      const container = new Container();
      const constructor = jest.fn();
      const constructorArgument = jest.fn();
      jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValueOnce([constructorArgument])
        .mockReturnValueOnce([]);
      container.register({ token: 'Test', useClass: constructor });
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(Reflect.getMetadata).toHaveBeenCalledWith(CONSTRUCTOR_ARGS, constructor);
      expect(constructor).toHaveBeenCalledWith(expect.any(constructorArgument));
      expect(constructorArgument).toHaveBeenCalled();
    });

    test('should not call factory twice if it its scope is singleton', () => {
      const container = new Container();
      const factory = jest.fn().mockReturnValue('Test');
      container.register({ token: 'Test', useFactory: factory, scope: 'singleton' });
      expect(container.resolve('Test')).toBe('Test');
      expect(container.resolve('Test')).toBe('Test');
      expect(factory).toHaveBeenCalledTimes(1);
    });

    test('should call factory twice if its scope is transient', () => {
      const container = new Container();
      const factory = jest.fn().mockReturnValue('Test');
      container.register({ token: 'Test', useFactory: factory, scope: 'transient' });
      expect(container.resolve('Test')).toBe('Test');
      expect(container.resolve('Test')).toBe('Test');
      expect(factory).toHaveBeenCalledTimes(2);
    });

    test('should not instantiate constructor twice if its scope is singleton', () => {
      const container = new Container();
      const constructor = jest.fn();
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]);
      container.register({ token: 'Test', useClass: constructor, scope: 'singleton' });
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(constructor).toHaveBeenCalledTimes(1);
    });

    test('should instantiate constructor twice if its scope is transient', () => {
      const container = new Container();
      const constructor = jest.fn();
      jest.spyOn(Reflect, 'getMetadata').mockReturnValueOnce([]).mockReturnValueOnce([]);
      container.register({ token: 'Test', useClass: constructor, scope: 'transient' });
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(container.resolve('Test')).toBeInstanceOf(constructor);
      expect(constructor).toHaveBeenCalledTimes(2);
    });
  });
});
