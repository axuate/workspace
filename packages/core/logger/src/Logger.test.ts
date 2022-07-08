import { Logger } from './Logger';
import { LogLevel } from './entities/LogLevel';

describe('Logger', () => {
  test('exports a class called Logger', () => {
    expect(Logger).toBeInstanceOf(Function);
  });

  describe('child', () => {
    test('has a public method "child"', () => {
      expect(Logger.prototype.child).toBeInstanceOf(Function);
    });

    test('create a new Logger instance', () => {
      const logger = new Logger({
        level: LogLevel.DEBUG,
        formatter: jest.fn(),
        transports: []
      });
      expect(logger.child({})).toBeInstanceOf(Logger);
    });

    test('create a new Logger instance with different context', () => {
      const formatter = jest.fn();
      const logger = new Logger({
        level: LogLevel.DEBUG,
        formatter,
        transports: []
      });
      const childLogger = logger.child({ context: 'HTTP' });
      childLogger.info('Test');
      expect(formatter).toHaveBeenCalledWith({
        level: LogLevel.INFO,
        context: 'HTTP',
        meta: {},
        message: 'Test'
      });
    });
  });

  describe.each(['info', 'warn', 'debug', 'error'])('%s', (logLevel: string) => {
    test(`has a public method "${logLevel}"`, () => {
      expect(Logger.prototype[logLevel]).toBeInstanceOf(Function);
    });

    test(`calls format function "${logLevel}"`, () => {
      const formatter = jest.fn();
      const logger = new Logger({
        level: LogLevel.DEBUG,
        context: 'Server',
        formatter,
        transports: [],
        meta: { service: 'A' }
      });
      logger[logLevel as keyof typeof logger]('Test', { test: 'b' });
      expect(formatter).toHaveBeenCalledWith({
        message: 'Test',
        level: LogLevel[logLevel.toUpperCase()],
        context: 'Server',
        meta: {
          service: 'A',
          test: 'b'
        }
      });
    });

    test('calls all transports', () => {
      const formatter = jest.fn().mockReturnValue('{{FORMATTED_MESSAGE}}');
      const transport = jest.fn();
      const logger = new Logger({
        level: LogLevel.DEBUG,
        formatter,
        transports: [transport]
      });
      logger[logLevel as keyof typeof logger]('Test');
      expect(transport).toHaveBeenCalledWith(
        LogLevel[logLevel.toUpperCase()],
        '{{FORMATTED_MESSAGE}}'
      );
    });

    test.each(['info', 'warn', 'debug', 'error'])(
      `should only call transport if loglevel is greater or equal to %s`,
      (currentLogLevel) => {
        const formatter = jest.fn();
        const transport = jest.fn();
        const logger = new Logger({
          level: LogLevel[currentLogLevel],
          formatter,
          transports: [transport]
        });
        logger[logLevel as keyof typeof logger]('Test');

        if (LogLevel[currentLogLevel] >= LogLevel[logLevel]) {
          expect(transport).toHaveBeenCalled();
        } else {
          expect(transport).not.toHaveBeenCalled();
        }
      }
    );
  });
});
