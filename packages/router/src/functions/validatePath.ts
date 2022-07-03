export function validatePath(path: string) {
  if (path === '/') {
    throw new Error('A single slash is not a valid route');
  }
  if (!path.startsWith('/')) {
    throw new Error('All routes should start with a slash');
  }
  if (path.endsWith('/')) {
    throw new Error('Routes must not end with a slash');
  }
  if (path.includes('.')) {
    throw new Error('Dots are not allowed in routes');
  }
  if (path.includes('//')) {
    throw new Error('Path segments must not be empty');
  }
}
