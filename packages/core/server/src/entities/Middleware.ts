import type { HttpRequest } from '@axuate/http';
import type { HttpResponse } from '@axuate/http';
import type { RequestParams } from './RequestParams';

export interface Middleware {
  onRequest?(req: HttpRequest, params: RequestParams): Promise<HttpResponse> | HttpResponse | void;
  onResponse?(
    req: HttpRequest,
    res: HttpResponse,
    params: RequestParams
  ): Promise<HttpResponse> | HttpResponse | void;
}
