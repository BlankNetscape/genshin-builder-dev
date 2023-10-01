/**
 * Returns a random element from the given array.
 *
 * @param {T[]} array - The array from which to select a random element.
 * @returns {T} A randomly selected element from the array.
 */
export const getRandomElementFromArray = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)]

/** Returns a random integer between the specified minimum (inclusive) and maximum (exclusive) values. */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

/** Returns a random integer between the specified minimum and maximum values (inclusive). */
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/** Returns a random number between the specified minimum and maximum values (exclusive). */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}