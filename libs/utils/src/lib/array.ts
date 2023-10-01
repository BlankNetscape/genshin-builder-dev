/** Gets last element of the array. */
export function getArrLastElement<E>(arr: E[]): E | null {
  return arr.length ? arr[arr.length - 1] : null
}

/** @returns Itearable range from -> to, inclusive */
const rangeGenerator = function* (from: number, to: number): Iterable<number> {
  for (let i = from; i <= to; i++) yield i
}

/** @returns Array of items in range from -> to, inclusive. */
export function range(from: number, to: number): number[] {
  return [...rangeGenerator(from, to)]
}

/**
 * Toggles the presence of a value in an array in-place.
 *
 * If the value is already in the array, it is removed. If not, it is added.
 *
 * @param {T[]} arr - The array to toggle the value in.
 * @param {T} value - The value to toggle.
 * @returns {T[]} The modified array after toggling the value in-place.
 */
export function toggleInArr<T>(arr: T[], value: T) {
  const ind = arr.indexOf(value)
  if (ind < 0) arr.push(value)
  else arr.splice(ind, 1)
  return arr
}

/**
 * Toggles the presence of a value in an array.
 *
 * If the value is already in the array, it is removed. If not, it is added.
 *
 * @param {T[]} arr - The array to toggle the value in.
 * @param {T} value - The value to toggle.
 * @returns {T[]} The modified array after toggling the value.
 */
export function toggleArr<T>(arr: T[], value: T) {
  return arr.includes(value) ? arr.filter((a) => a !== value) : [...arr, value]
}

/** Move an item in an array from one position to another. */
export function arrayMove<T>(arr: T[], oldIndex: number, newIndex: number) {
  if (newIndex < 0 || newIndex >= arr.length) return arr
  if (oldIndex < 0 || oldIndex >= arr.length) return arr
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}