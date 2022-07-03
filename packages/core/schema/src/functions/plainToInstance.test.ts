import { plainToInstance } from './plainToInstance';
import { Property } from '../decorators/Property';

describe('plainToInstance', () => {
  test('exports a function plainToInstance', () => {
    expect(plainToInstance).toBeInstanceOf(Function);
  });

  test('throws an error if property is missing', () => {
    class A {
      @Property({ type: String })
      public declare name: string;
    }
    expect(() => {
      plainToInstance(A, {});
    }).toThrow('Missing property "name"');
  });

  test('throws an error if object has a prototype other then Object', () => {
    class A {}

    const a = new A();
    expect(() => {
      plainToInstance(A, a);
    }).toThrowError('Plain object is already instance of a class.');
  });

  test('creates an instance of the entity', () => {
    class A {}

    expect(plainToInstance(A, {})).toBeInstanceOf(A);
  });

  test('adds all marked properties to the instance', () => {
    class Person {
      @Property({ type: String })
      public declare name: string;

      @Property({ type: Number })
      public declare age: number;
    }

    expect(plainToInstance(Person, { name: 'Alex', age: 12, secret: '1234' })).toEqual({
      name: 'Alex',
      age: 12
    });
  });

  test('adds sub entities properties to instance', () => {
    class Address {
      @Property({ type: String })
      public declare street: string;
    }

    class Person {
      @Property({ type: String })
      public declare name: string;

      @Property({ type: Number })
      public declare age: number;

      @Property({ type: Address })
      public declare address: Address;
    }

    expect(
      plainToInstance(Person, {
        name: 'Alex',
        age: 12,
        secret: '1234',
        address: {
          street: 'Test Street',
          secret: '1234'
        }
      })
    ).toEqual({
      name: 'Alex',
      age: 12,
      address: {
        street: 'Test Street'
      }
    });
  });

  test('adds sub entity arrays properties to instance', () => {
    class Address {
      @Property({ type: String })
      public declare street: string;
    }

    class Person {
      @Property({ type: String })
      public declare name: string;

      @Property({ type: Number })
      public declare age: number;

      @Property({ type: Address, isArray: true })
      public declare addresses: Address[];
    }

    expect(
      plainToInstance(Person, {
        name: 'Alex',
        age: 12,
        secret: '1234',
        addresses: [
          {
            street: 'Test Street',
            secret: '1234'
          },
          {
            street: 'Test Street 2',
            secret: '1234'
          }
        ]
      })
    ).toEqual({
      name: 'Alex',
      age: 12,
      addresses: [
        {
          street: 'Test Street'
        },
        {
          street: 'Test Street 2'
        }
      ]
    });
  });
});
