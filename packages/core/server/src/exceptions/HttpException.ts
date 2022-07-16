import type { HttpStatusCode } from '@axuate/http';

export class HttpException extends Error {
  public readonly status: HttpStatusCode;
  public constructor(status: HttpStatusCode, message?: string) {
    super(message);
    this.status = status;
  }
}
