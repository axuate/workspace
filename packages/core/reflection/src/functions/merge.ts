export function merge(
  map: Map<symbol, unknown>,
  key: symbol,
  value: unknown
): Map<symbol, unknown> {
  map = map ?? new Map<symbol, unknown>();
  const currentValue = map.get(key);
  if (Array.isArray(value) && Array.isArray(currentValue)) {
    map.set(key, [...currentValue, ...value]);
  } else {
    map.set(key, value);
  }
  return map;
}
