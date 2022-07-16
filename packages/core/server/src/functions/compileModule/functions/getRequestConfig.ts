import type { RequestConfig } from '../../../entities/RequestConfig';
import { REQUEST_METHOD, REQUEST_PATH } from '../../../constants/reflection';
import type { HttpMethod } from '@axuate/http';

export function getRequestConfig(controller: object, propertyKey: string): RequestConfig {
  const requestPath: string = Reflect.getMetadata(REQUEST_PATH, controller, propertyKey);
  const requestMethod: HttpMethod = Reflect.getMetadata(REQUEST_METHOD, controller, propertyKey);
  return {
    method: requestMethod,
    path: requestPath
  };
}
