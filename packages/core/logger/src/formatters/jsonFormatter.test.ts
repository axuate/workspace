import { jsonFormatter } from './jsonFormatter';
import { LogLevel } from '../entities/LogLevel';

describe('jsonFormatter', () => {
  test('exports a function called jsonFormatter', () => {
    expect(jsonFormatter).toBeInstanceOf(Function);
  });

  test('creates a serialized json object', () => {
    expect(
      jsonFormatter({
        level: LogLevel.INFO,
        context: 'HTTP',
        message: 'Test',
        meta: { server: 'A' }
      })
    ).toBe('{"server":"A","message":"Test","context":"HTTP","level":"info"}');
  });
});
