import type { CookieAttributes } from './entities/CookieAttributes';

export class ResponseCookie {
  public name: string;
  public value: string;
  public attributes?: CookieAttributes;

  public constructor(name: string, value: string, attributes?: CookieAttributes) {
    this.name = name;
    this.value = value;
    this.attributes = attributes;
  }

  public toString(): string {
    const cookie = {
      [this.name]: this.value
    };
    if (this.attributes) {
      if (this.attributes.expires) {
        cookie['Expires'] = this.attributes.expires.toString();
      }

      if (this.attributes.maxAge) {
        cookie['Max-Age'] = this.attributes.maxAge.toString();
      }

      if (this.attributes.domain) {
        cookie['Domain'] = this.attributes.domain;
      }

      if (this.attributes.path) {
        cookie['Path'] = this.attributes.path;
      }

      if (this.attributes.secure) {
        cookie['Secure'] = null;
      }

      if (this.attributes.httpOnly) {
        cookie['HttpOnly'] = null;
      }

      if (this.attributes.sameSite) {
        cookie['SameSite'] = this.attributes.sameSite;
      }
    }
    return Object.entries(cookie)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}=${value}`;
        }
        return key;
      })
      .join(';');
  }
}
