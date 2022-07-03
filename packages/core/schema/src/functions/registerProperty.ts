export function registerProperty(prototype: Object, property: string): void {
  const properties = Reflect.getMetadata('properties', prototype) as string[] | undefined;
  if (properties) {
    Reflect.defineMetadata('properties', [...properties, property], prototype);
  } else {
    Reflect.defineMetadata('properties', [property], prototype);
  }
}
