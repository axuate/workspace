import type { Token } from '../entities/Token';

export function getTokenName(token: Token): string {
  if (typeof token === 'string') {
    return token;
  } else if (typeof token === 'symbol') {
    return token.description;
  } else if (typeof token === 'function') {
    return token.name;
  }
}
