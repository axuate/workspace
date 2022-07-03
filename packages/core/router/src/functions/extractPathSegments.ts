export function extractPathSegments(path: string): string[] {
  return path.slice(1).split('/');
}
