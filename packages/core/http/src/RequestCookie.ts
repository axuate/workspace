export class RequestCookie {
  public name: string;
  public value: string;

  public constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  public static parseCookies(cookies: string | undefined): RequestCookie[] {
    if (cookies === '' || cookies === undefined) {
      return [];
    }
    return cookies.split(';').map((cookie) => {
      const [name, value] = cookie.split('=');
      return new RequestCookie(name, value);
    });
  }

  public static toCookie(cookies: RequestCookie[]): undefined | string {
    if (cookies.length === 0) {
      return undefined;
    }
    return cookies.map((cookie) => cookie.toString()).join(';');
  }

  public toString(): string {
    return `${this.name}=${this.value}`;
  }
}
