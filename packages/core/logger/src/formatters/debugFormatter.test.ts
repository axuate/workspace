import { debugFormatter } from './debugFormatter';
import { LogLevel } from '../entities/LogLevel';

describe('debugFormatter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1657296147000));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('exports a function called debugFormatter', () => {
    expect(debugFormatter).toBeInstanceOf(Function);
  });

  test('should format output', () => {
    expect(
      debugFormatter({
        level: LogLevel.INFO,
        message: 'Test',
        context: 'HTTP',
        meta: {}
      })
    ).toBe('\x1b[2m2022-07-08T16:02:27.000Z\x1b[0m \x1b[32m INFO\x1b[0m \x1b[2m[HTTP]\x1b[0m Test');
  });
});
