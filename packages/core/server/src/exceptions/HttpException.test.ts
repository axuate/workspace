import { HttpException } from './HttpException';

describe('HttpException', () => {
  test('exports a class called HttpException', () => {
    expect(HttpException).toBeInstanceOf(Function);
  });

  test('extends Error', () => {
    expect(new HttpException(404)).toBeInstanceOf(Error);
  });

  test('saves status code and message', () => {
    const exception = new HttpException(404, 'Test');
    expect(exception.status).toBe(404);
    expect(exception.message).toBe('Test');
  });
});
