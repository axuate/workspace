import type { RequestHandler } from '../entities/RequestHandler';
import type { Middleware } from '../entities/Middleware';
import { HttpResponse } from '@axuate/http';
import type { Container } from '@axuate/container';
import { FallbackController } from '../controllers/FallbackController';
import { Logger } from '@axuate/logger';
import type { ErrorHandler } from '../entities/ErrorHandler';

export function createRequestHandler(
  container: Container,
  requestHandler: RequestHandler,
  middlewares?: Middleware[]
): RequestHandler {
  const fallbackController = container.resolve<ErrorHandler>(FallbackController);
  const logger = container.resolve(Logger);

  return async (req, params) => {
    try {
      let response: HttpResponse;

      if (middlewares) {
        for (const middleware of middlewares) {
          if (middleware.onRequest) {
            const earlyResponse = await middleware.onRequest(req, params);
            if (earlyResponse) {
              response = earlyResponse;
              break;
            }
          }
        }
      }

      if (!response) {
        try {
          response = await requestHandler(req, params);
        } catch (error) {
          response = await fallbackController.onError(error as Error, req, params);
        }
      }

      if (middlewares) {
        for (const middleware of middlewares) {
          if (middleware.onResponse) {
            const earlyResponse = await middleware.onResponse(req, response, params);
            if (earlyResponse) {
              return earlyResponse;
            }
          }
        }
      }

      return response;
    } catch (error) {
      logger.error((error as Error).stack);
      return new HttpResponse(500);
    }
  };
}
