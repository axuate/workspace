import type { HttpHeaders } from './HttpHeaders';
import type { Readable } from 'stream';

export type HttpRequestConfig = {
  headers?: HttpHeaders;
  body?: Readable;
};
