export function getProperties(prototype: object): string[] | undefined {
  return Reflect.getMetadata('properties', prototype) as string[] | undefined;
}
