import type { Buffer } from 'buffer';
import type { ServerResponse } from 'http';

export class HttpResponse {
  private readonly status: number;
  private body: Buffer | undefined;
  private readonly headers: Map<string, string> = new Map<string, string>();

  public constructor(status: number) {
    this.status = status;
  }

  public toServerResponse(res: ServerResponse): void {
    res.statusCode = this.status;
    this.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    if (this.body) {
      res.write(this.body);
    }
  }

  public getStatus(): number {
    return this.status;
  }

  public setBody(body: Buffer): this {
    this.body = body;
    return this;
  }

  public getBody(): Buffer | undefined {
    return this.body;
  }

  public getHeader(name: string): string | undefined {
    return this.headers.get(name);
  }

  public setHeader(name: string, value: string): this {
    this.headers.set(name, value);
    return this;
  }

  public removeHeader(name: string): this {
    this.headers.delete(name);
    return this;
  }

  public getHeaders(): Record<string, string> {
    return Object.fromEntries(this.headers);
  }
}
