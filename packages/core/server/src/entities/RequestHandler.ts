import type { HttpRequest, HttpResponse } from '@axuate/http';
import type { RequestParams } from './RequestParams';

export type RequestHandler = (
  req: HttpRequest,
  params: RequestParams
) => Promise<HttpResponse> | HttpResponse;
