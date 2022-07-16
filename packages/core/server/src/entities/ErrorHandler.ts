import type { HttpRequest, HttpResponse } from '@axuate/http';
import type { RequestParams } from './RequestParams';

export interface ErrorHandler {
  onError: (
    error: Error,
    req: HttpRequest,
    params: RequestParams
  ) => Promise<HttpResponse> | HttpResponse;
}
