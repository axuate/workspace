import type { RequestConfig } from '../../../entities/RequestConfig';
import { REQUEST_METHOD, REQUEST_PATH } from '../../../constants/reflection';
import type { HttpMethod } from '@axuate/http';
import { getMetadata } from '@axuate/reflection';

export function getRequestConfig(controller: object, propertyKey: string): RequestConfig {
  return {
    method: getMetadata<HttpMethod>(REQUEST_METHOD, controller, propertyKey),
    path: getMetadata<string>(REQUEST_PATH, controller, propertyKey)
  };
}
