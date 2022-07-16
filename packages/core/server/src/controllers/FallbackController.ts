import { HttpResponse } from '@axuate/http';
import { HttpException } from '../exceptions/HttpException';
import { Controller } from '../decorators/Controller';
import { Logger } from '@axuate/logger';
import type { ErrorHandler } from '../entities/ErrorHandler';

@Controller()
export class FallbackController implements ErrorHandler {
  public constructor(private readonly logger: Logger) {}
  public onError(error: Error): HttpResponse {
    if (error instanceof HttpException) {
      return new HttpResponse(error.status);
    }
    this.logger.error(error.stack);
    return new HttpResponse(500);
  }
}
