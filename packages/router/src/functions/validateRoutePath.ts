import { validatePath } from './validatePath';

export function validateRoutePath(path: string) {
  validatePath(path);
  if (path.includes('*')) {
    throw new Error('All wildcard must be named');
  }
}
