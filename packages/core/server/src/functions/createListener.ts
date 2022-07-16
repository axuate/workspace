import type { RequestListener } from 'http';
import type { Router } from '@axuate/router';
import type { HttpMethod } from '@axuate/http';
import { HttpRequest, HttpResponse } from '@axuate/http';
import type { RequestHandler } from '../entities/RequestHandler';

export function createListener(router: Router<RequestHandler>): RequestListener {
  return (async (req, res) => {
    const method = req.method as HttpMethod;
    const request = HttpRequest.fromIncomingMessage(req);
    const match = router.route(method, req.url);
    let response: HttpResponse;

    if (match) {
      const { route, params } = match;
      const requestHandler = route.value;
      response = await requestHandler(request, params);
    } else {
      response = new HttpResponse(404);
    }
    response.toServerResponse(res);
    res.end();
  }) as RequestListener;
}
