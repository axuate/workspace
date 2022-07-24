import { Metadata } from '../../src/decorators/Metadata';
import { getMetadata } from '../../src/functions/getMetadata';
import { Method } from '../../src/decorators/Method';
import { METHODS } from '../../src/constants/reflection';

describe('Basic scenario', () => {
  const key = Symbol('Test');

  it('should save a key value pair to a class', () => {
    @Metadata(key, 1)
    class A {}

    expect(getMetadata(key, A)).toBe(1);
  });

  it('should save a key value pair to a method', () => {
    class A {
      @Metadata(key, 1)
      public getUser() {}
    }
    expect(getMetadata(key, A.prototype, 'getUser')).toBe(1);
  });

  it('should save a key value pair to a property', () => {
    class A {
      @Metadata(key, 1)
      public declare name: string;
    }
    expect(getMetadata(key, A.prototype, 'name')).toBe(1);
  });

  it('should return method metadata for an instance', () => {
    class A {
      @Metadata(key, 1)
      public getUser() {}
    }
    const a = new A();
    expect(getMetadata(key, a, 'getUser')).toBe(1);
  });

  it('should add all marked methods to array', () => {
    class A {
      @Method()
      public getUser() {}
    }
    expect(getMetadata(METHODS, A)).toEqual(['getUser']);
  });

  it('should inherit all marked methods', () => {
    class A {
      @Method()
      public getUser() {}
    }

    class B extends A {}

    expect(getMetadata(METHODS, B)).toEqual(['getUser']);
  });

  it('should inherit all metadata', () => {
    @Metadata(key, 1)
    class A {}

    class B extends A {}

    expect(getMetadata(key, B)).toBe(1);
  });

  it('should add key value pair to inherited metadata', () => {
    const bKey = Symbol('bKey');

    @Metadata(key, 1)
    class A {}

    @Metadata(bKey, 2)
    class B extends A {}

    expect(getMetadata(key, B)).toBe(1);
    expect(getMetadata(bKey, B)).toBe(2);
  });
});
