
/**
 * Generate an object from an array of keys, and a function that maps the key to a value
 * @param keys
 * @param map
 * @returns
 */
export function objKeyMap<K extends string | number, V>(
  keys: readonly K[],
  map: (key: K, i: number) => V
): Record<K, V> {
  return Object.fromEntries(keys.map((k, i) => [k, map(k, i)])) as Record<K, V>
}

export type Unit = '' | '%' | 's'
