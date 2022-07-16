import { consoleTransport } from './consoleTransport';
import { LogLevel } from '../entities/LogLevel';

describe('consoleTransport', () => {
  test('exports a function called consoleTransport', () => {
    expect(consoleTransport).toBeInstanceOf(Function);
  });

  test('calls process.stdout.write for all messages', () => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => true);
    consoleTransport(LogLevel.INFO, 'Test');
    expect(process.stdout.write).toHaveBeenCalledWith('Test\n');
  });
});
