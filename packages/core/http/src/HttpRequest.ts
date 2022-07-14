import type { HttpRequestConfig } from './entities/HttpRequestConfig';
import type { HttpHeaders } from './entities/HttpHeaders';
import type { HttpMethod } from './entities/HttpMethod';
import type { Readable } from 'stream';
import type { IncomingMessage } from 'http';
import { parse } from 'url';

export class HttpRequest {
  private readonly headers: ReadonlyMap<string, string | string[]>;
  private readonly method: HttpMethod;
  private readonly path: string;
  private readonly body: Readable | undefined;
  private readonly query: Record<string, string | string[]>;

  public constructor(method: HttpMethod, url: string, requestConfig?: HttpRequestConfig) {
    const parsedUrl = parse(url, true);
    this.method = method;
    this.path = parsedUrl.path;
    this.query = parsedUrl.query;
    this.headers = HttpRequest.headersToMap(requestConfig?.headers);
    this.body = requestConfig?.body;
  }

  public static fromIncomingMessage(req: IncomingMessage): HttpRequest {
    return new HttpRequest(req.method as HttpMethod, req.url, {
      headers: req.headers,
      body: req
    });
  }

  public getQuery(): Record<string, string | string[]> {
    return this.query;
  }

  public getHeader(name: string): string | string[] | undefined {
    return this.headers.get(name);
  }

  public hasHeader(name: string): boolean {
    return this.headers.has(name);
  }

  public getHeaders(): HttpHeaders {
    return Object.fromEntries(this.headers);
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getPath(): string {
    return this.path;
  }

  public getBody(): Readable | undefined {
    return this.body;
  }

  private static headersToMap(
    headers: HttpHeaders | undefined
  ): ReadonlyMap<string, string | string[]> {
    if (headers) {
      return new Map(Object.entries(headers));
    }
    return new Map();
  }
}
