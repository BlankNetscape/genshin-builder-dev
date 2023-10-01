/* eslint-disable no-prototype-builtins */
import { log } from "console"
import { isBigInt64Array } from "util/types"

/**
 * Recursively crawls through an object, invoking a callback on objects that pass a validation function.
 *
 * @param {Record<string, T> | T} obj - The object to crawl.
 * @param {string[]} [keys=[]] - The current keys representing the object's path.
 * @param {(o: unknown, keys: string[]) => boolean} validate - The validation function to determine if an object should be processed.
 * @param {(o: O, keys: string[]) => void} cb The callback function to execute on valid objects.
 */
export function crawlObject<T, O>(
  obj: Record<string, T> | T,
  keys: string[] = [],
  validate: (o: unknown, keys: string[]) => boolean,
  cb: (o: O, keys: string[]) => void
) {
  if (!obj) return
  if (validate(obj as T, keys)) cb(obj as O, keys)
  else {
    obj && typeof obj === 'object' && Object.entries(obj).forEach(([key, val]) =>
      crawlObject(val, [...keys, key], validate, cb)
    )
  }
}

/**
 * Assigns a value to a nested object, creating the path if it doesn't exist yet.
 * 
 * @param {Obj} obj - The object to assign the value to.
 * @param {readonly (number | string)[]} keys - The keys representing the path to the target property.
 * @param {T} value - The value to be assigned.
 * @returns {Obj} The updated object with the assigned value.
 */
export function layeredAssignment<T, Obj>(
  obj: Obj,
  keys: readonly (number | string)[],
  value: T
): Obj {
  keys.reduce((accu, key, i, arr) => {
    if (i === arr.length - 1) {
      accu[key] = value
      return accu
    }
    if (!accu[key]) accu[key] = {}
    return accu[key] as Record<number | string, unknown>
  }, obj as Record<number | string, unknown>)
  return obj
}

/**
 * Filters the object to retain only key-value pairs corresponding to a given array of keys.
 * Assumes that the provided keys are a superset of the keys existing in the object.
 * @param {Record<K, V>} obj - The object to be filtered.
 * @param {K2[]} keys - The array of keys to filter by.
 * @returns {Record<K2, V>} The filtered object containing only the specified keys and their values.
 */
export function objFilterKeys<K extends string, K2 extends string, V>(
  obj: Record<K, V>,
  keys: K2[]
): Record<K2, V> {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => keys.includes(k as K2))
  ) as Record<K2, V>
}

/**
 * Maps over the key-value pairs of an object, applying a transformation function to each value.
 * 
 * @param {Record<K, V>} obj - The object to be mapped.
 * @param {(v: V, k: K, i: number) => V2} f - The transformation function applied to each value, taking the value, key, and index as arguments.
 * @returns {Record<K, V2>} The new object with transformed values.
 */
export function objMap<K extends string | number, V, V2>(
  obj: Record<K, V>,
  f: (v: V, k: K, i: number) => V2
): Record<K, V2> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => [k, f(v as V, k as K, i)])
  ) as Record<K, V2>
}

/**
 * Generates an object from an array of keys using a mapping function that relates the key to a value.
 * 
 * @param {readonly K[]} keys - The array of keys used to generate the object.
 * @param {(key: K, i: number) => V} map - The mapping function that associates each key with a value based on its index.
 * @returns {Record<K, V>} The resulting object with keys mapped to their respective values.
 */
// const keysArray = ['a', 'b', 'c'];
// const mapFunction = (key, index) => key.toUpperCase() + index;
// const mappedObject = objKeyMap(keysArray, mapFunction);
// console.log(mappedObject); // Output: { a: 'A0', b: 'B1', c: 'C2' }
export function objKeyMap<K extends string | number, V>(
  keys: readonly K[],
  map: (key: K, i: number) => V
): Record<K, V> {
  return Object.fromEntries(keys.map((k, i) => [k, map(k, i)])) as Record<K, V>
}

/**
 * Generates an object by mapping an array of items to key-value pairs using a mapping function.
 * 
 * @param {readonly K[]} items - The array of items used to generate the object.
 * @param {(item: K, i: number) => [K2, V]} map - The mapping function that associates each item with a key-value pair based on its index.
 * @returns {Record<K2, V>} - The resulting object with keys and their respective values as determined by the mapping function.
 */
// const itemsArray = ['a', 'b', 'c'];
// const mapFunction = (item, index) => [item.toUpperCase(), index + 10];
// const mappedObject = objKeyValMap(itemsArray, mapFunction);
// console.log(mappedObject); // Output: { A: 10, B: 11, C: 12 }
export function objKeyValMap<
  K extends string | number,
  K2 extends string | number,
  V
