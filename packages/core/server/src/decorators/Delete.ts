import { REQUEST_METHOD, REQUEST_PATH } from '../constants/reflection';
import { Metadata, Method } from '@axuate/reflection';

export const Delete: (path: string) => MethodDecorator = (path) => {
  return (target, propertyKey: string, descriptor) => {
    Method()(target, propertyKey, descriptor);
    Metadata(REQUEST_PATH, path)(target, propertyKey);
    Metadata(REQUEST_METHOD, 'DELETE')(target, propertyKey);
  };
};
