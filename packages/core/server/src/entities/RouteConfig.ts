import type { HttpMethod } from '@axuate/http';
import type { Middleware } from './Middleware';
import type { RequestHandler } from './RequestHandler';
import type { PathConfig } from './PathConfig';

export type RouteConfig = PathConfig & {
  method: HttpMethod;
  requestHandler: RequestHandler;
  middlewares?: Middleware[];
};