>(items: readonly K[], map: (item: K, i: number) => [K2, V]): Record<K2, V> {
  return Object.fromEntries(items.map((t, i) => map(t, i))) as Record<K2, V>
}

/**
 * Multiplies every numerical value in the object by a multiplier.
 * 
 * @param {Record<string, unknown>} obj - The object to be multiplied.
 * @param {number} multi - The multiplier to multiply each numerical value by.
 * @returns {Record<string, unknown>} - The object with numerical values multiplied by the specified multiplier.
 */
export function objMultiplication(obj: Record<string, unknown>, multi: number) {
  if (multi === 1) return obj
  Object.keys(obj).forEach((prop: any) => {
    if (typeof obj[prop] === 'object')
      objMultiplication(
        (obj as Record<string, Record<string, unknown>>)[prop],
        multi
      )
    if (typeof obj[prop] === 'number')
      obj[prop] = (obj as Record<string, number>)[prop] * multi
  })
  return obj
}

/**
 * Deletes the value denoted by the provided path in the object.
 * Also removes empty objects in the path.
 * 
 * @param {Record<string, unknown>} obj - The object to perform deletion on.
 * @param {readonly string[]} path - The path indicating the location of the value to be deleted.
 */
// const myObject = {
//   a: {
//     b: {
//       c: 123
//     }
//   },
//   x: 456
// };
// const pathToDelete = ['a', 'b', 'c'];
// deletePropPath(myObject, pathToDelete);
// console.log(myObject); // Output: { a: { b: {} }, x: 456 }
export function deletePropPath(
  obj: Record<string, unknown>,
  path: readonly string[]
) {
  const tempPath = [...path]
  const lastKey = tempPath.pop()
  if (!lastKey) return
  const objPathed = objPathValue(obj, tempPath)
  delete objPathed?.[lastKey]
}

/**
 * Retrieves the value in a nested object based on an array of keys representing the path.
 * 
 * @param {object | undefined} obj - The object from which to retrieve the value.
 * @param {readonly string[]} keys - The array of keys representing the path to the value.
 * @returns {any} - The value at the specified path in the object.
 */
export function objPathValue(
  obj: object | undefined,
  keys: readonly string[]
): any {
  if (!obj || !keys) return undefined
  return keys.reduce((a, k) => (a as any)?.[k], obj)
}

/**
 * Recursively clears empty objects within the provided object.
 * 
 * @param {Record<string, unknown>} o - The object to clear empty objects from.
 */
export function objClearEmpties(o: Record<string, unknown>) {
  for (const k in o) {
    if (typeof o[k] !== 'object') continue
    objClearEmpties(o[k] as Record<string, unknown>)
    if (!Object.keys(o[k] as Record<string, unknown>).length) delete o[k]
  }
}

/**
 * Recursively retrieves all keys (including nested object keys) from the provided object.
 * 
 * @param {unknown} obj - The object to retrieve keys from.
 * @returns {string[]} - Array of all keys in the object, including nested object keys.
 */
export const getObjectKeysRecursive = (obj: unknown): string[] => {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof Map)) {
    const keys: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
        if (typeof obj[key] === 'object') {
          keys.push(...getObjectKeysRecursive(obj[key]));
        }
      }
    }
    return keys;
  } else if (typeof obj === 'string') {
    return [obj];
  } else {
    return [];
  }
};

/**
 * Deep freezes an object, including nested objects, up to a specified number of layers.
 * 
 * @param {T} obj - The object to be deep frozen.
 * @param {number} [layers=5] - The number of layers to deep freeze (default: 5).
 * @returns {T} - The deep frozen object.
 */
export function deepFreeze<T>(obj: T, layers = 5): T {
  if (layers <= -1) return obj
  if (typeof obj === 'object' && obj) {
    Object.values(Object.freeze(obj)).forEach((o) => deepFreeze(o, layers - 1))
  }
  return obj
}

/**
 * Creates a deep clone of an object, assuming the object entries are all primitives + objects.
 * 
 * @param {T} obj - The object to be deep cloned.
 * @returns {T} - The deep cloned object.
 */
export function deepClone<T>(obj: T): T {
  if (!obj) return obj
  if (!isNotNumberOrString(obj)) return obj
  if (!Object.keys(obj).length) return {} as T
  const ret = { ...obj }
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v !== 'object') return
    ret[k as keyof T] = JSON.parse(JSON.stringify(v))
  })
  return ret
}

/**
 * Checks if the given object is of type 'object' and not of type 'number' or 'string'.
 * 
 * @param obj The object to be checked.
 * @returns A boolean indicating whether the object is of type 'object' and not 'number' or 'string'.
 */
export function isNotNumberOrString(obj: any): obj is object {
  return typeof obj === 'object' && !(obj instanceof Number) && !(obj instanceof String);
}