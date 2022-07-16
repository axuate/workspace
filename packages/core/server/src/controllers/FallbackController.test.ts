import { FallbackController } from './FallbackController';
import type { Logger } from '@axuate/logger';
import { HttpException } from '../exceptions/HttpException';
import type { HttpRequest } from '@axuate/http';
import { HttpResponse } from '@axuate/http';

jest.mock('@axuate/http');

describe('FallbackController', () => {
  test('exports a class called FallbackController', () => {
    expect(FallbackController).toBeInstanceOf(Function);
  });

  describe('onError', () => {
    test('has a public method onError', () => {
      expect(FallbackController.prototype.onError).toBeInstanceOf(Function);
    });

    test('returns a HttpResponse with status code when the error is a HttpException', () => {
      const logger = { error: jest.fn() } as any as Logger;
      const controller = new FallbackController(logger);
      controller.onError(new HttpException(100), {} as HttpRequest, {});
      expect(HttpResponse).toHaveBeenCalledWith(100);
    });

    test('returns a HttpResponse with status code 500 when error is unknown', () => {
      const logger = { error: jest.fn() } as any as Logger;
      const controller = new FallbackController(logger);
      const error = new Error('Test');
      controller.onError(error, {} as HttpRequest, {});
      expect(HttpResponse).toHaveBeenCalledWith(500);
      expect(logger.error).toHaveBeenCalledWith(error.stack);
    });
  });
});
